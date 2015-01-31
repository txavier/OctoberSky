using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StuffFinder.Core.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Rhino.Mocks;
using StructureMap.AutoMocking;

namespace StuffFinder.Core.Services.Tests
{
    [TestClass()]
    public class ThingService_SeedThingsTable_Should
    {
        [TestMethod()]
        public void SeedThingsTable()
        {
            // Arrange.
            var autoMocker = new RhinoAutoMocker<ThingService>(MockMode.AAA);

            var thingService = autoMocker.ClassUnderTest;

            // Act.
            var result = thingService.SeedThingsTable();

            // Assert.
            Assert.IsTrue(result.Any());
        }
    }
}
