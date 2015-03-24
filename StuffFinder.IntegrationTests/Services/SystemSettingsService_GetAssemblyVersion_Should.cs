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
    public class SystemSettingsService_GetAssemblyVersion_Should
    {
        [TestMethod()]
        public void GetAssemblyVersion()
        {
            // Arrange.
            var container = new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());

            var SystemSettingsService = container.GetInstance<ISystemSettingsService>();

            // Act.
            var result = SystemSettingsService.GetAssemblyVersion();

            // Assert.
            Assert.IsNotNull(result);
        }
    }
}
