namespace StuffFinder.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("thingCity")]
    public partial class thingCity
    {
        public int thingCityId { get; set; }

        public int thingId { get; set; }

        public int cityId { get; set; }

        public virtual city city { get; set; }

        public virtual thing thing { get; set; }
    }
}
