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
    public class me2ApiController : ApiController
    {
        private readonly IMe2Service _me2Service;

        public me2ApiController()
        {
            var container = IoC.Initialize();

            _me2Service = container.GetInstance<IMe2Service>();
        }

        public IHttpActionResult Post(me2 me2)
        {
            _me2Service.AddOrUpdate(me2);

            var count = _me2Service.GetCount(me2.thingId);

            return Ok(count);
        }
    }
}
