
using System.Data.Entity;

namespace WebApiTest.Models
{
  public class ItemContext : DbContext
  {

    #region Public DbSet

    public /*virtual*/ DbSet<Item> Items { get; set; }

    #endregion

    //#region Public Constructor

    //public ItemContext() : base("default") { }

    //#endregion

    //#region Override

    //protected override void OnModelCreating(DbModelBuilder modelBuilder)
    //{
    //  var sqliteConnectionInitializer = new SqliteCreateDatabaseIfNotExists<ItemContext>(modelBuilder);
    //  Database.SetInitializer(sqliteConnectionInitializer);
    //}

    //#endregion

  }
}