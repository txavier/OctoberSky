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
    public class CategoryService_Search_Should
    {
        [TestMethod()]
        public void SearchSkipAndTake()
        {
            // Arrange.
            var container = new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());

            var categoryService = container.GetInstance<ICategoryService>();

            var searchCriteria = new Objects.SearchCriteria{ itemsPerPage = 2, currentPage = 1};

            // Act.
            var result = categoryService.Search(searchCriteria);

            // Assert.
            Assert.AreEqual(2, result.Count());
        }
    }
}
