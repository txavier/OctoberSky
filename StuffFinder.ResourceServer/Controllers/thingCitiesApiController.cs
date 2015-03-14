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
    public class thingCitiesApiController : ApiController
    {
        private readonly IService<thingCity> _thingCitiesService;

        public thingCitiesApiController()
        {
            var container = IoC.Initialize();

            _thingCitiesService = container.GetInstance<IService<thingCity>>();
        }

        public IHttpActionResult Post(thingCity thingCity)
        {
            thingCity = _thingCitiesService.AddOrUpdate(thingCity);

            return Ok(thingCity);
        }
    }
}
