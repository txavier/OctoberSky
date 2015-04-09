using myFinder.ResourceServer.DependencyResolution;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace myFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/votesApi")]
    public class votesApiController : ApiController
    {
        private readonly IVoteService _voteService;
        
        private readonly IThingService _thingService;

        public votesApiController()
        {
            var container = IoC.Initialize();

            _voteService = container.GetInstance<IVoteService>();

            _thingService = container.GetInstance<IThingService>();
        }

        [Route("upVote")]
        [HttpPost]
        public IHttpActionResult upVote(vote vote)
        {
            vote = _voteService.upVote(vote, User.Identity.Name);

            return Ok(vote);
        }

        [Route("downVote")]
        [HttpPost]
        public IHttpActionResult downVote(vote vote)
        {
            vote = _voteService.downVote(vote, User.Identity.Name);

            return Ok(vote);
        }
    }
}
