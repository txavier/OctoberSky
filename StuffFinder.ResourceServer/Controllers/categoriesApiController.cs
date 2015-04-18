using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/categoriesApi")]
    public class categoriesApiController : ApiController
    {
        private readonly ICategoryService _categoryService;

        public categoriesApiController()
        {
            var container = IoC.Initialize();

            _categoryService = container.GetInstance<ICategoryService>();
        }

        // GET: api/categoryApi
        public IHttpActionResult Get()
        {
            var result = _categoryService.Get(lazyLoadingEnabled: false, proxyCreationEnabled: false);

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _categoryService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpPost]
        // GET: api/categoryApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _categoryService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/categoryApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _categoryService.SearchCount(searchCriteria);

            return Ok(result);
        }

        // POST: api/categoryApi
        public IHttpActionResult Post(category category)
        {
            _categoryService.AddOrUpdate(category);

            return Ok(category);
        }

        // DELETE: api/categoryApi/5
        public IHttpActionResult Delete(int id)
        {
            _categoryService.Delete(id);

            return Ok();
        }
    }
}