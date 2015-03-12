using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IFindingService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.finding>
    {
        StuffFinder.Core.Models.finding AddOrUpdate(StuffFinder.Core.Models.finding finding);
    }
}
