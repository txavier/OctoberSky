using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
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
        
        public StuffFinderEmailService(
            IEmailService emailService
            , ISettingService settingService)
        {
            _emailService = emailService;

            _settingService = settingService;
        }

        public void SendEmail(string emailMessage, IEnumerable<string> groupEmailList, string subject)
        {
            if(!groupEmailList.Any())
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
            _emailService.SendEmail(smtpFrom, groupEmailList, null, subject, emailMessage,
                emailLandingPageUrl, emailLogoUrl, logoPixelHeight: "100");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="finding">The finding that we are sending this notification for.</param>
        /// <param name="location">The location that belongs to this finding.</param>
        /// <param name="thing">The thing that belongs to this finding.</param>
        public void SendItemFindingNotification(finding finding, location location, thing thing, IEnumerable<string> emailAddresses)
        {
            finding.location = location;

            finding.thing = thing;

            if (finding.locationId == 0)
            {
                throw new ArgumentException("Unable to continue, the location cannot be found for this find.");
            }

            if (finding.thingId == 0)
            {
                throw new ArgumentException("Unable to continue, the item related to this find could not be found.");
            }

            var emailMessage = CreateItemFindingNotificationEmailMessage(finding, location, thing);

            var subject = "Congratulations, your item has been found in " + finding.location.city.name;

            SendEmail(emailMessage, emailAddresses, subject);
        }

        public string CreateItemFindingNotificationEmailMessage(finding finding, location location, thing thing)
        {
            finding.location = location;

            finding.thing = thing;

            var emailLandingPageUrl = _settingService.GetSettingValueBySettingKey("emailLandingPageUrl");

            StringBuilder sb = new StringBuilder();

            sb.AppendLine("Congratulations, what you were looking for has just been found! You can thank " + finding.userName + " for that.");

            sb.AppendLine("Check out where this was found here <a href='" + emailLandingPageUrl + "/#/thing/" + finding.thing.thingId + "'>" + finding.thing.name + "</a>.");

            sb.AppendLine("Location: " + finding.location != null ? (finding.location.formattedAddress != null ? finding.location.formattedAddress : finding.location.latitude + ", " + finding.location.longitude) : null);

            if (string.IsNullOrEmpty(finding.price))
            {
                sb.AppendLine("Price: " + finding.price);
            }

            sb.AppendLine("Find date: " + finding.date);

            return sb.ToString();
        }

        public void SendNewItemEmailNotification(finding finding, location location, thing thing, IEnumerable<string> emailAddresses)
        {
            var emailMessage = CreateNewFindingEmailMessage(finding, location, thing);

            var subject = "New Finding Added To myFindr!";

            SendEmail(emailMessage, emailAddresses, subject);
        }

        public string CreateNewFindingEmailMessage(finding finding, location location, thing thing)
        {
            finding.location = location;

            finding.thing = thing;

            var emailLandingPageUrl = _settingService.GetSettingValueBySettingKey("emailLandingPageUrl");

            StringBuilder sb = new StringBuilder();

            sb.AppendLine("User Name: " + finding.userName);

            sb.AppendLine("Created Item: <a href='" + emailLandingPageUrl + "/#/thing/" + finding.thing.thingId + "'>" + finding.thing.name + "</a>");

            sb.AppendLine("Location: " + finding.location != null ? (finding.location.formattedAddress != null ? finding.location.formattedAddress : finding.location.latitude + ", " + finding.location.longitude) : null);

            sb.AppendLine("Price: " + finding.price);

            sb.AppendLine("Find date: " + finding.date);

            return sb.ToString();
        }
    }
}
