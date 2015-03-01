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
    public class UserService : Service<user>, IUserService
    {
        private readonly IRepository<user> _userRepository;

        public UserService(IRepository<user> userRepository) 
            : base(userRepository)
        {
            _userRepository = userRepository;
        }

        public IEnumerable<user> Search(SearchCriteria searchCriteria)
        {
            var result = searchCriteria == null ?
               Get()
               : Get(
               filter: i => searchCriteria.searchText == null ? true :
                   i.userName.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.userName) 
                   || i.email.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.email),
               orderBy: j => searchCriteria.orderBy == "userName" ? j.OrderBy(k => k.userName) 
                   : searchCriteria.orderBy == "email" ? j.OrderBy(k => k.email)
                   : j.OrderBy(k => k.userName),
               skip: ((searchCriteria.currentPage - 1) ?? 1) * (searchCriteria.itemsPerPage ?? int.MaxValue),
               take: (searchCriteria.itemsPerPage ?? int.MaxValue));

            return result;
        }

        public int SearchCount(SearchCriteria searchCriteria)
        {
            var result = searchCriteria == null ?
                GetCount()
                : GetCount(
                filter: i => searchCriteria.searchText == null ? true :
                   i.userName.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.userName) 
                   || i.email.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.email));

            return result;
        }

        public user AddOrUpdate(user user)
        {
            // If this is an update then dont update the related entities
            // too.
            if (user.userId != 0)
            {
                user.adminMembers = null;
                user.location = null;
                user.nationality = null;
            }

            user = base.AddOrUpdate(user);

            return user;
        }
    }
}
