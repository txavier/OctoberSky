using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IGoogleGeocodingGetter
    {
        System.Collections.Generic.IEnumerable<string> GetErrors();
        StuffFinder.Core.Objects.GoogleGeocodingResponse.RootObject GetGoogleCustomSearch(string searchQuery, string bingMapsKey, string baseAddress = null);
    }
}
