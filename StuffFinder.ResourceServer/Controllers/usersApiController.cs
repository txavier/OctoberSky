using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    [RoutePrefix("api/usersApi")]
    public class usersApiController : ApiController
    {
        private readonly IUserService _userService;

        public usersApiController()
        {
            var container = IoC.Initialize();

            _userService = container.GetInstance<IUserService>();
        }

        // GET: api/userApi
        public IHttpActionResult Get()
        {
            var result = _userService.Get();

            return Ok(result);
        }

        public IHttpActionResult Get(int id)
        {
            var result = _userService.Find(id);

            return Ok(result);
        }

        [Route("search")]
        [HttpPost]
        // GET: api/userApi/5
        public IHttpActionResult Search(SearchCriteria searchCriteria)
        {
            var result = _userService.Search(searchCriteria);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpPost]
        // GET: api/userApi/5
        public IHttpActionResult SearchCount(SearchCriteria searchCriteria)
        {
            var result = _userService.SearchCount(searchCriteria);

            return Ok(result);
        }

        [Route("syncUsers")]
        [HttpPost]
        public IHttpActionResult SyncUsers()
        {
            var result = _userService.SyncUserTable();

            return Ok(result);
        }

        // POST: api/userApi
        public IHttpActionResult Post(user user)
        {
            _userService.AddOrUpdate(user);

            return Ok(user);
        }

        // DELETE: api/userApi/5
        public IHttpActionResult Delete(int id)
        {
            _userService.Delete(id);

            return Ok();
        }
    }
}