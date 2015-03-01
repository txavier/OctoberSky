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

        public virtual DbSet<adminMember> adminMembers { get; set; }
        public virtual DbSet<category> categories { get; set; }
        public virtual DbSet<city> cities { get; set; }
        public virtual DbSet<finding> findings { get; set; }
        public virtual DbSet<image> images { get; set; }
        public virtual DbSet<location> locations { get; set; }
        public virtual DbSet<nationality> nationalities { get; set; }
        public virtual DbSet<setting> settings { get; set; }
        public virtual DbSet<thing> things { get; set; }
        public virtual DbSet<user> users { get; set; }
        public virtual DbSet<vote> votes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<location>()
                .HasMany(e => e.findings)
                .WithRequired(e => e.location)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<user>()
                .HasMany(e => e.adminMembers)
                .WithRequired(e => e.user)
                .WillCascadeOnDelete(false);
        }
    }
}
