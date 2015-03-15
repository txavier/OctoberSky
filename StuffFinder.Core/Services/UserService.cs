using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using System.Collections.Generic;
using System.Linq;

namespace StuffFinder.Core.Services
{
    public class UserService : Service<user>, IUserService
    {
        private readonly IRepository<user> _userRepository;

        private readonly IService<AspNetUser> _aspNetUserService;

        public UserService(IRepository<user> userRepository, IService<AspNetUser> aspNetUserService)
            : base(userRepository)
        {
            _userRepository = userRepository;

            _aspNetUserService = aspNetUserService;
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
            SendEmailNotificationIfFirstTime(user);

            user.cityId = user.city == null ? user.cityId : user.city.cityId;
            user.city = null;
            user.nationalityId = user.nationality == null ? user.nationalityId : user.nationality.nationalityId;
            user.nationality = null;

            user = base.AddOrUpdate(user);

            return user;
        }

        private void SendEmailNotificationIfFirstTime(user user)
        {
            // TODO
        }

        public user GetLoggedInUser(string loggedInUserName)
        {
            var result = Get(filter: i => i.userName == loggedInUserName).SingleOrDefault();

            if(result == null)
            {
                SyncUserTable();

                result = Get(filter: i => i.userName == loggedInUserName).SingleOrDefault();
            }

            return result;
        }

        public IEnumerable<user> SyncUserTable()
        {
            var userNamesAlreadyAdded = Get().Select(i => i.userName);

            // Get the usernames that are not already added to the user table.
            var userNamesToAdd = _aspNetUserService.Get(filter: i => !userNamesAlreadyAdded.Contains(i.UserName));

            // Create new user records for all new usernames to add.
            var usersToAdd = userNamesToAdd.Select(i => new user() { userName = i.UserName });

            foreach (var user in usersToAdd)
            {
                Add(user);
            }

            return usersToAdd;
        }

        public List<string> GetAdminGroupEmailList()
        {
            var result = Get(filter: i => i.isAdmin ?? false)
                .Where(i => !string.IsNullOrEmpty(i.email))
                .Select(i => i.email).ToList();

            return result;
        }
    }
}