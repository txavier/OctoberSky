namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("thing")]
    public partial class thing
    {
        public thing()
        {
            comments = new HashSet<comment>();
            findings = new HashSet<finding>();
            images = new HashSet<image>();
            votes = new HashSet<vote>();
        }

        public int thingId { get; set; }

        public int? categoryId { get; set; }

        [Required]
        [StringLength(255)]
        public string name { get; set; }

        public int? locationId { get; set; }

        [StringLength(50)]
        public string upcCode { get; set; }

        public string userName { get; set; }

        public string description { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? foundDate { get; set; }

        public string imageUrl { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? postedDate { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? createdDate { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? modifiedDate { get; set; }

        public bool? softDelete { get; set; }

        public Guid recordTrackerGuid { get; set; }

        public virtual category category { get; set; }

        public virtual ICollection<comment> comments { get; set; }

        public virtual ICollection<finding> findings { get; set; }

        public virtual ICollection<image> images { get; set; }

        public virtual location location { get; set; }

        public virtual ICollection<vote> votes { get; set; }
    }
}
