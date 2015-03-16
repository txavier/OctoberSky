using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace StuffFinder.Core.Models
{
    public class CityViewModel
    {
        public int cityId { get; set; }

        [Required]
        [StringLength(255)]
        public string name { get; set; }

        public double latitude { get; set; }

        public double longitude { get; set; }

        public virtual ICollection<location> locations { get; set; }

        public virtual ICollection<thingCity> thingCities { get; set; }

        public virtual ICollection<user> users { get; set; }

        public virtual ICollection<cityNotification> cityNotifications { get; set; }
    }
}
