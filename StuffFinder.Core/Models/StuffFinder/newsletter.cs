namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("newsletter")]
    public partial class newsletter
    {
        public int newsletterId { get; set; }

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
