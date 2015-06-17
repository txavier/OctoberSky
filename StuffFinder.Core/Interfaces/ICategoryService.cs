using System;
namespace StuffFinder.Core.Interfaces
{
    public interface ICategoryService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.category>
    {
        StuffFinder.Core.Models.category AddOrUpdate(StuffFinder.Core.Models.category category);
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.category> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true);
        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
    }
}
