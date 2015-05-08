using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StuffFinder.Infrastructure.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;
using StuffFinder.Core.Interfaces;
namespace StuffFinder.Infrastructure.Data.Tests
{
    [TestClass()]
    public class EfQueryGetMostMe2ThingsByDate_GetMostMe2_Should
    {
        [TestMethod()]
        public void GetMostMe2_Must_Include_Images()
        {
            // Arrange.
            var container = new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());

            var efQueryGetMostMe2ThingsByDate = container.GetInstance<IEfQueryGetMostMe2ThingsByDate>();

            // Act.
            var result = efQueryGetMostMe2ThingsByDate.GetMostMe2(new DateTime(), DateTime.Now, LazyLoadingEnabled: false,
                ProxyCreationEnabled: false);

            // Assert.
            Assert.IsTrue(result.Any());

            Assert.IsTrue(result.First().images.Any(), "The first item of this result set does not include images.");
        }
    }
}
