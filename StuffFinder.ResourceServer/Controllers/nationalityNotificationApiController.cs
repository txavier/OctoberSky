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
        [HttpGet]
        // GET: api/nationalityNotificationApi/5
        public IHttpActionResult Search([FromUri]SearchCriteria searchCriteria)
        {
            var result = _nationalityNotificationService.Search(searchCriteria, lazyLoadingEnabled: false, proxyCreationEnabled: false);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpGet]
        // GET: api/nationalityNotificationApi/5
        public IHttpActionResult SearchCount([FromUri]SearchCriteria searchCriteria)
        {
            var result = _nationalityNotificationService.SearchCount(searchCriteria);

            return Ok(result);
        }

        [Route("send")]
        [HttpPost]
        public IHttpActionResult Send(nationalityNotification nationalityNotification)
        {
            _nationalityNotificationService.Send(nationalityNotification, User.Identity.Name);

            return Ok(nationalityNotification);
        }

        // POST: api/nationalityNotificationApi
        public IHttpActionResult Post(nationalityNotification nationalityNotification)
        {
            _nationalityNotificationService.AddOrUpdate(nationalityNotification, User.Identity.Name);

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