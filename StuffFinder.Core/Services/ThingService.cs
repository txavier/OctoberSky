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

namespace StuffFinder.Core.Services
{
    public class ThingService : Service<thing>, IThingService
    {
        private readonly string bingMapsKey = "AIzaSyBPUGy5syJHUaDeR_E_FTwgOO4Th8vm63Y";

        private readonly List<string> _errors;

        private readonly IRepository<thing> _thingRepository;

        private readonly IUserService _userService;

        private readonly IStuffFinderEmailService _stuffFinderEmailService;

        private readonly IService<image> _imageService;

        private readonly IFindingService _findingService;

        private readonly IVoteService _voteService;

        private readonly IMe2Service _me2Service;

        private readonly ISettingService _settingService;

        private readonly IService<thingCity> _thingCityService;

        private readonly IEfQueryGetMostMe2ThingsByDate _efQueryGetMostMe2ThingsByDate;

        private readonly IGoogleCustomSearchGetter _googleCustomSearchGetter;

        private readonly IImageFromUrlGetter _imageFromUrlGetter;

        public ThingService(IRepository<thing> thingRepository
            , IUserService userService
            , IStuffFinderEmailService stuffFinderEmailService
            , IService<image> imageService
            , IFindingService findingService
            , IVoteService voteService
            , IMe2Service me2Service
            , ISettingService settingService
            , IService<thingCity> thingCityService
            , IEfQueryGetMostMe2ThingsByDate efQueryGetMostMe2ThingsByDate
            , IGoogleCustomSearchGetter googleCustomSearchGetter
            , IImageFromUrlGetter imageFromUrlGetter)
            : base(thingRepository)
        {
            _errors = new List<string>();

            _thingRepository = thingRepository;

            _userService = userService;

            _stuffFinderEmailService = stuffFinderEmailService;

            _imageService = imageService;

            _findingService = findingService;

            _voteService = voteService;

            _me2Service = me2Service;

            _settingService = settingService;

            _thingCityService = thingCityService;

            _efQueryGetMostMe2ThingsByDate = efQueryGetMostMe2ThingsByDate;

            _googleCustomSearchGetter = googleCustomSearchGetter;

            _imageFromUrlGetter = imageFromUrlGetter;
        }

        public IEnumerable<string> GetErrors()
        {
            return _errors.Distinct();
        }

        public IEnumerable<ThingViewModel> GetSixMonths10MostMe2Things()
        {
            var result = GetMostMe2(DateTime.Now.AddMonths(-6), DateTime.MaxValue, take: 10);

            return result;
        }

        public IEnumerable<thing> GetFoundThings()
        {
            var result = Get(filter: i => i.findings.Any());

            return result;
        }

        public IEnumerable<ThingViewModel> SearchViewModels(SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, 
            bool proxyCreationEnabled = true)
        {
            // Include properties that are needed for the ToViewModel method to create all
            // of the additional display properties that it needs.
            if (searchCriteria.includeProperties == null)
            {
                searchCriteria.includeProperties = string.Empty;
            }

            searchCriteria.includeProperties = GetDefaultIncludeProperties(searchCriteria.includeProperties);

            // Search with lazy loading and proxy creation turned off because these arent
            // needed for display purposes.
            var results = Search(searchCriteria, lazyLoadingEnabled: lazyLoadingEnabled, proxyCreationEnabled: proxyCreationEnabled);

            var resultViewModels = ToViewModels(results);

            return resultViewModels;
        }

        private static string GetDefaultIncludeProperties(string includeProperties = "")
        {
            includeProperties = includeProperties.Contains("images") ?
                includeProperties : includeProperties + ",images";

            includeProperties = includeProperties.Contains("findings") ?
                includeProperties : includeProperties + ",findings";

            includeProperties = includeProperties.Contains("me2") ?
                includeProperties : includeProperties + ",me2";

            // Extended properties.
            //includeProperties = includeProperties.Contains("category.name") ?
            //    includeProperties : includeProperties + ",category.name";

            //includeProperties = includeProperties.Contains("thingCities") ?
            //    includeProperties : includeProperties + ",thingCities";

            //includeProperties = includeProperties.Contains("thingCities") ?
            //    includeProperties : includeProperties + ",thingCities";

            return includeProperties;
        }

