using System;
namespace StuffFinder.Core.Interfaces
{
    public interface INationalityService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.nationality>
    {
        StuffFinder.Core.Models.nationality AddOrUpdate(StuffFinder.Core.Models.nationality nationality);
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.nationality> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
    }
}
