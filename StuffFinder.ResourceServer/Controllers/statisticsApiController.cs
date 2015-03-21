using StuffFinder.Core.Interfaces;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/statisticsApi")]
    public class statisticsApiController : ApiController
    {
        private readonly IStatisticsService _statisticsService;

        public statisticsApiController()
        {
            var container = IoC.Initialize();

            _statisticsService = container.GetInstance<IStatisticsService>();
        }

        [Route("GetNewFindingsInPastWeekCount")]
        public IHttpActionResult GetNewFindingsInPastWeekCount()
        {
            var result = _statisticsService.GetNewFindingsInPastWeekCount();

            return Ok(result);
        }

        [Route("GetTotalUsersCount")]
        public IHttpActionResult GetTotalUsersCount()
        {
            var result = _statisticsService.GetTotalUsersCount();

            return Ok(result);
        }

        [Route("GetNewMe2sInPastWeekCount")]
        public IHttpActionResult GetNewMe2sInPastWeekCount()
        {
            var result = _statisticsService.GetNewMe2sInPastWeekCount();

            return Ok(result);
        }

        [Route("GetNewThingsInPastWeekCount")]
        public IHttpActionResult GetNewThingsInPastWeekCount()
        {
            var result = _statisticsService.GetNewThingsInPastWeekCount();

            return Ok(result);
        }
    }
}