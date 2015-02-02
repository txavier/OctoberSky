namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("image")]
    public partial class ImageViewModel
    {
        public int imageId { get; set; }

        [Required]
        public byte[] imageBinary { get; set; }

        public int? thingId { get; set; }

        public int? findingId { get; set; }
    }
}
