using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace myFinder.ResourceServer.DependencyResolution
{
    public static class IoC {
        public static IContainer Initialize() {
            return new Container(c => c.AddRegistry<StuffFinder.CompositionRoot.DefaultRegistry>());
        }
    }
}