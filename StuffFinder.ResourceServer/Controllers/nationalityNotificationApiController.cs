using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/nationalityNotificationsApi")]
    public class nationalityNotificationsApiController : ApiController
    {
        private readonly INationalityNotificationService _nationalityNotificationService;

        public nationalityNotificationsApiController()
        {
            var container = IoC.Initialize();

            _nationalityNotificationService = container.GetInstance<INationalityNotificationService>();
        }

        // GET: api/nationalityNotificationApi
        public IHttpActionResult Get()
        {
            var result = _nationalityNotificationService.Get();

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _nationalityNotificationService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpPost]
        // GET: api/nationalityNotificationApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _nationalityNotificationService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/nationalityNotificationApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _nationalityNotificationService.SearchCount(searchCriteria);

            return Ok(result);
        }

        [Route("send")]
        [HttpPost]
        public IHttpActionResult Send(nationalityNotification nationalityNotification)
        {
            _nationalityNotificationService.Send(nationalityNotification);

            return Ok(nationalityNotification);
        }

        // POST: api/nationalityNotificationApi
        public IHttpActionResult Post(nationalityNotification nationalityNotification)
        {
            _nationalityNotificationService.AddOrUpdate(nationalityNotification);

            return Ok(nationalityNotification);
        }

        // DELETE: api/nationalityNotificationApi/5
        public IHttpActionResult Delete(int id)
        {
            _nationalityNotificationService.Delete(id);

            return Ok();
        }
    }
}