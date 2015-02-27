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
    public class locationsApiController : ApiController
    {
        private readonly IService<location> _locationService;

        public locationsApiController()
        {
            var container = IoC.Initialize();

            _locationService = container.GetInstance<IService<location>>();
        }

        public IHttpActionResult Get()
        {
            var result = _locationService.GetAll();

            return Ok(result);
        }
    }
}
