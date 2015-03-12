using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IMe2Service : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.me2>
    {
        StuffFinder.Core.Models.me2 AddOrUpdate(StuffFinder.Core.Models.me2 me2);

        int GetCount(int thingId);
    }
}
