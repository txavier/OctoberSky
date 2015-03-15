using StuffFinder.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XavierEnterpriseLibrary.Core.Interfaces;

namespace StuffFinder.Core.Services
{
    public class StuffFinderEmailService : IStuffFinderEmailService
    {
        private readonly IEmailService _emailService;
        
        private readonly ISettingService _settingService;

        public StuffFinderEmailService(IEmailService emailService, ISettingService settingService)
        {
            _emailService = emailService;

            _settingService = settingService;
        }

        public void SendEmail(string emailMessage, List<string> adminGroupEmailList, string subject)
        {
            if(!adminGroupEmailList.Any())
            {
                return;
            }

            _emailService.smtpHost = _settingService.GetSettingValueBySettingKey("smtpHost");

            _emailService.smtpPort = int.Parse(_settingService.GetSettingValueBySettingKey("smtpPort"));

            _emailService.smtpEnableSSL = bool.Parse(_settingService.GetSettingValueBySettingKey("smtpEnableSSL"));

            _emailService.smtpDefaultCredentials = bool.Parse(_settingService.GetSettingValueBySettingKey("smtpDefaultCredentials"));

            _emailService.smtpNetworkUserName = _settingService.GetSettingValueBySettingKey("smtpNetworkUserName");

            _emailService.smtpNetworkPassword = _settingService.GetSettingValueBySettingKey("smtpNetworkPassword");

            var smtpFrom = _settingService.GetSettingValueBySettingKey("smtpFrom");

            var emailLogoUrl = _settingService.GetSettingValueBySettingKey("emailLogoUrl");

            var emailLandingPageUrl = _settingService.GetSettingValueBySettingKey("emailLandingPageUrl");

            // If this is an add operation send an email.
            _emailService.SendEmail(smtpFrom, adminGroupEmailList, null, subject, emailMessage,
                emailLandingPageUrl, emailLogoUrl, logoPixelHeight: "100");
        }
    }
}
