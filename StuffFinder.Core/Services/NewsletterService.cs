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
    public class NewsletterService : Service<newsletter>, INewsletterService
    {
        private readonly IRepository<newsletter> _newsletterRepository;
        
        private readonly IStuffFinderEmailService _stuffFinderEmailService;

        private readonly IUserService _userService;

        public NewsletterService(IRepository<newsletter> newsletterRepository, IStuffFinderEmailService stuffFinderEmailService,
            IUserService userService) 
            : base(newsletterRepository)
        {
            _newsletterRepository = newsletterRepository;

            _stuffFinderEmailService = stuffFinderEmailService;

            _userService = userService;
        }

        public IEnumerable<newsletter> Search(Objects.SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true)
        {
            var result = searchCriteria == null ?
               Get()
               : Get(
               filter: i => searchCriteria.searchText == null ? true : i.messageBody.Contains(searchCriteria.searchText) || searchCriteria.searchText.Contains(i.messageBody),
               orderBy: j => searchCriteria.orderBy == "dateCreated" ? j.OrderBy(k => k.dateCreated) : j.OrderBy(k => k.dateCreated),
               skip: ((searchCriteria.currentPage - 1) ?? 1) * (searchCriteria.itemsPerPage ?? int.MaxValue),
               take: (searchCriteria.itemsPerPage ?? int.MaxValue),
               includeProperties: searchCriteria.includeProperties,
               lazyLoadingEnabled: lazyLoadingEnabled,
               proxyCreationEnabled: proxyCreationEnabled);

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

        public void Send(newsletter newsletter)
        {
            var emailUsers = _userService.Get(filter: i => i.email != null).Select(i => i.email).ToList();

            _stuffFinderEmailService.SendEmail(newsletter.messageBody, emailUsers, "Newsletter");
        }
    }
}
