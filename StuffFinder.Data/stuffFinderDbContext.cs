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

        public virtual DbSet<category> categories { get; set; }
        public virtual DbSet<city> cities { get; set; }
        public virtual DbSet<cityNotification> cityNotifications { get; set; }
        public virtual DbSet<finding> findings { get; set; }
        public virtual DbSet<image> images { get; set; }
        public virtual DbSet<location> locations { get; set; }
        public virtual DbSet<me2> me2 { get; set; }
        public virtual DbSet<nationality> nationalities { get; set; }
        public virtual DbSet<nationalityNotification> nationalityNotifications { get; set; }
        public virtual DbSet<newsletter> newsletters { get; set; }
        public virtual DbSet<setting> settings { get; set; }
        public virtual DbSet<thing> things { get; set; }
        public virtual DbSet<thingCity> thingCities { get; set; }
        public virtual DbSet<user> users { get; set; }
        public virtual DbSet<vote> votes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<city>()
                .HasMany(e => e.cityNotifications)
                .WithRequired(e => e.city)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<city>()
                .HasMany(e => e.thingCities)
                .WithRequired(e => e.city)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<location>()
                .HasMany(e => e.findings)
                .WithRequired(e => e.location)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<nationality>()
                .HasMany(e => e.nationalityNotifications)
                .WithRequired(e => e.nationality)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<thing>()
                .HasMany(e => e.me2)
                .WithRequired(e => e.thing)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<thing>()
                .HasMany(e => e.thingCities)
                .WithRequired(e => e.thing)
                .WillCascadeOnDelete(false);
        }
    }
}
