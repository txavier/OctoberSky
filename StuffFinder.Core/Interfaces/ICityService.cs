using System;
namespace StuffFinder.Core.Interfaces
{
    public interface ICityService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.city>
    {
        StuffFinder.Core.Models.city AddOrUpdate(StuffFinder.Core.Models.city city);
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.city> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
    }
}
