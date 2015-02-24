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
    public class imagesApiController : ApiController
    {
        private readonly IService<image> _imageService;

        public imagesApiController()
        {
            var container = IoC.Initialize();

            _imageService = container.GetInstance<IService<image>>();
        }

        // DELETE: api/imagesApi/5
        public IHttpActionResult Delete(int id)
        {
            _imageService.Delete(id);

            return Ok();
        }
    }
}
