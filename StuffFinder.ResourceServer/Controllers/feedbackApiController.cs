using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/feedbackApi")]
    public class feedbackApiController : ApiController
    {
        private readonly IFeedbackService _feedbackService;

        public feedbackApiController()
        {
            var container = IoC.Initialize();

            _feedbackService = container.GetInstance<IFeedbackService>();
        }

        [Route("sendFeedback")]
        [HttpPost]
        public IHttpActionResult SendFeedback(Feedback feedback)
        {
            _feedbackService.Send(feedback);

            return Ok();
        }
    }
}
