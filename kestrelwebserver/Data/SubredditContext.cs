using Microsoft.EntityFrameworkCore;
using Reddit.Models;

namespace Reddit.Data
{
  public class SubredditContext : DbContext
  {
    public SubredditContext(DbContextOptions<SubredditContext> options)
        : base(options)
    {
    }

    public DbSet<Subreddit> Subreddits { get; set; }
    //public DbSet<Topic> Topics { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Subreddit>().ToTable("Subreddit");
      //modelBuilder.Entity<Topic>().ToTable("Topic");
    }
  }
}