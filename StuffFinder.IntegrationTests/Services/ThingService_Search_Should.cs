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
    public class ThingService_Search_Should
    {
        [TestMethod()]
        public void IncludeGivenProperties()
        {
            // Arrange.
            var container = new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());

            var thingService = container.GetInstance<IThingService>();

            // Act.
            var results = thingService.Search(new Objects.SearchCriteria() { itemsPerPage = 100, currentPage = 1 });

            // Assert.
            Assert.IsTrue(results.Any());

            Assert.IsTrue(results.First().category != null);
        }
    }
}
