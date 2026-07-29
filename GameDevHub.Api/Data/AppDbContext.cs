using GameDevHub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameDevHub.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; } = null!;
    }
}
