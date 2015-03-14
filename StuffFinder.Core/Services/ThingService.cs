using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Interfaces;
using AutoClutch.Auto.Service.Services;
using Omu.ValueInjecter;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using XavierEnterpriseLibrary.Core.Interfaces;

namespace StuffFinder.Core.Services
{
    public class ThingService : Service<thing>, IThingService
    {
        private readonly IRepository<thing> _thingRepository;

        private readonly IUserService _userService;

        private readonly IStuffFinderEmailService _stuffFinderEmailService;

        private readonly IService<image> _imageService;

        private readonly IFindingService _findingService;

        private readonly IVoteService _voteService;

        private readonly IMe2Service _me2Service;

        private readonly ISettingService _settingService;
        
        private readonly IService<thingCity> _thingCityService;

        public ThingService(IRepository<thing> thingRepository
            ,IUserService userService
            ,IStuffFinderEmailService stuffFinderEmailService
            ,IService<image> imageService
            ,IFindingService findingService
            ,IVoteService voteService
            ,IMe2Service me2Service
            ,ISettingService settingService
            ,IService<thingCity> thingCityService)
            : base(thingRepository)
        {
            _thingRepository = thingRepository;

            _userService = userService;

            _stuffFinderEmailService = stuffFinderEmailService;

            _imageService = imageService;

            _findingService = findingService;

            _voteService = voteService;

            _me2Service = me2Service;

            _settingService = settingService;

            _thingCityService = thingCityService;
        }

        public IEnumerable<thing> GetMostMe2Things()
        {
            // Get things that have not been found yet have the most me2's.
            var result = Get(
                filter: i => !i.findings.Any(),
                orderBy: j => j.OrderByDescending(k => k.votes.Any() ? k.votes.Sum(m => m.value) : 0),
                take: 10);

            return result;
        }

        public IEnumerable<thing> GetFoundThings()
        {
            var result = Get(filter: i => i.findings.Any());

            return result;
        }

        public IEnumerable<thing> Search(SearchCriteria searchCriteria)
        {
            var queryLowered = string.IsNullOrEmpty(searchCriteria.searchText) ? null : searchCriteria.searchText.ToLower();

            var cityNameLowered = string.IsNullOrEmpty(searchCriteria.cityName) ? null : searchCriteria.cityName.ToLower();

            var result = Get(
               filter: i =>
                   // Must have this...
                   (cityNameLowered == null || cityNameLowered == "all" ? true : (i.findings.Any(j => j.location.city.name.ToLower() == cityNameLowered) || !i.findings.Any())) &&
                       // Have any of these...
                   (queryLowered == null ? true : i.findings.Any(j => j.location.formattedAddress.ToLower().Contains(queryLowered))
                    || i.category.name.ToLower().Contains(queryLowered)
                    || i.description.ToLower().Contains(queryLowered)
                    || i.name.ToLower().Contains(queryLowered)
                    || i.upcCode.ToLower().Contains(queryLowered)
                    || i.userName.ToLower().Contains(queryLowered)
                    || queryLowered.ToLower().Contains(i.name)
                    || queryLowered.ToLower().Contains(i.upcCode)
                    || queryLowered.ToLower().Contains(i.userName)),
               orderBy: j =>
                   (searchCriteria.orderBy == "locationName" ? j.OrderBy(k => k.name)
                   : (searchCriteria.orderBy == "city.name" ? j.OrderBy(k => k.findings.SelectMany(x => x.location.city.name))
                   : j.OrderBy(k => k.name))),
               skip: ((searchCriteria.currentPage - 1) ?? 1) * (searchCriteria.itemsPerPage ?? int.MaxValue),
               take: (searchCriteria.itemsPerPage ?? int.MaxValue));

            return result;
        }

        public int SearchCount(SearchCriteria searchCriteria)
        {
            var queryLowered = string.IsNullOrEmpty(searchCriteria.searchText) ? null : searchCriteria.searchText.ToLower();

            var cityNameLowered = string.IsNullOrEmpty(searchCriteria.cityName) ? null : searchCriteria.cityName.ToLower();

            var result = GetCount(
                i => // Must have this...
                   (cityNameLowered == null || cityNameLowered == "all" ? true : (i.findings.Any(j => j.location.city.name.ToLower() == cityNameLowered) || !i.findings.Any())) &&
                    // Have any of these...
                   (queryLowered == null ? true : i.findings.Any(j => j.location.formattedAddress.ToLower().Contains(queryLowered))
                    || i.category.name.ToLower().Contains(queryLowered)
                    || i.description.ToLower().Contains(queryLowered)
                    || i.name.ToLower().Contains(queryLowered)
                    || i.upcCode.ToLower().Contains(queryLowered)
                    || i.userName.ToLower().Contains(queryLowered)
                    || queryLowered.ToLower().Contains(i.name)
                    || queryLowered.ToLower().Contains(i.upcCode)
                    || queryLowered.ToLower().Contains(i.userName)));

            return result;
        }

        public IEnumerable<thing> SearchThings(string query)
        {
            if (string.IsNullOrEmpty(query) || string.IsNullOrWhiteSpace(query))
            {
                return Get();
            }

            var queryLowered = query.ToLower();

            var result = Get(filter: i =>
                   i.findings.Any(j => j.location.formattedAddress.ToLower().Contains(queryLowered))
                || i.category.name.ToLower().Contains(queryLowered)
                || i.description.ToLower().Contains(queryLowered)
                || i.name.ToLower().Contains(queryLowered)
                || i.upcCode.ToLower().Contains(queryLowered)
                || i.userName.ToLower().Contains(queryLowered)
                || queryLowered.ToLower().Contains(i.name)
                || queryLowered.ToLower().Contains(i.upcCode)
                || queryLowered.ToLower().Contains(i.userName));

            return result;
        }

