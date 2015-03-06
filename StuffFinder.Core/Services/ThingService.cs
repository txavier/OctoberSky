using AutoClutch.Auto.Repo.Interfaces;
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
        

        public ThingService(IRepository<thing> thingRepository, IUserService userService, 
            IStuffFinderEmailService stuffFinderEmailService)
            : base(thingRepository)
        {
            _thingRepository = thingRepository;

            _userService = userService;

            _stuffFinderEmailService = stuffFinderEmailService;
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
            bool newThing = false;

            // If this is an update operation then remove child references.
            // This is needed in order for entity framework to provide the
            // vanilla update to just this item without walking down the
            // entity tree.
            if (thing.thingId != 0)
            {
                thing.categoryId = thing.category == null ? thing.categoryId : thing.category.categoryId;

                thing.category = null;

                thing.votes = null;

                thing.findings = null;

                thing.images = null;
            }
            else
            {
                newThing = true;
            }

            thing = base.AddOrUpdate(thing);

            if(newThing)
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
            StringBuilder sb = new StringBuilder();

            sb.AppendLine("User Name: " + thing.userName);

            sb.AppendLine("Created Item: " +  thing.name);

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
            thingViewModel.me2 = thing.votes.Any() ? thing.votes.Sum(m => m.value) : 0;

            thingViewModel.found = thing.findings.Any();

            thingViewModel.imageUrl = thingViewModel.images.Any() ?
                "data:image/jpeg;base64," + Convert.ToBase64String(thingViewModel.images.OrderBy(i => i.imageId).First().imageBinary) : thingViewModel.imageUrl;

            return thingViewModel;
        }
    }
}