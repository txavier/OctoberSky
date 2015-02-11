using System;

namespace StuffFinder.Core.Interfaces
{
    public interface IThingService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.thing>
    {
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.thing> GetMostMe2Things();

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.thing> GetFoundThings();

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.thing> SearchThings(string query);
    }
}
