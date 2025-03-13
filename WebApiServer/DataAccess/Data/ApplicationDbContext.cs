using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Models;

namespace DataAccess.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : DbContext(options)
    {
        //Place to add DbSets
        public required DbSet<Product> Products { get; set; }
        public required DbSet<Basket> Baskets { get; set; }


        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     /*modelBuilder.ApplyConfigurationsFromAssembly(typeof(InvoiceDbContext).Assembly);*/
        // }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
