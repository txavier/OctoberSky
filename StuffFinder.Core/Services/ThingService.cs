using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using Newtonsoft.Json;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class ThingService : Service<thing>, IThingService
    {
        private readonly IRepository<thing> _thingRepository;

        public ThingService(IRepository<thing> thingRepository)
            :base (thingRepository)
        {
            _thingRepository = thingRepository;
        }

    }
}
