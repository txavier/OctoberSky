using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Omu.ValueInjecter;

namespace StuffFinder.Infrastructure.Data
{
    public class EfQueryGetMostMe2ThingsByDate : StuffFinder.Core.Interfaces.IEfQueryGetMostMe2ThingsByDate
    {
        public IEnumerable<thing> GetMostMe2(DateTime startDateTime, DateTime endDateTime, int? take = null, string includeProperties = null, bool LazyLoadingEnabled = true,
            bool ProxyCreationEnabled = true)
        {
            var context = new StuffFinder.Data.stuffFinderDbContext();

            context.Configuration.LazyLoadingEnabled = LazyLoadingEnabled;

            context.Configuration.ProxyCreationEnabled = ProxyCreationEnabled;

            var result =
                context.things
                .Include("images")
                .Include("findings")
                .Include("me2")
                .Where(i => i.me2.Where(l => l.date > startDateTime && l.date < endDateTime).Any())
                .OrderBy(i => i.me2.Count)
                .Take(take ?? Int32.MaxValue);

            return result;
        }
    }
}
