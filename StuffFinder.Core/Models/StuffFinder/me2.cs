namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class me2
    {
        public int me2Id { get; set; }

        [Required]
        [StringLength(256)]
        public string userName { get; set; }

        public int thingId { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime date { get; set; }

        public virtual thing thing { get; set; }
    }
}
