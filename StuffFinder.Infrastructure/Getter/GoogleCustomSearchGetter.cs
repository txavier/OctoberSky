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
    public class GoogleCustomSearchGetter : IGoogleCustomSearchGetter
    {
        private List<string> _errors;

        public GoogleCustomSearchGetter()
        {
            _errors = new List<string>();
        }

        public IEnumerable<string> GetErrors()
        {
            return _errors.Distinct();
        }

        public StuffFinder.Core.Objects.GoogleCustomSearchResponse.RootObject GetGoogleCustomSearch(string searchQuery, string bingMapsKey, string baseAddress = null)
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

            urlArguments = "?q=" + HttpUtility.UrlEncode(searchQuery) + "&key=" + bingMapsKey + "&cx=003278039953552359606:z1fmi1jpvfw";

            baseAddress = baseAddress ?? "https://www.googleapis.com/customsearch/v1";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseAddress);

                client.DefaultRequestHeaders.Accept.Clear();

                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(urlArguments).Result;

                if (response.IsSuccessStatusCode)
                {
                    var rootObject = response.Content.ReadAsAsync<GoogleCustomSearchResponse.RootObject>().Result;

                    return rootObject;
                }
                else
                {
                    _errors.Add("Unable to get a correct response from Google, " + response.ReasonPhrase);
                }

                return null;
            }
        }
    }
}
