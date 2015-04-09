﻿//using AutoClutch.Auto.Service.Interfaces;
//using StuffFinder.Core.Interfaces;
//using StuffFinder.Core.Models;
//using StuffFinder.Core.Objects;
//using myFinder.ResourceServer.DependencyResolution;
//using System.Web.Http;
//using System.Linq;

using myFinder.ResourceServer.DependencyResolution;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace myFinder.ResourceServer.Controllers
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

        [Route("")]
        // GET: api/userApi
        public IHttpActionResult Get()
        {
            var result = _userService.Get();

            return Ok(result);
        }

        [AllowAnonymous]
        [Route("{id}")]
        public IHttpActionResult Get(int id)
        {
            var result = _userService.Find(id);

            return Ok(result);
        }

        [Authorize]
        [Route("getLoggedInUser")]
        [HttpGet]
        public IHttpActionResult GetLoggedInUser()
        {
            var result = _userService.Get(filter: i => i.userName == User.Identity.Name, lazyLoadingEnabled: false, proxyCreationEnabled: false).SingleOrDefault();

            // If the user is not in the main database it is possible the user is in the authentication database
            // and it has not yet been synced.  Sync the databases now and check again to see if the user exists.
            if(result == null)
            {
                _userService.SyncUserTable();

                result = _userService.Get(filter: i => i.userName == User.Identity.Name, lazyLoadingEnabled: false, proxyCreationEnabled: false).SingleOrDefault();
            }

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
            _userService.AddOrUpdate(user, User.Identity.Name);

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