        public IEnumerable<thing> Search(SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true)
        {
            var queryLowered = string.IsNullOrEmpty(searchCriteria.searchText) ? null : searchCriteria.searchText.ToLower();

            var cityNamesLowered = new List<string>();

            if (searchCriteria.searchParams != null)
            {
                cityNamesLowered = searchCriteria.searchParams
                    .Where(i => i.key == "cityName" && i.value != null)
                    .Select(i => i.value.ToLower()).ToList();
            }

            var result = Get(
               filter: i =>
                   // Must have this...
                   (!cityNamesLowered.Any() || cityNamesLowered.Contains("all") || cityNamesLowered.Contains("all cities") ?
                    true : (i.findings.Any(j => cityNamesLowered.Contains(j.location.city.name.ToLower()))
                    || i.thingCities.Select(k => k.city.name).Any(l => cityNamesLowered.Contains(l.ToLower())))) &&
                    (searchCriteria.startDateTime != null ? i.postedDate > searchCriteria.startDateTime : true) &&
                    (searchCriteria.endDateTime != null ? i.postedDate < searchCriteria.endDateTime : true) &&
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
               take: (searchCriteria.itemsPerPage ?? int.MaxValue),
               includeProperties: searchCriteria.includeProperties ?? "",
               lazyLoadingEnabled: lazyLoadingEnabled,
               proxyCreationEnabled: proxyCreationEnabled);

            return result;
        }

