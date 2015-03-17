using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using StuffFinder.Core.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class Me2Service : Service<me2>, IMe2Service
    {
        private readonly IRepository<me2> _me2Repository;

        public Me2Service(IRepository<me2> me2Repository) : base(me2Repository)
        {
            _me2Repository = me2Repository;
        }

        public me2 AddOrUpdate(me2 me2)
        {
            var me2AlreadyInDb = Get(filter: i => i.thingId == me2.thingId && i.userName == me2.userName).SingleOrDefault();

            // If this was already in the database then the user is removing their me2 vote.
            if (me2AlreadyInDb != null)
            {
                Delete(me2AlreadyInDb.me2Id);
            }
            else
            {
                base.AddOrUpdate(me2);
            }

            return me2;
        }

        public int GetCount(int thingId)
        {
            var result = GetCount(filter: i => i.thingId == thingId);

            return result;
        }

    }
}
