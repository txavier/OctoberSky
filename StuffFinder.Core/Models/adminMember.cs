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

        public int userId { get; set; }

        public virtual user user { get; set; }
    }
}
