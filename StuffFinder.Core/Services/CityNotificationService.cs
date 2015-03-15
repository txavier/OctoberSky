using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace StuffFinder.Core.Services
{
    public class CityNotificationService : Service<cityNotification>, ICityNotificationService
    {
        private readonly IRepository<cityNotification> _cityNotificationRepository;

        private readonly IStuffFinderEmailService _stuffFinderEmailService;

        private readonly IUserService _userService;

        public CityNotificationService(IRepository<cityNotification> cityNotificationRepository, IStuffFinderEmailService stuffFinderEmailService,
            IUserService userService)
            : base(cityNotificationRepository)
        {
            _cityNotificationRepository = cityNotificationRepository;

            _stuffFinderEmailService = stuffFinderEmailService;

            _userService = userService;
        }

        public IEnumerable<cityNotification> Search(Objects.SearchCriteria searchCriteria)
        {
            var result = searchCriteria == null ?
               Get()
               : Get(
               filter: i => searchCriteria.searchText == null ? true : i.messageBody.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.messageBody),
               orderBy: j => searchCriteria.orderBy == "dateCreated" ? j.OrderBy(k => k.dateCreated) : j.OrderBy(k => k.dateCreated),
               skip: ((searchCriteria.currentPage - 1) ?? 1) * (searchCriteria.itemsPerPage ?? int.MaxValue),
               take: (searchCriteria.itemsPerPage ?? int.MaxValue));

            return result;
        }

        public int SearchCount(Objects.SearchCriteria searchCriteria)
        {
            var result = searchCriteria == null ?
               GetCount()
               : GetCount(
               filter: i => searchCriteria.searchText == null ? true : i.messageBody.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.messageBody));

            return result;
        }

        public void Send(cityNotification cityNotification, string userName)
        {
            var emailUsers = _userService.Get(filter: i => i.email != null
                    && i.city != null
                    && i.cityId == cityNotification.cityId)
                .Select(i => i.email)
                .ToList();

            _stuffFinderEmailService.SendEmail(cityNotification.messageBody, emailUsers, "City Notification");

            cityNotification.dateSent = DateTime.Now;

            AddOrUpdate(cityNotification, userName);
        }

        public cityNotification AddOrUpdate(cityNotification cityNotification, string userName)
        {
            cityNotification.userName = userName;

            cityNotification.cityId = cityNotification.city == null ? cityNotification.cityId : cityNotification.city.cityId;

            cityNotification.city = null;

            base.AddOrUpdate(cityNotification);

            return cityNotification;
        }
    }
}