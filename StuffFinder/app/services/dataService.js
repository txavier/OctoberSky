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

        var votesApiUrl = 'api/votesApi';

        var jumbotronVideoUrlSetting = {};

        var service = {
            getServerUrl: getServerUrl,
            addOrUpdateThing: addOrUpdateThing,
            getThings: getThings,
            getThing: getThing,
            getCategories: getCategories,
            getSetting: getSetting,
            getMostMe2Things: getMostMe2Things,
            getFoundThings: getFoundThings,
            searchThings: searchThings,
            deleteThing: deleteThing,
            getJumbotronVideoUrlSetting: getJumbotronVideoUrlSetting,
            upVote: upVote,
            downVote: downVote,
        };

        return service;

        function upVote(vote) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + votesApiUrl + '/upVote', vote)
                            .then(upVoteComplete)
                            .catch(upvoteFailed);

                function upVoteComplete(response) {
                    return response.data;
                }

                function upvoteFailed(error) {
                    $log.error('XHR Failed for upVote.' + error.data);
                }
            });
        }

        function downVote(vote) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + votesApiUrl + '/downVote', vote)
                            .then(downVoteComplete)
                            .catch(downvoteFailed);

                function downVoteComplete(response) {
                    return response.data;
                }

                function downvoteFailed(error) {
                    $log.error('XHR Failed for downVote.' + error.data);
                }
            });
        }

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

        function getJumbotronVideoUrlSetting() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;
                return $http.get(serverUrl.resourceServerUrl + 'api/settingsApi' + '/getJumbotronVideoUrlSetting')
                            .then(getJumbotronVideoUrlSettingComplete)
                            .catch(getJumbotronVideoUrlSettingFailed);

                function getJumbotronVideoUrlSettingComplete(response) {
                    jumbotronVideoUrlSetting = response.data;

                    return response.data;
                }

                function getJumbotronVideoUrlSettingFailed(error) {
                    $log.error('XHR Failed for getJumbotronVideoUrlSetting.' + error.data);
                }
            });
        }

        function searchThings(query) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;
                query = query || '';

                return $http.get(serverUrl.resourceServerUrl + 'api/thingsApi' + '/searchThings/' + query)
                            .then(searchThingsComplete)
                            .catch(searchThingsFailed);

                function searchThingsComplete(response) {
                    return response.data;
                }

                function searchThingsFailed(error) {
                    $log.error('XHR Failed for searchThings.' + error.data);
                }
            });
        }

        function getThings() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + 'api/thingsApi')
                            .then(getThingsComplete)
                            .catch(getThingsFailed);

                function getThingsComplete(response) {
                    return response.data;
                }

                function getThingsFailed(error) {
                    $log.error('XHR Failed for getThings.' + error.data);
                }
            });
        }

        function getThing(thingId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + 'api/thingsApi' + '/' + thingId)
                            .then(getThingComplete)
                            .catch(getThingFailed);

                function getThingComplete(response) {
                    return response.data;
                }

                function getThingFailed(error) {
                    $log.error('XHR Failed for getThing.' + error.data);
                }
            });
        }

        function getFoundThings() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;
                return $http.get(serverUrl.resourceServerUrl + 'api/thingsApi' + '/getFoundThings')
                            .then(getFoundThingsComplete)
                            .catch(getFoundThingsFailed);

                function getFoundThingsComplete(response) {
                    return response.data;
                }

                function getFoundThingsFailed(error) {
                    $log.error('XHR Failed for getFoundThings.' + error.data);
                }
            });
        }

        function getMostMe2Things() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;
                return $http.get(serverUrl.resourceServerUrl + 'api/thingsApi' + '/getMostMe2Things')
                            .then(getMostMe2ThingsComplete)
                            .catch(getMostMe2ThingsFailed);

                function getMostMe2ThingsComplete(response) {
                    return response.data;
                }

                function getMostMe2ThingsFailed(error) {
                    $log.error('XHR Failed for getMostMe2Things.' + error.data);
                }
            });
        }

        function addOrUpdateThing(thing) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + 'api/thingsApi', thing)
                    .then(saveThingComplete)
                    .catch(saveThingFailed);

                function saveThingComplete(response) {
                    return response.data;
                }

                function saveThingFailed(error) {
                    $log.error('XHR Failed for saveThing.' + error.data);
                }
            });
        }

        function deleteThing(thingId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + 'api/thingsApi' + '/' + thingId)
                    .then(deleteThingComplete)
                    .catch(deleteThingFailed);

                function deleteThingComplete(response) {
                    return response.data;
                }

                function deleteThingFailed(error) {
                    $log.error('XHR Failed for deleteThing.' + error.data);
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
            });
        }
    }
})();