        public thing AddOrUpdate(thing thing)
        {
            // Remove child references. This is needed in order for entity 
            // framework to provide the vanilla update to just this item 
            // without walking down the entity tree.
            thing.categoryId = thing.category == null ? thing.categoryId : thing.category.categoryId;

            thing.category = null;

            thing.votes = null;

            thing.findings = null;

            thing.images = null;

            foreach(var thingCity in thing.thingCities)
            {
                thingCity.cityId = thingCity.city == null ? thingCity.cityId : thingCity.city.cityId;

                thingCity.city = null;
            }

            bool newThing = thing.thingId == 0;

            thing = base.AddOrUpdate(thing);

            if (newThing)
            {
                SendNewItemEmailNotification(thing);
            }

            return thing;
        }

        public void SendNewItemEmailNotification(thing thing)
        {
            var emailMessage = CreateNewThingEmailMessage(thing);

            var adminGroupEmailList = _userService.GetAdminGroupEmailList();

            var subject = "New Item Added To WheresMyStuff.com!";

            _stuffFinderEmailService.SendEmail(emailMessage, adminGroupEmailList, subject);
        }

        public string CreateNewThingEmailMessage(thing thing)
        {
            // Get all the properties for thing, especially the category property.
            thing = Find(thing.thingId);

            var emailLandingPageUrl = _settingService.GetSettingValueBySettingKey("emailLandingPageUrl");

            StringBuilder sb = new StringBuilder();

            sb.AppendLine("User Name: " + thing.userName);

            sb.AppendLine("Created Item: <a href='" + emailLandingPageUrl + "/#/thing/" + thing.thingId + "'>" + thing.name + "</a>");

            sb.AppendLine("Item Category: " + thing.category.name);

            sb.AppendLine("Item Description: " + thing.description);

            return sb.ToString();
        }

        public IEnumerable<ThingViewModel> ToViewModels(IEnumerable<thing> things)
        {
            var result = things.Select(i => ToViewModel(i));

            return result;
        }

        public ThingViewModel ToViewModel(thing thing)
        {
            var thingViewModel = new ThingViewModel();

            // Copy over all of the properties from the entity to the view model.
            thingViewModel.InjectFrom(thing);

            // For additinal properties in the view model fill values.
            thingViewModel.me2 = thing.me2.Count;

            thingViewModel.found = thing.findings.Any();

            thingViewModel.imageUrl = thingViewModel.images.Any() ?
                "data:image/jpeg;base64," + Convert.ToBase64String(thingViewModel.images.OrderBy(i => i.imageId).First().imageBinary) : thingViewModel.imageUrl;

            return thingViewModel;
        }

        public thing Delete(int thingId)
        {
            var thing = Find(thingId);

            SafeDeleteImagesByThing(thing);

            SafeDeleteFindingsByThing(thing);

            SafeDeleteVotesByThing(thing);

            SafeDeleteMe2sByThing(thing);

            SafeDeleteThingCityByThing(thing);

            thing = base.Delete(thingId);

            return thing;
        }

        private void SafeDeleteThingCityByThing(thing thing)
        {
            foreach(var thingCityId in thing.thingCities.Select(i => i.thingCityId).ToList())
            {
                _thingCityService.Delete(thingCityId);
            }
        }

        private void SafeDeleteImagesByThing(Models.thing thing)
        {
            if (thing.images.Any())
            {
                foreach (var imageId in thing.images.Select(i => i.imageId).ToList())
                {
                    // Only delete if this object is not being used by any other object.
                    if (!Get(filter: i => i.images.Where(j => j.imageId == imageId).Count() > 1).Any())
                    {
                        _imageService.Delete(imageId);
                    }
                }
            }
        }

        private void SafeDeleteMe2sByThing(Models.thing thing)
        {
            if (thing.me2.Any())
            {
                foreach (var me2Id in thing.me2.Select(i => i.me2Id).ToList())
                {
                    _me2Service.Delete(me2Id);
                }
            }
        }

        private void SafeDeleteVotesByThing(Models.thing thing)
        {
            if (thing.votes.Any())
            {
                foreach (var voteId in thing.votes.Select(i => i.voteId).ToList())
                {
                    _voteService.Delete(voteId);
                }
            }
        }

        private void SafeDeleteVotesByFinding(finding finding)
        {
            if (finding.votes.Any())
            {
                foreach (var voteId in finding.votes.Select(i => i.voteId).ToList())
                {
                    _voteService.Delete(voteId);
                }
            }
        }

        private void SafeDeleteFindingsByThing(Models.thing thing)
        {
            if (thing.findings.Any())
            {
                foreach (var findingId in thing.findings.Select(i => i.findingId).ToList())
                {
                    SafeDeleteVotesByFinding(_findingService.Find(findingId));

                    // Only delete if this object is not being used by any other object.
                    if (!Get(filter: i => i.findings.Where(j => j.findingId == findingId).Count() > 1).Any())
                    {
                        _findingService.Delete(findingId);
                    }
                }
            }
        }
    }
}