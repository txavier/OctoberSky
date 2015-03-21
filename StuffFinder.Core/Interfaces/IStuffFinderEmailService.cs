using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IStuffFinderEmailService
    {
        void SendEmail(string emailMessage, System.Collections.Generic.IEnumerable<string> groupEmailList, string subject);

        void SendItemFindingNotification(StuffFinder.Core.Models.finding finding, StuffFinder.Core.Models.location location, StuffFinder.Core.Models.thing thing, System.Collections.Generic.IEnumerable<string> emailAddresses);

        string CreateItemFindingNotificationEmailMessage(StuffFinder.Core.Models.finding finding, StuffFinder.Core.Models.location location, StuffFinder.Core.Models.thing thing);

        void SendNewItemEmailNotification(StuffFinder.Core.Models.finding finding, StuffFinder.Core.Models.location location, StuffFinder.Core.Models.thing thing, System.Collections.Generic.IEnumerable<string> emailAddresses);

        string CreateNewFindingEmailMessage(StuffFinder.Core.Models.finding finding, StuffFinder.Core.Models.location location, StuffFinder.Core.Models.thing thing);
    }
}
