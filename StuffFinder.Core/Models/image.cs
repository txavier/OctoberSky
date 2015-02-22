namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("image")]
    public partial class image
    {
        public int imageId { get; set; }

        [Required]
        public byte[] imageBinary { get; set; }

        public int? thingId { get; set; }

        public int? findingId { get; set; }

        public string fileName { get; set; }

        public virtual finding finding { get; set; }

        public virtual thing thing { get; set; }
    }
}
