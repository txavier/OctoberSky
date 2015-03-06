using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IStuffFinderEmailService
    {
        void SendEmail(string emailMessage, System.Collections.Generic.List<string> adminGroupEmailList, string subject);
    }
}
