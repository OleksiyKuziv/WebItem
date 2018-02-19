using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiTest.Models
{
  [Table("Items")]
  public class Item
  {

    #region Public Property
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Type { get; set; }

    #endregion

    #region Public Constructor

    public Item() { }

    #endregion    

  }
}