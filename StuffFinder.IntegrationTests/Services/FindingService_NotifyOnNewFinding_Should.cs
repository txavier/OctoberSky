using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StuffFinder.Core.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
namespace StuffFinder.Core.Services.Tests
{
    [TestClass()]
    public class FindingService_NotifyOnNewFinding_Should
    {
        [TestMethod()]
        public void Notify_me2_subscribers()
        {
            // Arrange.
            var container = new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());

            var findingService = container.GetInstance<IFindingService>();

            var findings = findingService.Get(filter: i => (i.thing.me2.Any()));

            // Act.
            foreach (var finding in findings)
            {
                findingService.NotifyOnNewFinding(finding);
            }

            // Assert.

            // This is just to ensure that the function we are testing doesnt 
            // throw an exception.
            Assert.IsTrue(true);
        }
    }
}
