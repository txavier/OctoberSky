namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("nationality")]
    public partial class nationality
    {
        public nationality()
        {
            users = new HashSet<user>();
        }

        public int nationalityId { get; set; }

        [Required]
        [StringLength(256)]
        public string name { get; set; }

        public virtual ICollection<user> users { get; set; }
    }
}
