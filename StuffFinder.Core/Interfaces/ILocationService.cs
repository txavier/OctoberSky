using System;
namespace StuffFinder.Core.Interfaces 
{
    public interface ILocationService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.location>
    {
        StuffFinder.Core.Models.location AddOrUpdate(StuffFinder.Core.Models.location location);
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.location> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true);
        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.location> SearchNewLocation(string locationName);
        StuffFinder.Core.Models.location SearchSingleNewLocation(string locationName);
    }
}
