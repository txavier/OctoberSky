﻿using AutoClutch.Auto.Service.Interfaces;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using StuffFinder.ResourceServer.DependencyResolution;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace StuffFinder.ResourceServer.Controllers
{
    //[Authorize]
    [RoutePrefix("api/thingsApi")]
    public class thingsApiController : ApiController
    {
        private readonly IThingService _thingService;

        private readonly IService<image> _imageService;
        
        public thingsApiController()
        {
            var container = IoC.Initialize();

            _thingService = container.GetInstance<IThingService>();

            _imageService = container.GetInstance<IService<image>>();
        }

        // GET: api/thingsApi
        public IHttpActionResult Get()
        {
            var result = _thingService.Get();

            return Ok(result);
        }

        // GET: api/thingsApi/5
        public IHttpActionResult Get(int id)
        {
            // Faster but is not displaying the findings.
            var result = _thingService.ToViewModel(
                _thingService.Get(filter: i => i.thingId == id, includeProperties: "images,findings,findings.location,me2,thingCities,thingCities.city,category",
                lazyLoadingEnabled: false, proxyCreationEnabled: false).FirstOrDefault());

            return Ok(result);
        }

        [Route("GetMostMe2Things/{itemsPerPage}")]
        [HttpGet]
        public IHttpActionResult GetMostMe2Things(int itemsPerPage)
        {
            var result = _thingService.GetSixMonthsMostMe2Things(itemsPerPage);

            return Ok(result);
        }

        [Route("GetFoundThings")]
        public IHttpActionResult GetFoundThings()
        {
            var result = _thingService.ToViewModels(_thingService.GetFoundThings());

            return Ok(result);
        }

        [Route("search")]
        [HttpGet]
        // GET: api/locationApi/5
        public IHttpActionResult Search([FromUri]SearchCriteria searchCriteria)
        {
            var result = _thingService.SearchViewModels(searchCriteria, lazyLoadingEnabled: false, proxyCreationEnabled: false);

            return Ok(result);
        }

        [Route("search/count")]
        [HttpGet]
        // GET: api/locationApi/5
        public IHttpActionResult SearchCount([FromUri]SearchCriteria searchCriteria)
        {
            var result = _thingService.SearchCount(searchCriteria);

            return Ok(result);
        }

        [Route("searchThingsInGoogle/{searchText}")]
        [HttpGet]
        public IHttpActionResult SearchThingsInGoogle(string searchText)
        {
            var result = _thingService.SearchThingsInGoogle(searchText);

            if(result == null)
            {
                return BadRequest(_thingService.GetErrors().Aggregate((current, next) => current + " " + next));
            }

            return Ok(result);
        }

        // POST: api/thingsApi
        public IHttpActionResult Post(thing thing)
        {
            if (!_thingService.IsWriteAccessAllowed(thing, User.Identity.Name))
            {
                return Unauthorized();
            }
            
            thing = _thingService.AddOrUpdate(thing, User.Identity.Name);

            return Ok(thing);
        }

        [Route("files")]
        [HttpPost]
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateResponse(HttpStatusCode.UnsupportedMediaType, "Unsupported media type.");
            }

            // Read the file and form data.
            MultipartFormDataMemoryStreamProvider provider = new MultipartFormDataMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            // Extract the fields from the form data.
            int thingId = Int32.Parse(provider.FormData["id"]);

            var userName = provider.FormData["userName"];

            // Check if files are on the request.
            if (!provider.FileStreams.Any())
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No file uploaded.");
            }

            IList<string> uploadedFiles = new List<string>();
            foreach (KeyValuePair<string, Stream> file in provider.FileStreams)
            {
                string fileName = file.Key;
                Stream stream = file.Value;

                // Do something with the uploaded file
                //UploadManager.Upload(stream, fileName, uploadType, description);

                byte[] fileData = null;
                using (var binaryReader = new BinaryReader(file.Value))
                {
                    fileData = binaryReader.ReadBytes((int)file.Value.Length);

                    var image = new image()
                    {
                        thingId = thingId,
                        imageBinary = fileData,
                        fileName = fileName,
                    };

                    // If this user is not the same user as the one that owns this image
                    // and this user is not an admin then return with this http status.
                    var thing = _thingService.Find(thingId);

                    if(!_thingService.IsWriteAccessAllowed(thingId, userName))
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "User " + userName + " is not authorized to make this change.");
                    }

                    _imageService.AddOrUpdate(image);
                }

                // TODO Put file in the file service with the thingid that it relates to.

                // Keep track of the filename for the response
                uploadedFiles.Add(fileName);
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Successfully Uploaded: " + string.Join(", ", uploadedFiles));
        }

        // PUT: api/thingsApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/thingsApi/5
        public IHttpActionResult Delete(int id)
        {
            if(!_thingService.IsWriteAccessAllowed(id, User.Identity.Name))
            {
                return Unauthorized();
            }

            _thingService.Delete(id);

            return Ok();
        }
    }
}