using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace StuffFinder.Core.Models
{
    public class nationalityNotification
    {
        public int nationalityNotificationId { get; set; }

        [Required]
        [ForeignKey("nationality")]
        public int nationalityId { get; set; }

        public virtual nationality nationality { get; set; }

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
    }
}