        public int SearchCount(SearchCriteria searchCriteria)
        {
            var queryLowered = string.IsNullOrEmpty(searchCriteria.searchText) ? null : searchCriteria.searchText.ToLower();

            var cityNamesLowered = new List<string>();

            if (searchCriteria.searchParams != null)
            {
                cityNamesLowered = searchCriteria.searchParams
                    .Where(i => i.key == "cityName" && i.value != null)
                    .Select(i => i.value.ToLower()).ToList();
            }

            var result = GetCount(
               filter: i =>
                   // Must have this...
                   (!cityNamesLowered.Any() || cityNamesLowered.Contains("all") || cityNamesLowered.Contains("all cities") ?
                    true : (i.findings.Any(j => cityNamesLowered.Contains(j.location.city.name.ToLower()))
                    || i.thingCities.Select(k => k.city.name).Any(l => cityNamesLowered.Contains(l.ToLower())))) &&
                    (searchCriteria.startDateTime != null ? i.postedDate > searchCriteria.startDateTime : true) &&
                    (searchCriteria.endDateTime != null ? i.postedDate < searchCriteria.endDateTime : true) &&
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

        public thing AddOrUpdate(thing thing, string loggedInUsername)
        {
            var category = thing.category;

            // Remove child references. This is needed in order for entity
            // framework to provide the vanilla update to just this item
            // without walking down the entity tree.
            thing.categoryId = thing.category == null ? thing.categoryId : thing.category.categoryId;

            thing.category = null;

            thing.votes = null;

            thing.findings = null;

            thing.images = null;

            foreach (var thingCity in thing.thingCities)
            {
                thingCity.cityId = thingCity.city == null ? thingCity.cityId : thingCity.city.cityId;

                thingCity.city = null;

                var user = _userService.Get(filter: i => i.userName == loggedInUsername).SingleOrDefault();

                thingCity.userId = user == null ? null : (int?)user.userId;
            }

            bool newThing = thing.thingId == 0;

            thing = base.AddOrUpdate(thing);

            // If there are any images in the url property then add it to the image table.
            if (thing.imageUrl != null && string.IsNullOrEmpty(thing.imageUrl.Trim()))
            {
                AddImageToThingByImageUrl(thing.thingId, thing.imageUrl);
            }

            if (newThing)
            {
                SendNewItemEmailNotification(thing, category: category);
            }

            return thing;
        }

        /// <summary>
        /// This method takes an image from the web and turns it into a byte array.
        /// </summary>
        /// <param name="thingId">This must be a non 0 id for a thing already in the database.</param>
        /// <param name="imageUrl">This is the web url of the image.</param>
        public void AddImageToThingByImageUrl(int thingId, string imageUrl)
        {
            Uri uri = new Uri(imageUrl);

            var filename = uri.Segments[uri.Segments.Length - 1];

            var image = new image()
            {
                thingId = thingId,
                imageBinary = _imageFromUrlGetter.GetImageFromUrl(imageUrl),
                fileName = filename
            };

            _imageService.Add(image);
        }

        public void SendNewItemEmailNotification(thing thing, category category = null)
        {
            var emailMessage = CreateNewThingEmailMessage(thing, category: category);

            var adminGroupEmailList = _userService.GetAdminGroupEmailList();

            var subject = "New Item Added To myFindr!";

            _stuffFinderEmailService.SendEmail(emailMessage, adminGroupEmailList, subject);
        }

        public string CreateNewThingEmailMessage(thing thing, category category = null)
        {
            // Get all the properties for thing, especially the category property.
            thing = Find(thing.thingId);

            var emailLandingPageUrl = _settingService.GetSettingValueBySettingKey("emailLandingPageUrl");

            StringBuilder sb = new StringBuilder();

            sb.AppendLine("User Name: " + thing.userName);

            sb.AppendLine("Created Item: <a href='" + emailLandingPageUrl + "/#/thing/" + thing.thingId + "'>" + thing.name + "</a>");

            sb.AppendLine("Item Category: " + (thing.category != null ? thing.category.name :
                (category != null ? category.name : "[Not found]")));

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

            //thingViewModel.imageUrl = thingViewModel.images.Any() ?
            //    "data:image/jpeg;base64," + Convert.ToBase64String(thingViewModel.images.First().imageBinary) : thingViewModel.imageUrl;

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
            foreach (var thingCityId in thing.thingCities.Select(i => i.thingCityId).ToList())
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

        public IEnumerable<ThingViewModel> GetMostMe2(DateTime startDateTime, DateTime endDateTime, int? take = null)
        {
            //var result = _me2Service
            //    .Get(filter: i => i.date > startDateTime && i.date < endDateTime, lazyLoadingEnabled: false, proxyCreationEnabled: false)
            //    .GroupBy(i => new
            //    {
            //        thingId = i.thingId,
            //    })
            //    .Select(j => ToViewModel(j.Key.thingId));

            var result = ToViewModels(_efQueryGetMostMe2ThingsByDate.GetMostMe2(startDateTime, endDateTime, take: take,
                includeProperties: GetDefaultIncludeProperties(), LazyLoadingEnabled: false, ProxyCreationEnabled: false));

            return result;
        }

        private ThingViewModel ToViewModel(int thingId)
        {
            var thing = Get(filter: i => i.thingId == thingId, includeProperties: GetDefaultIncludeProperties()).SingleOrDefault();

            var thingViewModel = ToViewModel(thing);

            return thingViewModel;
        }

        public bool IsWriteAccessAllowed(thing thing, string username)
        {
            if (thing != null && (thing.userName == username || _userService.IsAdmin(username)))
            {
                return true;
            }

            return false;
        }

        public bool IsWriteAccessAllowed(int thingId, string username)
        {
            var thing = Find(thingId);

            var result = IsWriteAccessAllowed(thing, username);

            return result;
        }

        public IEnumerable<ThingViewModel> SearchThingsInGoogle(string searchText)
        {
            var googleCustomSearch = _googleCustomSearchGetter.GetGoogleCustomSearch(searchText, bingMapsKey);

            if (googleCustomSearch != null && googleCustomSearch.items != null)
            {
                // Convert the google results into things.
                var result = googleCustomSearch.items.Select(i => new ThingViewModel()
                                {
                                    description = i.snippet,
                                    name = (i.pagemap != null && i.pagemap.hproduct != null && i.pagemap.hproduct.Any()) ?
                                            i.pagemap.hproduct.FirstOrDefault().fn
                                            : ((string.IsNullOrEmpty(i.title.Trim()) && i.title.Contains('-')) ?
                                                    searchText : i.title.Split("-".ToCharArray()).First().Trim()),
                                    imageUrl = (i.pagemap != null && i.pagemap.cse_image != null && i.pagemap.cse_image.Any()) ?
                                            i.pagemap.cse_image.FirstOrDefault().src : null,
                                    found = false,
                                    findings = new List<finding>()
                                }).ToList();

                return result;
            }

            _errors.AddRange(_googleCustomSearchGetter.GetErrors());

            return null;
        }
    }
}