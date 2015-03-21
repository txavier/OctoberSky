using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IThingService _thingService;

        private readonly IFindingService _findingService;
        
        private readonly IUserService _userService;
        
        private readonly IMe2Service _me2Service;

        public StatisticsService(
            IThingService thingService
            , IFindingService findingService
            , IUserService userService
            , IMe2Service me2Service)
        {
            _thingService = thingService;

            _findingService = findingService;

            _userService = userService;

            _me2Service = me2Service;
        }

        public int GetNewThingsInPastWeekCount()
        {
            var sevenDaysAgoDateTime = DateTime.Now.AddDays(-7);

            var results = _thingService.SearchCount(new Objects.SearchCriteria { startDateTime = sevenDaysAgoDateTime });

            return results;
        }

        public int GetNewFindingsInPastWeekCount()
        {
            var sevenDaysAgoDateTime = DateTime.Now.AddDays(-7);

            var results = _findingService.GetCount(filter: i => i.date >= sevenDaysAgoDateTime);

            return results;
        }

        public int GetTotalUsersCount()
        {
            var results = _userService.GetCount();

            return results;
        }

        public int GetNewMe2sInPastWeekCount()
        {
            var sevenDaysAgoDateTime = DateTime.Now.AddDays(-7);

            var results = _me2Service.GetCount(filter: i => i.date >= sevenDaysAgoDateTime);

            return results;
        }
    }
}