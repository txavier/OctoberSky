namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ImageViewModel
    {
        public string date { get; set; }

        public string mimeType { get; set; }

        public string extension { get; set; }

        public object file { get; set; }

        public int? thingId { get; set; }

        public int? findingId { get; set; }
    }
}
