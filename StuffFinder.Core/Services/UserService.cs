using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Models.ViewModels;
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
            // If this is an update then dont update the related entities
            // too.
            if (user.userId != 0)
            {
                user.location = null;
                user.nationality = null;
            }

            user = base.AddOrUpdate(user);

            return user;
        }

        public IEnumerable<user> SyncUserTable()
        {
            var userNamesAlreadyAdded = Get().Select(i => i.userName);

            // Get the usernames that are not already added to the user table.
            var userNamesToAdd = _aspNetUserService.Get(filter: i => !userNamesAlreadyAdded.Contains(i.UserName));

            // Create new user records for all new usernames to add.
            var usersToAdd = userNamesToAdd.Select(i => new user() { userName = i.UserName });

            foreach(var user in usersToAdd)
            {
                Add(user);
            }

            return usersToAdd;
        }

        public IEnumerable<UserViewModel> ToUserViewModels(IEnumerable<user> users)
        {
            var result = users.Select(i => ToUserViewModel(i));

            return result;
        }

        public UserViewModel ToUserViewModel(user user)
        {
            var result = new UserViewModel()
            {
                userId = user.userId,
                email = user.email,
                isAdmin = user.isAdmin,
                isStore = user.isStore,
                locationDisplayLabel = user.location != null ? user.location.locationName + ", " + user.location.formattedAddress : null,
                locationId = user.locationId,
                nationalityId = user.nationalityId,
                nationalityName = user.nationality != null ? user.nationality.name : null,
                userName = user.userName
            };

            return result;
        }
    }
}