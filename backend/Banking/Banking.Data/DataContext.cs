using Banking.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Transfer>()
                .HasMany(t => t.Assets)
                .WithOne(a =>a.Transfer)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Asset>? Assets { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<Account>? Accounts { get; set; }
        public DbSet<Transfer>? Transfers { get; set; }
    }
}
