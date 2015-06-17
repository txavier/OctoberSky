using System;
namespace StuffFinder.Core.Interfaces
{
    public interface ICityNotificationService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.cityNotification>
    {
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.cityNotification> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true);
        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
        void Send(StuffFinder.Core.Models.cityNotification cityNotification, string userName);
        StuffFinder.Core.Models.cityNotification AddOrUpdate(StuffFinder.Core.Models.cityNotification cityNotification, string userName);
    }
}
