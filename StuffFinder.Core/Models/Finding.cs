namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("finding")]
    public partial class finding
    {
        public finding()
        {
            comments = new HashSet<comment>();
            comments1 = new HashSet<comment>();
            images = new HashSet<image>();
            votes = new HashSet<vote>();
        }

        public int findingId { get; set; }

        public int thingId { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? date { get; set; }

        public int? locationId { get; set; }

        [StringLength(256)]
        public string price { get; set; }

        [StringLength(256)]
        public string userName { get; set; }

        public virtual ICollection<comment> comments { get; set; }

        public virtual ICollection<comment> comments1 { get; set; }

        public virtual thing thing { get; set; }

        public virtual location location { get; set; }

        public virtual ICollection<image> images { get; set; }

        public virtual ICollection<vote> votes { get; set; }
    }
}
