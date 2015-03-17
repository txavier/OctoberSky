﻿namespace StuffFinder.Core.Interfaces
{
    public interface IUserService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.user>
    {
        StuffFinder.Core.Models.user AddOrUpdate(StuffFinder.Core.Models.user user, string loggedInUserName);

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.user> Search(StuffFinder.Core.Objects.SearchCriteria searchCriteria);

        int SearchCount(StuffFinder.Core.Objects.SearchCriteria searchCriteria);

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.user> SyncUserTable();

        System.Collections.Generic.List<string> GetAdminGroupEmailList();
    }
}