namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("location")]
    public partial class location
    {
        public location()
        {
            findings = new HashSet<finding>();
            things = new HashSet<thing>();
        }

        public int locationId { get; set; }

        [StringLength(256)]
        public string locationName { get; set; }

        [StringLength(256)]
        public string formattedAddress { get; set; }

        public double latitude { get; set; }

        public double longitude { get; set; }

        public virtual ICollection<finding> findings { get; set; }

        public virtual ICollection<thing> things { get; set; }
    }
}
