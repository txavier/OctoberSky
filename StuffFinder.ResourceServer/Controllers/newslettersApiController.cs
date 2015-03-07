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
        [HttpPost]
        // GET: api/newsletterApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _newsletterService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/newsletterApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _newsletterService.SearchCount(searchCriteria);

            return Ok(result);
        }

        // POST: api/newsletterApi
        public IHttpActionResult Post(newsletter newsletter)
        {
            _newsletterService.AddOrUpdate(newsletter);

            return Ok(newsletter);
        }

        public IHttpActionResult Send(newsletter newsletter)
        {
            _newsletterService.Send(newsletter);

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