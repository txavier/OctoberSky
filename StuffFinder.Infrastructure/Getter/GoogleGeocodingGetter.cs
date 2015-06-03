using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace StuffFinder.Infrastructure.Getter
{
    public class GoogleGeocodingGetter : IGoogleGeocodingGetter
    {
        private List<string> _errors;

        public GoogleGeocodingGetter()
        {
            _errors = new List<string>();
        }

        public IEnumerable<string> GetErrors()
        {
            return _errors;
        }

        public StuffFinder.Core.Objects.GoogleGeocodingResponse.RootObject GetGoogleCustomSearch(string searchQuery, string bingMapsKey, 
            string regionTld, string baseAddress = null)
        {
            string urlArguments = string.Empty;

            if (string.IsNullOrEmpty(bingMapsKey.Trim()))
            {
                throw new ArgumentNullException("Unable to continue, the Bing Maps key has not been supplied.");
            }

            if (string.IsNullOrEmpty(searchQuery.Trim()))
            {
                throw new ArgumentNullException("Unable to continue, the query string has not been supplied.");
            }

            urlArguments = "api/geocode/json?address=" + HttpUtility.UrlEncode(searchQuery) + "&key=" + bingMapsKey + "&region=" + regionTld;

            baseAddress = baseAddress ?? "https://maps.googleapis.com/maps/";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseAddress);

                client.DefaultRequestHeaders.Accept.Clear();

                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(urlArguments).Result;

                if (response.IsSuccessStatusCode)
                {
                    var rootObject = response.Content.ReadAsAsync<GoogleGeocodingResponse.RootObject>().Result;

                    return rootObject;
                }
                else
                {
                    _errors.Add("The web call was not successfull.");
                }

                return null;
            }
        }
    }
}
