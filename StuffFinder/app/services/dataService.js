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

        return {
            getServerUrl: getServerUrl,
        };

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

        //function fillBootstrapSettings() {
        //    //return $resource('/api/bootstrapSettingsApi').get({})
        //    //    .$promise
        //    return $http.get('/api/bootstrapSettingsApi')
        //        .then(fillBootstrapSettingsComplete)
        //        .catch(fillBootstrapSettingsFailed);

        //    function fillBootstrapSettingsComplete(response) {
        //        serverUrl.resourceServerUrl = response.data.resourceServerUrl;
        //        serverUrl.authenticationServerUrl = response.data.authenticationServerUrl;

        //        return serverUrl;
        //    }

        //    function fillBootstrapSettingsFailed(error) {
        //        return $log.error('XHR Failed for getBootstrapSettings.' + error.data);
        //    }
        //}

        //function getAvengers() {
        //    return $http.get('/api/maa')
        //        .then(getAvengersComplete)
        //        .catch(getAvengersFailed);

        //    function getAvengersComplete(response) {
        //        return response.data.results;
        //    }

        //    function getAvengersFailed(error) {
        //        $log.error('XHR Failed for getAvengers.' + error.data);
        //    }
        //}
    }
})();