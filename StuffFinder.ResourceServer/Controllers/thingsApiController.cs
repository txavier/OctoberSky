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
    //[Authorize]
    public class thingsApiController : ApiController
    {
        private readonly IThingService _thingService;

        public thingsApiController()
        {
            var container = IoC.Initialize();

            _thingService = container.GetInstance<IThingService>();
        }

        // GET: api/thingsApi
        public IHttpActionResult Get()
        {
            var result = new string[] { "value1", "value2" };

            return Ok(result);
        }

        // GET: api/thingsApi/5
        public IHttpActionResult Get(int id)
        {
            var result = "value";
            
            return Ok(result);
        }

        // POST: api/thingsApi
        public IHttpActionResult Post(thing thing)
        {
            thing = _thingService.AddOrUpdate(thing);

            return Ok(thing);
        }

        // PUT: api/thingsApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/thingsApi/5
        public void Delete(int id)
        {
        }
    }
}
