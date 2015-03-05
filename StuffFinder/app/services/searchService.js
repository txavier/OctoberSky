(function () {
    'use strict';

    app.factory('searchService', searchService);

    searchService.$inject = [];

    function searchService() {
        var searchCityId = null;

        var service = {
            setSearchCityId: setSearchCityId,
            getSearchCityId: getSearchCityId
        };

        return service;

        function setSearchCityId(valueForSearchCityId) {
            searchCityId = valueForSearchCityId;
        }

        function getSearchCityId() {
            return searchCityId;
        }

    }
})();