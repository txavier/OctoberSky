using System;
namespace StuffFinder.Core.Interfaces
{
    public interface INationalityNotificationService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.nationalityNotification>
    {
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.nationalityNotification> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);
        void Send(StuffFinder.Core.Models.nationalityNotification nationalityNotification, string userName);
        StuffFinder.Core.Models.nationalityNotification AddOrUpdate(StuffFinder.Core.Models.nationalityNotification nationalityNotification, string userName);
    }
}
