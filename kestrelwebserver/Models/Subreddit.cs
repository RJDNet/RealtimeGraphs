using System;
using System.ComponentModel.DataAnnotations;

namespace Reddit.Models
{
  public class Subreddit
  {
    public long Id { get; set; }
    public string Text { get; set; }
    public string Type { get; set; }

    [DataType(DataType.Date)]
    public DateTime StoredDate { get; set; }
  }
}