using AutoClutch.Auto.Service.Interfaces;
using StructureMap;
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
    public class categoriesApiController : ApiController
    {
        private readonly IService<category> _categoryService;

        public categoriesApiController()
        {
            var container = IoC.Initialize();

            _categoryService = container.GetInstance<IService<category>>();
        }

        // GET: api/categoryApi
        public IHttpActionResult Get()
        {
            var result = _categoryService.Get();

            return Ok(result);
        }

        // GET: api/categoryApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/categoryApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/categoryApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/categoryApi/5
        public void Delete(int id)
        {
        }
    }
}
