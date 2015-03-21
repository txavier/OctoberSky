namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class nationalityNotification
    {
        public int nationalityNotificationId { get; set; }

        public int nationalityId { get; set; }

        [Required]
        [StringLength(256)]
        public string userName { get; set; }

        [Required]
        public string messageBody { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime dateCreated { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? dateSent { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? dateLastModified { get; set; }

        public virtual nationality nationality { get; set; }
    }
}
