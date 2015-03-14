using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class NationalityNotificationService : Service<nationalityNotification>, INationalityNotificationService
    {
        private readonly IRepository<nationalityNotification> _nationalityNotificationRepository;
        
        private readonly IStuffFinderEmailService _stuffFinderEmailService;

        private readonly IUserService _userService;

        public NationalityNotificationService(IRepository<nationalityNotification> nationalityNotificationRepository, IStuffFinderEmailService stuffFinderEmailService,
            IUserService userService) 
            : base(nationalityNotificationRepository)
        {
            _nationalityNotificationRepository = nationalityNotificationRepository;

            _stuffFinderEmailService = stuffFinderEmailService;

            _userService = userService;
        }

        public IEnumerable<nationalityNotification> Search(Objects.SearchCriteria searchCriteria)
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

        public void Send(nationalityNotification nationalityNotification)
        {
            var emailUsers = _userService.Get(filter: i => i.email != null).Select(i => i.email).ToList();

            _stuffFinderEmailService.SendEmail(nationalityNotification.messageBody, emailUsers, "NationalityNotification");
        }
    }
}
