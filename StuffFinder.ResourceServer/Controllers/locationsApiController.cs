using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/locationsApi")]
    public class locationsApiController : ApiController
    {
        private readonly ILocationService _locationService;

        public locationsApiController()
        {
            var container = IoC.Initialize();

            _locationService = container.GetInstance<ILocationService>();
        }

        public IHttpActionResult Get()
        {
            var result = _locationService.Get(includeProperties: "city", lazyLoadingEnabled: false, proxyCreationEnabled: false);

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _locationService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpPost]
        // GET: api/locationApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _locationService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/locationApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _locationService.SearchCount(searchCriteria);

            return Ok(result);
        }

        // POST: api/locationApi
        public IHttpActionResult Post(location location)
        {
            _locationService.AddOrUpdate(location);

            return Ok(location);
        }

        // DELETE: api/locationApi/5
        public IHttpActionResult Delete(int id)
        {
            _locationService.Delete(id);

            return Ok();
        }
    }
}
