using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using myFinder.ResourceServer.DependencyResolution;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace myFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/settingsApi")]
    public class settingsApiController : ApiController
    {
        private readonly ISettingService _settingService;

        public settingsApiController()
        {
            var container = IoC.Initialize();

            _settingService = container.GetInstance<ISettingService>();
        }

        // GET: api/settingsApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [Route("{settingKey}")]
        // GET: api/settingsApi/5
        public IHttpActionResult Get(string settingKey)
        {
            var result = _settingService.GetSettingValueBySettingKey(settingKey);

            return Ok(result);
        }

        [Route("getJumbotronVideoUrlSetting")]
        public IHttpActionResult GetJumbotronVideoUrlSetting()
        {
            var result = _settingService.GetSettingBySettingKey("jumbotronVideoUrl");

            return Ok(result);
        }

        // POST: api/settingsApi
        public IHttpActionResult Post(setting setting)
        {
            setting = _settingService.AddOrUpdate(setting);

            return Ok(setting);
        }

        // PUT: api/settingsApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/settingsApi/5
        public void Delete(int id)
        {
        }
    }
}
