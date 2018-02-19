using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using WebApiTest.Models;

namespace ItemWebApi.Controllers
{
  public class ValuesController : ApiController
  {
    // GET api/values
    public IEnumerable<Item> Get()
    {
      using (var db = new ItemContext())
      {
        return db.Items.ToList();
      }
    }

    // GET api/values/5
    public IHttpActionResult Get(Guid? id)
    {
      using (var db = new ItemContext())
      {
        var item = db.Items.Find(id);
        if (item == null)
        {
          return NotFound();
        }
        return Ok(item);
      }
    }

    // POST api/values
    [HttpPost]
    async public Task<IHttpActionResult> Post(Item value)
    {
      using (var db = new ItemContext())
      {
        value.Id = Guid.NewGuid();
        db.Items.Add(value);       
        await db.SaveChangesAsync();
        return Ok(value);
      }
    }

    // PUT api/values/5
    [HttpPut]
    public IHttpActionResult Put(Guid? id, Item item)
    {
      if (id == null )
      {
        return BadRequest();
      }
      using (var db = new ItemContext())
      {
        var itemForUpdate = db.Items.Where(c=>c.Id == item.Id).FirstOrDefault();
        itemForUpdate.Name = item.Name;
        itemForUpdate.Type = item.Type;
         db.SaveChanges();
        return Ok(db.Items.ToList());
      }
    }

    // DELETE api/values/5
    [HttpDelete]
    async public Task<bool> Delete(Guid? id)
    {
      if (id == null)
      {
        return false;
      }
      using (var db = new ItemContext())
      {
        var itemDelete = db.Items.Find(id);
        db.Items.Remove(itemDelete);
        await db.SaveChangesAsync();
        return true;
      }
    }
  }
}
