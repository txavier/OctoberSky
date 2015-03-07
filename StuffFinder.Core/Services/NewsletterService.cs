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

        public IEnumerable<newsletter> Search(Objects.SearchCriteria searchCriteria)
        {
            throw new NotImplementedException();
        }

        public int SearchCount(Objects.SearchCriteria searchCriteria)
        {
            throw new NotImplementedException();
        }

        public void Send(newsletter newsletter)
        {
            var emailUsers = _userService.Get(filter: i => i.email != null).Select(i => i.email).ToList();

            _stuffFinderEmailService.SendEmail(newsletter.messageBody, emailUsers, "Newsletter");
        }
    }
}
