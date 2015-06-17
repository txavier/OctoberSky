using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/newslettersApi")]
    public class newslettersApiController : ApiController
    {
        private readonly INewsletterService _newsletterService;

        public newslettersApiController()
        {
            var container = IoC.Initialize();

            _newsletterService = container.GetInstance<INewsletterService>();
        }

        // GET: api/newsletterApi
        public IHttpActionResult Get()
        {
            var result = _newsletterService.Get();

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _newsletterService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpGet]
        // GET: api/newsletterApi/5
        public IHttpActionResult Search([FromUri]SearchCriteria searchCriteria)
        {
            var result = _newsletterService.Search(searchCriteria, lazyLoadingEnabled: false, proxyCreationEnabled: false);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpGet]
        // GET: api/newsletterApi/5
        public IHttpActionResult SearchCount([FromUri]SearchCriteria searchCriteria)
        {
            var result = _newsletterService.SearchCount(searchCriteria);

            return Ok(result);
        }

        [Route("send")]
        [HttpPost]
        public IHttpActionResult Send(newsletter newsletter)
        {
            _newsletterService.Send(newsletter);

            return Ok(newsletter);
        }

        // POST: api/newsletterApi
        public IHttpActionResult Post(newsletter newsletter)
        {
            _newsletterService.AddOrUpdate(newsletter);

            return Ok(newsletter);
        }

        // DELETE: api/newsletterApi/5
        public IHttpActionResult Delete(int id)
        {
            _newsletterService.Delete(id);

            return Ok();
        }
    }
}