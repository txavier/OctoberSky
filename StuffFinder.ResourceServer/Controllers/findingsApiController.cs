using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
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
        private readonly IFindingService _findingService;

        public findingsApiController()
        {
            var container = IoC.Initialize();

            _findingService = container.GetInstance<IFindingService>();
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
        public IHttpActionResult Post(finding finding)
        {
            finding = _findingService.AddOrUpdate(finding);

            return Ok(finding);
        }

        // DELETE: api/findingsApi/5
        public IHttpActionResult Delete(int id)
        {
            _findingService.Delete(id);

            return Ok();
        }
    }
}
