using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class FindingService : Service<finding>, IFindingService
    {
        private readonly IRepository<finding> _findingRepository;

        public FindingService(IRepository<finding> findingRepository)
            : base(findingRepository)
        {
            _findingRepository = findingRepository;
        }

        public finding AddOrUpdate(finding finding)
        {
            finding.locationId = finding.location != null ? finding.location.locationId : finding.locationId;
            finding.location = null;
            finding.images = null;
            finding.thingId = finding.thing != null ? finding.thing.thingId : finding.thingId;
            finding.thing = null;
            finding.votes = null;

            base.AddOrUpdate(finding);

            return finding;
        }
    }
}
