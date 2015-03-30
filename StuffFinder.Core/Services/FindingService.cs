using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class FindingService : Service<finding>, IFindingService
    {
        private readonly IRepository<finding> _findingRepository;

        private readonly IStuffFinderEmailService _stuffFinderEmailService;

        private readonly IUserService _userService;

        private readonly ISettingService _settingService;

        private readonly ILocationService _locationService;

        public FindingService(IRepository<finding> findingRepository, IStuffFinderEmailService stuffFinderEmailService,
            IUserService userService, ISettingService settingService, ILocationService locationService)
            : base(findingRepository)
        {
            _findingRepository = findingRepository;

            _stuffFinderEmailService = stuffFinderEmailService;

            _userService = userService;

            _settingService = settingService;

            _locationService = locationService;
        }

        public finding AddOrUpdate(finding finding)
        {
            if (finding.location != null && finding.location.locationId == 0)
            {
                // If this is a new object then save it to 
                // the database first so we can use the 
                finding.location = _locationService.AddOrUpdate(finding.location);
            }

            finding.locationId = finding.location != null ? finding.location.locationId : finding.locationId;
            finding.location = null;
            finding.images = null;
            finding.thingId = finding.thing != null ? finding.thing.thingId : finding.thingId;
            finding.thing = null;
            finding.votes = null;

            bool newFinding = finding.findingId == 0;

            base.AddOrUpdate(finding);

            // If this is a new finding then send an email alert about this finding to
            // those who have me2'd this item.
            if (newFinding)
            {
                NotifyOnNewFinding(finding);
            }

            return finding;
        }

        public void NotifyOnNewFinding(finding finding)
        {
            finding = Find(finding.findingId);

            var adminEmailAddresses = _userService.GetAdminGroupEmailList();

            // Send new item notification to the admin group.
            _stuffFinderEmailService.SendNewItemEmailNotification(finding, finding.location, finding.thing, adminEmailAddresses);

            // Add the email addresses of users who posted this in their city
            // which is the same as the finding city.
            var users = _userService.Get(filter: i => finding.thing.thingCities
            .Where(k => k.cityId == finding.location.cityId)
            .Select(j => j.user.userName)
            .Contains(i.userName));

            var emailAddresses = users.Select(i => i.email).ToList();

            // Add the email address of the original poster.
            var originalPosterUserEmailAddress =
                _userService.Get(filter: i => i.userName == finding.thing.userName).Select(j => j.email).SingleOrDefault();

            if (originalPosterUserEmailAddress != null)
            {
                emailAddresses.Add(originalPosterUserEmailAddress);
            }

            // Add the email addresses of people who have me2'd this item and live in the same city as where it was found.
            List<string> me2Users = finding.thing.me2.Any() ? finding.thing.me2.Select(i => i.userName).ToList() : new List<string>();

            if (me2Users != null)
            {
                var me2SameCityUserEmailAddresses = _userService
                    .Get(filter: i => me2Users.Contains(i.userName))
                    .Where(i => i.cityId == finding.location.cityId)
                    .Select(i => i.email);

                if (me2SameCityUserEmailAddresses.Any())
                {
                    emailAddresses.AddRange(me2SameCityUserEmailAddresses);
                }
            }

            // Filter out duplicates.
            emailAddresses = emailAddresses.Distinct().ToList();

            _stuffFinderEmailService.SendItemFindingNotification(finding, finding.location, finding.thing, emailAddresses);
        }

        public bool IsWriteAccessAllowed(int findingId, string userName)
        {
            var finding = Find(findingId);

            var result = IsWriteAccessAllowed(finding, userName);

            return result;
        }

        public bool IsWriteAccessAllowed(finding finding, string userName)
        {
            if (finding != null && (finding.userName == userName || _userService.IsAdmin(userName)))
            {
                return true;
            }

            return false;
        }
    }
}