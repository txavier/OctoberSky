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

        public FindingService(IRepository<finding> findingRepository, IStuffFinderEmailService stuffFinderEmailService,
            IUserService userService, ISettingService settingService)
            : base(findingRepository)
        {
            _findingRepository = findingRepository;

            _stuffFinderEmailService = stuffFinderEmailService;

            _userService = userService;

            _settingService = settingService;
        }

        public finding AddOrUpdate(finding finding)
        {
            finding.locationId = finding.location != null ? finding.location.locationId : finding.locationId;
            finding.location = null;
            finding.images = null;
            finding.thingId = finding.thing != null ? finding.thing.thingId : finding.thingId;
            finding.thing = null;
            finding.votes = null;

            bool newFinding = finding.findingId == 0;

            base.AddOrUpdate(finding);

            if(newFinding)
            {
                SendNewItemEmailNotification(finding);
            }

            return finding;
        }

        public void SendNewItemEmailNotification(finding finding)
        {
            var emailMessage = CreateNewFindingEmailMessage(finding);

            var adminGroupEmailList = _userService.GetAdminGroupEmailList();

            var subject = "New Finding Added To WheresMyStuff.com!";

            _stuffFinderEmailService.SendEmail(emailMessage, adminGroupEmailList, subject);
        }

        public string CreateNewFindingEmailMessage(finding finding)
        {
            var emailLandingPageUrl = _settingService.GetSettingValueBySettingKey("emailLandingPageUrl");

            StringBuilder sb = new StringBuilder();

            sb.AppendLine("User Name: " + finding.userName);

            sb.AppendLine("Created Item: <a href='" + emailLandingPageUrl + "/#/thing/" + finding.thing.thingId + "'>" + finding.thing.name + "</a>");

            sb.AppendLine("Location: " + finding.location != null ? (finding.location.formattedAddress != null ? finding.location.formattedAddress : finding.location.latitude + ", " + finding.location.longitude) : null);

            sb.AppendLine("Price: " + finding.price);

            sb.AppendLine("Find date: " + finding.date);

            return sb.ToString();
        }
    }
}
