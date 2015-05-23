using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/nationalitiesApi")]
    public class nationalitiesApiController : ApiController
    {
        private readonly INationalityService _nationalityService;

        public nationalitiesApiController()
        {
            var container = IoC.Initialize();

            _nationalityService = container.GetInstance<INationalityService>();
        }

        // GET: api/nationalityApi
        public IHttpActionResult Get()
        {
            var result = _nationalityService.Get(lazyLoadingEnabled: false, proxyCreationEnabled: false);

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _nationalityService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpPost]
        // GET: api/nationalityApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _nationalityService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/nationalityApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _nationalityService.SearchCount(searchCriteria);

            return Ok(result);
        }

        // POST: api/nationalityApi
        public IHttpActionResult Post(nationality nationality)
        {
            _nationalityService.AddOrUpdate(nationality);

            return Ok(nationality);
        }

        // DELETE: api/nationalityApi/5
        public IHttpActionResult Delete(int id)
        {
            _nationalityService.Delete(id);

            return Ok();
        }
    }
}