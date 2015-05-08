using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IEfQueryGetMostMe2ThingsByDate
    {
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.thing> GetMostMe2(DateTime startDateTime, DateTime endDateTime, int? take = null, string includeProperties = null, bool LazyLoadingEnabled = true, bool ProxyCreationEnabled = true);
    }
}
