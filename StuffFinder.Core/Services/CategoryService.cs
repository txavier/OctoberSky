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
    public class CategoryService : Service<category>, ICategoryService
    {
        private readonly IRepository<category> _categoryRepository;

        public CategoryService(IRepository<category> categoryRepository) 
            : base(categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public IEnumerable<category> Search(SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true)
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

        public category AddOrUpdate(category category)
        {
            // If this is an update then dont update the related entities
            // too.
            if (category.categoryId != 0)
            {
                category.things = null;
            }

            category = base.AddOrUpdate(category);

            return category;
        }
    }
}
