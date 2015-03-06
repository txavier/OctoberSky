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
using StuffFinder.Core.Models;
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

            var thingService = container.GetInstance<IThingService>();

            var thing = thingService.Get().First();

            // Act.
            thingService.SendNewItemEmailNotification(thing);

            // Assert.
            Assert.IsTrue(true);
        }
    }
}
