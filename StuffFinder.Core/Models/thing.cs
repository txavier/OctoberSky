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
        }

        public int thingId { get; set; }

        public int? categoryId { get; set; }

        [Required]
        [StringLength(255)]
        public string name { get; set; }

        [StringLength(255)]
        public string addressLine1 { get; set; }

        [StringLength(255)]
        public string addressLine2 { get; set; }

        [StringLength(255)]
        public string city { get; set; }

        [StringLength(255)]
        public string country { get; set; }

        public double? latitude { get; set; }

        public double? longitude { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? dateSpotted { get; set; }

        [StringLength(50)]
        public string priceSpotted { get; set; }

        [StringLength(50)]
        public string upcCode { get; set; }

        public string userName { get; set; }

        public string category { get; set; }

        public string description { get; set; }

        public bool found { get; set; }

        public string foundDate { get; set; }

        public string imageUrl { get; set; }

        public string me2 { get; set; }

        public string postedDate { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? createdDate { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? modifiedDate { get; set; }

        public bool? softDelete { get; set; }

        public Guid recordTrackerGuid { get; set; }

        public virtual category category1 { get; set; }

        public virtual ICollection<comment> comments { get; set; }

        public virtual ICollection<finding> findings { get; set; }

        public virtual ICollection<image> images { get; set; }
    }
}
