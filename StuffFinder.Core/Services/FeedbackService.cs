using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Objects;

namespace StuffFinder.Core.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IStuffFinderEmailService _stuffFinderEmailService;
        
        private readonly IUserService _userService;

        public FeedbackService(IStuffFinderEmailService stuffFinderEmailService, IUserService userService)
        {
            _stuffFinderEmailService = stuffFinderEmailService;

            _userService = userService;
        }

        public void Send(Feedback feedback)
        {
            var emailList = _userService.GetAdminGroupEmailList();

            _stuffFinderEmailService.SendEmail(feedback.message, emailList, "Feedback Email From " + feedback.name + " - " + feedback.email);
        }
    }
}