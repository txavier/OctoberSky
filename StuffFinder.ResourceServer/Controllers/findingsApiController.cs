using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.ResourceServer.DependencyResolution;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    public class findingsApiController : ApiController
    {
        private readonly IService<finding> _findingService;

        public findingsApiController()
        {
            var container = IoC.Initialize();

            _findingService = container.GetInstance<IService<finding>>();
        }

        // GET: api/findingsApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/findingsApi/5
        public IHttpActionResult Get(int id)
        {
            var result = _findingService.Find(id);

            return Ok(result);
        }

        // POST: api/findingsApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/findingsApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/findingsApi/5
        public void Delete(int id)
        {
        }
    }
}
