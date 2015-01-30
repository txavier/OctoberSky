namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class finding
    {
        public finding()
        {
            comments = new HashSet<comment>();
        }

        public int findingId { get; set; }

        public int thingId { get; set; }

        public string date { get; set; }

        public int downVote { get; set; }

        public string location { get; set; }

        public string price { get; set; }

        public int upVote { get; set; }

        public virtual ICollection<comment> comments { get; set; }

        public virtual thing thing { get; set; }
    }
}
