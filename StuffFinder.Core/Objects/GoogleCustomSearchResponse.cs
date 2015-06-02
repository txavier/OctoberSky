﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Objects
{
    public class GoogleCustomSearchResponse
    {
        public class Url
        {
            public string type { get; set; }
            public string template { get; set; }
        }

        public class NextPage
        {
            public string title { get; set; }
            public string totalResults { get; set; }
            public string searchTerms { get; set; }
            public int count { get; set; }
            public int startIndex { get; set; }
            public string inputEncoding { get; set; }
            public string outputEncoding { get; set; }
            public string safe { get; set; }
            public string cx { get; set; }
        }

        public class Request
        {
            public string title { get; set; }
            public string totalResults { get; set; }
            public string searchTerms { get; set; }
            public int count { get; set; }
            public int startIndex { get; set; }
            public string inputEncoding { get; set; }
            public string outputEncoding { get; set; }
            public string safe { get; set; }
            public string cx { get; set; }
        }

        public class Queries
        {
            public List<NextPage> nextPage { get; set; }
            public List<Request> request { get; set; }
        }

        public class Context
        {
            public string title { get; set; }
        }

        public class SearchInformation
        {
            public double searchTime { get; set; }
            public string formattedSearchTime { get; set; }
            public string totalResults { get; set; }
            public string formattedTotalResults { get; set; }
        }

        public class CseImage
        {
            public string src { get; set; }
        }

        public class CseThumbnail
        {
            public string width { get; set; }
            public string height { get; set; }
            public string src { get; set; }
        }

        public class Hproduct
        {
            public string fn { get; set; }
        }

        public class Pagemap
        {
            public List<CseImage> cse_image { get; set; }
            public List<CseThumbnail> cse_thumbnail { get; set; }
            public List<Hproduct> hproduct { get; set; }
        }

        public class Item
        {
            public string kind { get; set; }
            public string title { get; set; }
            public string htmlTitle { get; set; }
            public string link { get; set; }
            public string displayLink { get; set; }
            public string snippet { get; set; }
            public string htmlSnippet { get; set; }
            public string cacheId { get; set; }
            public string formattedUrl { get; set; }
            public string htmlFormattedUrl { get; set; }
            public Pagemap pagemap { get; set; }
        }

        public class RootObject
        {
            public string kind { get; set; }
            public Url url { get; set; }
            public Queries queries { get; set; }
            public Context context { get; set; }
            public SearchInformation searchInformation { get; set; }
            public List<Item> items { get; set; }
            public Error error { get; set; }
        }

        public class Error2
        {
            public string domain { get; set; }
            public string reason { get; set; }
            public string message { get; set; }
            public string extendedHelp { get; set; }
        }

        public class Error
        {
            public List<Error2> errors { get; set; }
            public int code { get; set; }
            public string message { get; set; }
        }
    }
}
