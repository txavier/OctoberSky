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
            getCategories: getCategories,
            getSetting: getSetting,
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
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + 'api/thingsApi')
                            .then(getThingsComplete)
                            .catch(getThingsFailed);

                function getThingsComplete(response) {
                    return response.data.results;
                }

                function getThingsFailed(error) {
                    $log.error('XHR Failed for getThings.' + error.data);
                }
            });
        }

        function saveThing(thing) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + 'api/thingsApi', thing)
                    .then(saveThingComplete)
                    .catch(saveThingFailed);

                function saveThingComplete(response) {
                    return response.data.results;
                }

                function saveThingFailed(error) {
                    $log.error('XHR Failed for saveThing.' + error.data);
                }
            });
        }

        function getCategories() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + 'api/categoriesApi')
                    .then(getCategoriesComplete)
                    .catch(getCategoriesFailed);

                function getCategoriesComplete(response) {
                    return response.data;
                }

                function getCategoriesFailed(error) {
                    $log.error('XHR Failed for getCategories.' + error.data);
                }
            });
        }

        function getSetting(settingKey) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + 'api/settingsApi/', settingKey)
                            .then(getSettingComplete)
                            .catch(getSettingFailed);

                function getSettingComplete(response) {
                    return response.data;
                }

                function getSettingFailed(error) {
                    $log.error('XHR Failed for getSetting.' + error.data);
                }
            });
        }

        function addOrUpdateSetting(setting) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + 'api/settingsApi', setting)
                            .then(addOrUpdateSettingComplete)
                            .catch(addOrUpdateSettingFailed);

                function addOrUpdateSettingComplete(response) {
                    return response.data;
                }

                function addOrUpdateSettingFailed(error) {
                    $log.error('XHR Failed for addOrUpdateSetting.' + error.data);
                }
            })
        }
    }
})();