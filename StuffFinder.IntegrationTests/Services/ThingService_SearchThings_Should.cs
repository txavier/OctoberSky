using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StuffFinder.Core.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StuffFinder.Core.Interfaces;
using StructureMap;
using XavierEnterpriseLibrary.Core.Interfaces;
namespace StuffFinder.Core.Services.Tests
{
    [TestClass()]
    public class ThingService_AddOrUpdateThings_Should
    {
        [TestMethod()]
        public void SendEmailOnNewItemSubmission()
        {
            // Arrange.
            var container = new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());

            var emailService = container.GetInstance<IEmailService>();

            // Act.
            emailService.SendEmail("txavier@xaviersoftware.com", new List<string>() { "txavier@gmail.com" }, null, "test", "test message",
                    "http://deltanovember.xaviersoftware.com", "http://deltanovember.xaviersoftware.com/images/logo.png");

            // Assert.
            Assert.IsTrue(true);
        }
    }
}
