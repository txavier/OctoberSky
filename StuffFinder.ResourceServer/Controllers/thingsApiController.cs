using AutoClutch.Auto.Service.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Models.ViewModels;
using StuffFinder.ResourceServer.DependencyResolution;
using StuffFinder.ResourceServer.Filters;
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
            var result = _thingService.Find(id);

            return Ok(result);
        }

        [Route("GetMostMe2Things")]
        public IHttpActionResult GetMostMe2Things()
        {
            var result = _thingService.ToViewModels(_thingService.GetMostMe2Things());

            return Ok(result);
        }

        [Route("GetFoundThings")]
        public IHttpActionResult GetFoundThings()
        {
            var result = _thingService.ToViewModels(_thingService.GetFoundThings());

            return Ok(result);
        }

        [Route("SearchThings")]
        [HttpGet]
        public IHttpActionResult SearchThings()
        {
            var result = _thingService.ToViewModels(_thingService.SearchThings(null));

            return Ok(result);
        }

        [Route("SearchThings/{query}")]
        [HttpGet]
        public IHttpActionResult SearchThings(string query)
        {
            var result = _thingService.ToViewModels(_thingService.SearchThings(query));

            return Ok(result);
        }

        // POST: api/thingsApi
        public IHttpActionResult Post(thing thing)
        {
            thing = _thingService.AddOrUpdate(thing);

            return Ok(thing);
        }

        //[Route("PostFiles/{jObject}")]
        //[HttpPost]
        //public IHttpActionResult PostFiles(JObject jObject)
        //{
        //    return Ok();
        //}

        //private static readonly string ServerUploadFolder = "C:\\Temp"; //Path.GetTempPath();

        //private static readonly string ServerUploadFolder = @"C:\Users\Theo\Pictures\Futon\temp";

        //[Route("files1")]
        //[HttpPost]
        //[ValidateMimeMultipartContentFilter]
        //public async Task<FileResult> UploadSingleFile()
        //{
        //    var streamProvider = new MultipartFormDataStreamProvider(ServerUploadFolder);
        //    await Request.Content.ReadAsMultipartAsync(streamProvider);

        //    var result = new FileResult
        //    {
        //        FileNames = streamProvider.FileData.Select(entry => entry.LocalFileName),
        //        Names = streamProvider.FileData.Select(entry => entry.Headers.ContentDisposition.FileName),
        //        ContentTypes = streamProvider.FileData.Select(entry => entry.Headers.ContentType.MediaType),
        //        Description = streamProvider.FormData["description"],
        //        CreatedTimestamp = DateTime.UtcNow,
        //        UpdatedTimestamp = DateTime.UtcNow,
        //        DownloadLink = "TODO, will implement when file is persisited"
        //    };

        //    return result;
        //}

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
            int thingId = Int32.Parse(provider.FormData[0]);

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
            _thingService.Delete(id);

            return Ok();
        }
    }
}