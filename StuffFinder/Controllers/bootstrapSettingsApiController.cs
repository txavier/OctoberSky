using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StuffFinder.Controllers
{
    public class bootstrapSettingsApiController : ApiController
    {
        public IHttpActionResult Get()
        {
#if DEBUG
            var result = new
            {
                authenticationServerUrl = "https://localhost:44302/",
                resourceServerUrl = "http://localhost:22252/",
            };
#else
            //var result = new
            //{
            //    authenticationServerUrl = "http://authenticationapi.deltanovember.xaviersoftware.com/",
            //    resourceServerUrl = "http://resourceserver.deltanovember.xaviersoftware.com/",
            //};

            var result = new
            {
                authenticationServerUrl = "http://ec2-52-74-233-209.ap-southeast-1.compute.amazonaws.com/myFindr.AuthenticationApi/",
                resourceServerUrl = "http://ec2-52-74-233-209.ap-southeast-1.compute.amazonaws.com/myFindr.ResourceServer/",
            };
#endif

            return Ok(result); 
        }
    }
}
