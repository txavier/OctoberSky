﻿using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IFindingService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.finding>
    {
        StuffFinder.Core.Models.finding AddOrUpdate(StuffFinder.Core.Models.finding finding);

        bool IsWriteAccessAllowed(int id, string p);

        bool IsWriteAccessAllowed(Models.finding finding, string p);

        void NotifyOnNewFinding(StuffFinder.Core.Models.finding finding);
    }
}
