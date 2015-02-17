using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using Newtonsoft.Json;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Omu.ValueInjecter;

namespace StuffFinder.Core.Services
{
    public class ThingService : Service<thing>, IThingService
    {
        private readonly IRepository<thing> _thingRepository;

        public ThingService(IRepository<thing> thingRepository)
            :base (thingRepository)
        {
            _thingRepository = thingRepository;
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

        public IEnumerable<thing> SearchThings(string query)
        {
            if(string.IsNullOrEmpty(query) || string.IsNullOrWhiteSpace(query))
            {
                return Get();
            }

            var queryLowered = query.ToLower();

            var result = Get(filter: i =>
                i.location.formattedAddress.ToLower().Contains(queryLowered)
                || i.category.name.ToLower().Contains(queryLowered)
                || i.comments.Any(j => j.commentText.ToLower().Contains(queryLowered))
                || i.comments.Any(j => j.finding.location.formattedAddress.ToLower().Contains(queryLowered))
                || i.comments.Any(j => j.finding.userName.ToLower().Contains(queryLowered))
                || i.comments.Any(j => j.name.ToLower().Contains(queryLowered))
                || i.description.ToLower().Contains(queryLowered)
                || i.findings.SelectMany(j => j.comments).Any(k => k.commentText.ToLower().Contains(queryLowered))
                || i.name.ToLower().Contains(queryLowered)
                || i.upcCode.ToLower().Contains(queryLowered)
                || i.userName.ToLower().Contains(queryLowered)
                || queryLowered.ToLower().Contains(i.name)
                || queryLowered.ToLower().Contains(i.upcCode)
                || queryLowered.ToLower().Contains(i.userName));

            return result;
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
