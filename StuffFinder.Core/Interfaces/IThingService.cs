﻿using System;

namespace StuffFinder.Core.Interfaces
{
    public interface IThingService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.thing>
    {
        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.ThingViewModel> GetSixMonthsMostMe2Things(int itemsPerPage);

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.thing> GetFoundThings();

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.ThingViewModel> ToViewModels(System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.thing> things);

        StuffFinder.Core.Models.thing AddOrUpdate(StuffFinder.Core.Models.thing thing, string loggedInUsername);

        StuffFinder.Core.Models.ThingViewModel ToViewModel(StuffFinder.Core.Models.thing thing);

        System.Collections.Generic.IEnumerable<Models.thing> Search(Objects.SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true);

        int SearchCount(Objects.SearchCriteria searchCriteria);

        string CreateNewThingEmailMessage(StuffFinder.Core.Models.thing thing, StuffFinder.Core.Models.category category = null);

        void SendNewItemEmailNotification(StuffFinder.Core.Models.thing thing, StuffFinder.Core.Models.category category = null);

        StuffFinder.Core.Models.thing Delete(int thingId);

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.ThingViewModel> SearchViewModels(StuffFinder.Core.Objects.SearchCriteria searchCriteria, bool lazyLoadingEnabled = true, bool proxyCreationEnabled = true);

        bool IsWriteAccessAllowed(StuffFinder.Core.Models.thing thing, string username);

        bool IsWriteAccessAllowed(int thingId, string username);

        System.Collections.Generic.IEnumerable<StuffFinder.Core.Models.ThingViewModel> SearchThingsInGoogle(string searchText);
        
        System.Collections.Generic.IEnumerable<string> GetErrors();

        void AddImageToThingByImageUrl(int thingId, string imageUrl);
    }
}
