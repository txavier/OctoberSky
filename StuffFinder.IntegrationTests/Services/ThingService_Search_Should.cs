using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StuffFinder.Core.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Objects;
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

            var searchCriteria = new Objects.SearchCriteria() 
            { 
                itemsPerPage = 100, 
                currentPage = 1,
                includeProperties = "findings",
                searchParams = new List<SearchParam>() { new SearchParam() { key = "cityName", value = "all" } }
            };

            // Act.
            var results = thingService.SearchViewModels(searchCriteria);

            // Assert.
            Assert.IsTrue(results.Any());

            Assert.IsTrue(results.Where(i => i.findings.Any()).Any());
        }
    }
}
