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
using StuffFinder.Core.Interfaces;
using XavierEnterpriseLibrary.Core.Interfaces;
using XavierEnterpriseLibrary.Core.Services;
using XavierEnterpriseLibrary.Infrastructure.Senders;
using StuffFinder.Core.Models;

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
                    scan.AssembliesFromApplicationBaseDirectory();
                    scan.WithDefaultConventions();
                });

            For<DbContext>().HybridHttpOrThreadLocalScoped().Use<StuffFinder.Data.stuffFinderAuthDbContext>().Named("stuffFinderAuth");

            For<DbContext>().HybridHttpOrThreadLocalScoped().Use<StuffFinder.Data.stuffFinderDbContext>();

            For(typeof(IService<>)).Use(typeof(Service<>));

            For(typeof(IRepository<>)).Use(typeof(Repository<>));

            For(typeof(IRepository<StuffFinder.Core.Models.AspNetUser>)).Use(typeof(Repository<AspNetUser>)).Ctor<DbContext>("context").IsNamedInstance("stuffFinderAuth");

            For<IEmailSender>().Use<EmailSender>();
        }
    }
}
