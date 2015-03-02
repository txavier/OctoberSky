namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("city")]
    public partial class city
    {
        public city()
        {
            locations = new HashSet<location>();
            users = new HashSet<user>();
        }

        public int cityId { get; set; }

        [Required]
        [StringLength(255)]
        public string name { get; set; }

        public double latitude { get; set; }

        public double longitude { get; set; }

        public virtual ICollection<location> locations { get; set; }

        public virtual ICollection<user> users { get; set; }
    }
}
