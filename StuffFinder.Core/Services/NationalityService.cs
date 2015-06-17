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
    public class NationalityService : Service<nationality>, INationalityService
    {
        private readonly IRepository<nationality> _nationalityRepository;

        public NationalityService(IRepository<nationality> nationalityRepository) 
            : base(nationalityRepository)
        {
            _nationalityRepository = nationalityRepository;
        }

        public IEnumerable<nationality> Search(SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true)
        {
            var result = searchCriteria == null ?
               Get()
               : Get(
               filter: i => searchCriteria.searchText == null ? true : i.name.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.name),
               orderBy: j => searchCriteria.orderBy == "name" ? j.OrderBy(k => k.name) : j.OrderBy(k => k.name),
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
                filter: i => searchCriteria.searchText != null ? i.name.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.name) : true);

            return result;
        }

        public nationality AddOrUpdate(nationality nationality)
        {
            // If this is an update then dont update the related entities
            // too.
            if (nationality.nationalityId != 0)
            {
                nationality.users = null;
            }

            nationality = base.AddOrUpdate(nationality);

            return nationality;
        }
    }
}
