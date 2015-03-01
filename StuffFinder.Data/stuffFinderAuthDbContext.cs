namespace StuffFinder.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using StuffFinder.Core.Models;

    public partial class stuffFinderAuthDbContext : DbContext
    {
        public stuffFinderAuthDbContext()
            : base("name=stuffFinderAuthDbContext")
        {
        }

        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
