using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class CityService : Service<city>, ICityService
    {
        private readonly IRepository<city> _cityRepository;

        public CityService(IRepository<city> cityRepository) 
            : base(cityRepository)
        {
            _cityRepository = cityRepository;
        }

        public IEnumerable<city> Search(SearchCriteria searchCriteria)
        {
            var result = searchCriteria == null ?
               Get()
               : Get(
               filter: i => searchCriteria.searchText == null ? true : i.name.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.name),
               orderBy: j => searchCriteria.orderBy == "name" ? j.OrderBy(k => k.name) : j.OrderBy(k => k.name),
               skip: ((searchCriteria.currentPage - 1) ?? 1) * (searchCriteria.itemsPerPage ?? int.MaxValue),
               take: (searchCriteria.itemsPerPage ?? int.MaxValue));

            return result;
        }

        public int SearchCount(SearchCriteria searchCriteria)
        {
            var result = searchCriteria == null ?
                GetCount()
                : GetCount(
                filter: i => searchCriteria.searchText != null ? i.name.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.name) : true);

            return result;
        }

        public city AddOrUpdate(city city)
        {
            // If this is an update then dont update the related entities
            // too.
            if (city.cityId != 0)
            {
                city.locations = null;
            }

            city = base.AddOrUpdate(city);

            return city;
        }
    }
}
