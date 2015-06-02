using StuffFinder.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Infrastructure.Getter
{
    public class ImageFromUrlGetter : IImageFromUrlGetter
    {
        /// <summary>
        /// This method turns an image located at a url into a byte array.
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        /// <see cref="http://snipplr.com/view/64141/"/>
        public byte[] GetImageFromUrl(string url)
        {
            System.Net.HttpWebRequest request = null;
            System.Net.HttpWebResponse response = null;
            byte[] b = null;

            request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
            response = (System.Net.HttpWebResponse)request.GetResponse();

            if (request.HaveResponse)
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    Stream receiveStream = response.GetResponseStream();
                    using (BinaryReader br = new BinaryReader(receiveStream))
                    {
                        b = br.ReadBytes(500000);
                        br.Close();
                    }
                }
            }

            return b;
        }
    }
}
