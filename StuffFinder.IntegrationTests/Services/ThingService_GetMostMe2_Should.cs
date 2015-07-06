using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StuffFinder.Core.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;
using StuffFinder.Core.Interfaces;
namespace StuffFinder.Core.Services.Tests
{
    [TestClass()]
    public class ThingService_GetMostMe2_Should
    {
        [TestMethod()]
        public void GetMostMe2()
        {
            // Arrange.
            var container = new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());

            var thingService = container.GetInstance<IThingService>();

            // Act.
            var result = thingService.GetSixMonthsMostMe2Things(2);

            // Assert.
            Assert.AreEqual(2, result.Count());
        }
    }
}
