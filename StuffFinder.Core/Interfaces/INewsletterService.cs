using System;
namespace StuffFinder.Core.Interfaces
{
    public interface INewsletterService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.newsletter>
    {
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.newsletter> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true);
        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
        void Send(Models.newsletter newsletter);
    }
}
