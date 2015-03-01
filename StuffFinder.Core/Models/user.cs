namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("user")]
    public partial class user
    {
        public user()
        {
            adminMembers = new HashSet<adminMember>();
        }

        public int userId { get; set; }

        [Required]
        [StringLength(256)]
        public string userName { get; set; }

        [Required]
        [StringLength(256)]
        public string email { get; set; }

        public bool? isStore { get; set; }

        public int? nationalityId { get; set; }

        public int? locationId { get; set; }

        public virtual ICollection<adminMember> adminMembers { get; set; }

        public virtual location location { get; set; }

        public virtual nationality nationality { get; set; }
    }
}
