using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IGoogleCustomSearchGetter
    {
        System.Collections.Generic.IEnumerable<string> GetErrors();
        StuffFinder.Core.Objects.GoogleCustomSearchResponse.RootObject GetGoogleCustomSearch(string searchQuery, string bingMapsKey, string baseAddress = null);
    }
}
