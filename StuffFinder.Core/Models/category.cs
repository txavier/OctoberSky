namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("category")]
    public partial class category
    {
        public category()
        {
            things = new HashSet<thing>();
        }

        public int categoryId { get; set; }

        public string name { get; set; }

        public virtual ICollection<thing> things { get; set; }
    }
}
