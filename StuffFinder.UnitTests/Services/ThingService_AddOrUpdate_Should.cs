using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StuffFinder.Core.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap.AutoMocking;
using StuffFinder.Core.Models;
using XavierEnterpriseLibrary.Core.Interfaces;
using Rhino.Mocks;
using AutoClutch.Auto.Service.Interfaces;

namespace StuffFinder.Core.Services.Tests
{
    [TestClass()]
    public class ThingService_AddOrUpdate_Should
    {
        [TestMethod()]
        public void SendEmailOnNewItemSubmission()
        {
            // Arrange.
            var autoMocker = new RhinoAutoMocker<ThingService>(MockMode.AAA);

            var thingService = autoMocker.ClassUnderTest;

            var thing = new thing() { thingId = 0 };

            autoMocker.Get<IService<thing>>().Stub(x => x.AddOrUpdate(Arg<thing>.Is.Anything, Arg<bool>.Is.Anything)).Return(thing);

            // Act.
            thingService.AddOrUpdate(thing);

            // Assert.
            autoMocker.Get<IEmailService>()
                .AssertWasCalled(x => x.SendEmail(
                    Arg<string>.Is.Anything
                    , Arg<List<string>>.Is.Anything
                    , Arg<List<string>>.Is.Anything
                    , Arg<string>.Is.Anything
                    , Arg<string>.Is.Anything
                    , Arg<string>.Is.Anything
                    , Arg<string>.Is.Anything),
                options => options.Repeat.Times(1));
        }
    }
}
