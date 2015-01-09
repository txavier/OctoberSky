'use strict';
app.factory('thingsService', ['$http', function ($http) {

    var serviceBase = 'https://localhost:44302/';
    var thingsServiceFactory = {};

    var _getThings = function () {

        return { id: 1 };

        //return $http.get(serviceBase + 'api/things').then(function (results) {
        //    return results;
        //});
    };

    thingsServiceFactory.getThings = _getThings;

    return thingsServiceFactory;

}]);