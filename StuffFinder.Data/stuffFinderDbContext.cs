namespace StuffFinder.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using StuffFinder.Core.Models;

    public partial class stuffFinderDbContext : DbContext
    {
        public stuffFinderDbContext()
            : base("name=stuffFinderDbContext")
        {
        }

        public virtual DbSet<comment> comments { get; set; }
        public virtual DbSet<finding> findings { get; set; }
        public virtual DbSet<thing> things { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
