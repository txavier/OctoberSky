using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IFeedbackService
    {
        void Send(StuffFinder.Core.Objects.Feedback feedback);
    }
}
