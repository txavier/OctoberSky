namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("adminMember")]
    public partial class adminMember
    {
        public int adminMemberId { get; set; }

        [Required]
        [StringLength(256)]
        public string userName { get; set; }
    }
}
