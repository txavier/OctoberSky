﻿using StructureMap.Configuration.DSL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StructureMap.Graph;
using StructureMap.Web;
using System.Data.Entity;
using AutoClutch.Auto.Service.Services;
using AutoClutch.Auto.Service.Interfaces;
using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Repo.Objects;
using StuffFinder.Core.Services;

namespace StuffFinder.CompositionRoot
{
    public class DefaultRegistry : Registry
    {
        public DefaultRegistry()
        {
            Scan(
                scan =>
                {
                    scan.TheCallingAssembly();
                    scan.WithDefaultConventions();
                });

            For<DbContext>().HybridHttpOrThreadLocalScoped().Use<StuffFinder.Data.stuffFinderDbContext>();

            For(typeof(IService<>)).Use(typeof(Service<>));

            For(typeof(IRepository<>)).Use(typeof(Repository<>));

            For<IThingService>().Use<ThingService>();

        }
    }
}
