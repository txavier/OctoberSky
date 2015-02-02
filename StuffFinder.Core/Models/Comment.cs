namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("comment")]
    public partial class comment
    {
        public int commentId { get; set; }

        public int? findingId { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? date { get; set; }

        public bool finder { get; set; }

        public string name { get; set; }

        public string commentText { get; set; }

        public int? thingId { get; set; }

        public virtual finding finding { get; set; }

        public virtual finding finding1 { get; set; }

        public virtual thing thing { get; set; }
    }
}
