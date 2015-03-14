using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/cityNotificationsApi")]
    public class cityNotificationsApiController : ApiController
    {
        private readonly ICityNotificationService _cityNotificationService;

        public cityNotificationsApiController()
        {
            var container = IoC.Initialize();

            _cityNotificationService = container.GetInstance<ICityNotificationService>();
        }

        // GET: api/cityNotificationApi
        public IHttpActionResult Get()
        {
            var result = _cityNotificationService.Get();

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _cityNotificationService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpPost]
        // GET: api/cityNotificationApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _cityNotificationService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/cityNotificationApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _cityNotificationService.SearchCount(searchCriteria);

            return Ok(result);
        }

        [Route("send")]
        [HttpPost]
        public IHttpActionResult Send(cityNotification cityNotification)
        {
            _cityNotificationService.Send(cityNotification);

            return Ok(cityNotification);
        }

        // POST: api/cityNotificationApi
        public IHttpActionResult Post(cityNotification cityNotification)
        {
            _cityNotificationService.AddOrUpdate(cityNotification);

            return Ok(cityNotification);
        }

        // DELETE: api/cityNotificationApi/5
        public IHttpActionResult Delete(int id)
        {
            _cityNotificationService.Delete(id);

            return Ok();
        }
    }
}