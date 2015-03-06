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
        public int userId { get; set; }

        [Required]
        [StringLength(256)]
        public string userName { get; set; }

        [StringLength(256)]
        public string email { get; set; }

        public bool? isStore { get; set; }

        public int? nationalityId { get; set; }

        public int? cityId { get; set; }

        public bool? isAdmin { get; set; }

        public bool? isNewsletterSubscriber { get; set; }

        public virtual city city { get; set; }

        public virtual nationality nationality { get; set; }
    }
}
