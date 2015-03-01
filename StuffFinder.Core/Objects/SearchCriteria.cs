using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Objects
{
    public class SearchCriteria
    {
        public int? currentPage { get; set; }

        public int? itemsPerPage { get; set; }

        public string searchText { get; set; }

        public string orderBy { get; set; }
    }
}
