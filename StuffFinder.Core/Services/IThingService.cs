using System;
namespace StuffFinder.Core.Services
{
    public interface IThingService
    {
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.thing> SeedThingsTable();
    }
}
