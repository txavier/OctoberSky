﻿using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using System.Collections.Generic;
using System.Linq;

namespace StuffFinder.Core.Services
{
    public class LocationService : Service<location>, ILocationService
    {
        private readonly string bingMapsKey = "AIzaSyBPUGy5syJHUaDeR_E_FTwgOO4Th8vm63Y";

        private string region = "ae";

        private readonly IRepository<location> _locationRepository;

        private readonly IGoogleGeocodingGetter _googleGeocodingGetter;

        private readonly ICityService _cityService;
        
        public LocationService(IRepository<location> locationRepository, IGoogleGeocodingGetter googleGeocodingGetter,
            ICityService cityService)
            : base(locationRepository)
        {
            _locationRepository = locationRepository;

            _googleGeocodingGetter = googleGeocodingGetter;

            _cityService = cityService;
        }

        public IEnumerable<location> Search(SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true)
        {
            var result = searchCriteria == null ?
               Get()
               : Get(
               filter: i => searchCriteria.searchText == null ? true
                   : i.locationName.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.locationName)
                   || searchCriteria.searchText.Contains(i.formattedAddress) || searchCriteria.searchText.Contains(i.formattedAddress)
                   || searchCriteria.searchText.Contains(i.city.name) || searchCriteria.searchText.Contains(i.city.name),
               orderBy: j =>
                   (searchCriteria.orderBy == "locationName" ? j.OrderBy(k => k.locationName)
                   : (searchCriteria.orderBy == "formattedAddress" ? j.OrderBy(k => k.formattedAddress)
                   : (searchCriteria.orderBy == "city.name" ? j.OrderBy(k => k.city.name)
                   : j.OrderBy(k => k.locationName)))),
               skip: ((searchCriteria.currentPage - 1) ?? 1) * (searchCriteria.itemsPerPage ?? int.MaxValue),
               take: (searchCriteria.itemsPerPage ?? int.MaxValue),
               includeProperties: searchCriteria.includeProperties,
               lazyLoadingEnabled: lazyLoadingEnabled,
               proxyCreationEnabled: proxyCreationEnabled);

            return result;
        }

        public int SearchCount(SearchCriteria searchCriteria)
        {
            var result = searchCriteria == null ?
                GetCount()
                : GetCount(
                i => searchCriteria.searchText == null ? true
                   : i.locationName.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.locationName)
                   || searchCriteria.searchText.Contains(i.formattedAddress) || searchCriteria.searchText.Contains(i.formattedAddress)
                   || searchCriteria.searchText.Contains(i.city.name) || searchCriteria.searchText.Contains(i.city.name));

            return result;
        }

        public location AddOrUpdate(location location)
        {
            // Dont update the related entities.
            location.cityId = location.city == null ? (int?)null : location.city.cityId;
            location.city = null;
            location.findings = null;

            location = base.AddOrUpdate(location);

            return location;
        }

        public location SearchSingleNewLocation(string locationName)
        {
            var result = SearchNewLocation(locationName).FirstOrDefault();

            return result;
        }

        public IEnumerable<location> SearchNewLocation(string locationName)
        {
            var cities = _cityService.Get(lazyLoadingEnabled: false, proxyCreationEnabled: false);

            var locations = _googleGeocodingGetter.GetGoogleCustomSearch(locationName, bingMapsKey, region);

            var result = locations.results
                            .Where(i => i.partial_match)
                            .Select(i => new location()
                            {
                                formattedAddress = i.formatted_address,
                                latitude = i.geometry.location.lat,
                                longitude = i.geometry.location.lng,
                                city =  cities.Where(j => i.address_components.Any(k => k.types.Contains("locality"))).Any() ?
                                            cities.FirstOrDefault(j => i.address_components.Any(k => k.types.Contains("locality")))
                                            : null,
                                locationName = i.address_components.FirstOrDefault().long_name
                            })
                            .Select(i =>
                            {
                                i.cityId = i.city == null ? (int?)null : i.city.cityId;
                                return i;
                            });

            return result;
        }
    }
}