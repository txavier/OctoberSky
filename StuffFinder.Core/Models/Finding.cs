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
        }

        public int findingId { get; set; }

        public int thingId { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? date { get; set; }

        public int downVote { get; set; }

        public string location { get; set; }

        public string price { get; set; }

        public int upVote { get; set; }

        public string userName { get; set; }

        public virtual ICollection<comment> comments { get; set; }

        public virtual ICollection<comment> comments1 { get; set; }

        public virtual thing thing { get; set; }

        public virtual ICollection<image> images { get; set; }
    }
}
