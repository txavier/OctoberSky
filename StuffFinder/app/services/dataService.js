(function () {
    'use strict';

    app.factory('dataService', dataService);

    dataService.$inject = ['$http', '$log', '$resource', '$q'];

    function dataService($http, $log, $resource, $q) {

        var deferred = $q.defer();

        var serverUrl = {
            resourceServerUrl: '',
            authenticationServerUrl: ''
        };

        var service =  {
            getServerUrl: getServerUrl,
            saveThing: saveThing,
            getThings: getThings,
        };

        return service;

        function getServerUrl() {
            $http.get('/api/bootstrapSettingsApi')
                .success(function (response) {
                    serverUrl.authenticationServerUrl = response.authenticationServerUrl;
                    serverUrl.resourceServerUrl = response.resourceServerUrl;

                    deferred.resolve(response);
                })
            .error(function (response, status, headers, config) {
                deferred.reject("Error: request returned status " + status);
            });

            return deferred.promise;
        }

        function getThings() {
            // If the resource server url is not known then
            // call the getServerUrl method to get it.
            // We need it to get the things from the database.
            if (serverUrl.resourceServerUrl === '') {
                getServerUrl();
            }

            return $http.get(serverUrl.resourceServerUrl + 'api/thingsApi')
                .then(getThingsComplete)
                .catch(getThingsFailed);

            function getThingsComplete(response) {
                return response.data.results;
            }

            function getThingsFailed(error) {
                $log.error('XHR Failed for getThings.' + error.data);
            }
        }

        function saveThing(thing) {
            // If the resource server url is not known then
            // call the getServerUrl method to get it.
            // We need it to get the things from the database.
            if (serverUrl.resourceServerUrl === '') {
                getServerUrl();
            }

            return $http.post(serverUrl.resourceServerUrl + 'api/thingsApi', thing)
                .then(saveThingComplete)
                .catch(saveThingFailed);

            function saveThingComplete(response) {
                return response.data.results;
            }

            function saveThingFailed(error) {
                $log.error('XHR Failed for saveThing.' + error.data);
            }
        }
    }
})();