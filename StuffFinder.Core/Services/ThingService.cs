using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using Omu.ValueInjecter;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using XavierEnterpriseLibrary.Core.Interfaces;

namespace StuffFinder.Core.Services
{
    public class ThingService : Service<thing>, IThingService
    {
        private readonly IRepository<thing> _thingRepository;

        private readonly IEmailService _emailService;

        public ThingService(IRepository<thing> thingRepository, IEmailService emailService)
            : base(thingRepository)
        {
            _thingRepository = thingRepository;

            _emailService = emailService;
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
                   (cityNameLowered == null ? true : (i.findings.Any(j => j.location.city.name.ToLower() == cityNameLowered) || !i.findings.Any())) &&
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
                   (cityNameLowered == null ? true : (i.findings.Any(j => j.location.city.name.ToLower() == cityNameLowered) || !i.findings.Any())) &&
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
                // If this is an add operation send an email.
                _emailService.SendEmail("theox", new List<string>() { "theox@gmail.com" }, null, "test", "test message",
                    "http://deltanovember.xaviersoftware.com", "http://deltanovember.xaviersoftware.com/images/logo.png");
            }

            thing = base.AddOrUpdate(thing);

            return thing;
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