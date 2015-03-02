using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Models.ViewModels
{
    public class UserViewModel
    {
        public int userId { get; set; }

        public string userName { get; set; }

        public string email { get; set; }

        public bool? isStore { get; set; }

        public bool? isAdmin { get; set; }

        public int? nationalityId { get; set; }

        public string nationalityName { get; set; }

        public int? locationId { get; set; }

        public string locationDisplayLabel { get; set; }

    }
}
