using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace StuffFinder.Core.Models
{
    public class cityNotification
    {
        public int cityNotificationId { get; set; }

        [Required]
        [ForeignKey("city")]
        public int cityId { get; set; }

        public virtual city city { get; set; }

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
