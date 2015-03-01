﻿using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/citiesApi")]
    public class citiesApiController : ApiController
    {
        private readonly ICityService _cityService;

        public citiesApiController()
        {
            var container = IoC.Initialize();

            _cityService = container.GetInstance<ICityService>();
        }

        // GET: api/cityApi
        public IHttpActionResult Get()
        {
            var result = _cityService.Get();

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _cityService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpPost]
        // GET: api/cityApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _cityService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/cityApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _cityService.SearchCount(searchCriteria);

            return Ok(result);
        }

        // POST: api/cityApi
        public IHttpActionResult Post(city city)
        {
            _cityService.AddOrUpdate(city);

            return Ok(city);
        }

        // DELETE: api/cityApi/5
        public IHttpActionResult Delete(int id)
        {
            _cityService.Delete(id);

            return Ok();
        }
    }
}