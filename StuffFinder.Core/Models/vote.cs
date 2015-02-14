namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("vote")]
    public partial class vote
    {
        public int voteId { get; set; }

        [Required]
        [StringLength(256)]
        public string userName { get; set; }

        public int? thingId { get; set; }

        public int? findingId { get; set; }

        public int value { get; set; }

        public virtual finding finding { get; set; }

        public virtual thing thing { get; set; }
    }
}
