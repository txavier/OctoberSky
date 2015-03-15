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
        var categoriesApiUrl = 'api/categoriesApi';
        var citiesApiUrl = 'api/citiesApi';
        var nationalitiesApiUrl = 'api/nationalitiesApi';
        var newslettersApiUrl = 'api/newslettersApi';
        var usersApiUrl = 'api/usersApi';
        var locationsApiUrl = 'api/locationsApi';
        var thingsApiUrl = 'api/thingsApi';
        var me2ApiUrl = 'api/me2Api';
        var cityNotificationsApiUrl = 'api/cityNotificationsApi';
        var nationalityNotificationsApiUrl = 'api/nationalityNotificationsApi';
        var feedbackApiUrl = 'api/feedbackApi';

        var jumbotronVideoUrlSetting = {};

        var service = {
            getServerUrl: getServerUrl,
            addOrUpdateThing: addOrUpdateThing,
            getThings: getThings,
            getThing: getThing,
            getSetting: getSetting,
            getMostMe2Things: getMostMe2Things,
            getFoundThings: getFoundThings,
            searchThings: searchThings,
            searchThingsCount: searchThingsCount,
            deleteThing: deleteThing,
            getJumbotronVideoUrlSetting: getJumbotronVideoUrlSetting,
            upVote: upVote,
            downVote: downVote,
            getFinding: getFinding,
            addOrUpdateFinding: addOrUpdateFinding,
            deleteFinding: deleteFinding,
            getLocations: getLocations,
            getLocation: getLocation,
            searchLocations: searchLocations,
            searchLocationsCount: searchLocationsCount,
            addOrUpdateLocation: addOrUpdateLocation,
            deleteLocation: deleteLocation,
            getCategory: getCategory,
            getCategories: getCategories,
            searchCategories: searchCategories,
            searchCategoriesCount: searchCategoriesCount,
            addOrUpdateCategory: addOrUpdateCategory,
            deleteCategory: deleteCategory,
            getCity: getCity,
            getCities: getCities,
            searchCities: searchCities,
            searchCitiesCount: searchCitiesCount,
            addOrUpdateCity: addOrUpdateCity,
            deleteCity: deleteCity,
            getUser: getUser,
            getUsers: getUsers,
            searchUsers: searchUsers,
            searchUsersCount: searchUsersCount,
            addOrUpdateUser: addOrUpdateUser,
            deleteUser: deleteUser,
            getNationality: getNationality,
            getNationalities: getNationalities,
            searchNationalities: searchNationalities,
            searchNationalitiesCount: searchNationalitiesCount,
            addOrUpdateNationality: addOrUpdateNationality,
            deleteNationality: deleteNationality,
            syncUsers: syncUsers,
            addOrUpdateMe2: addOrUpdateMe2,
            getNewsletter: getNewsletter,
            getNewsletters: getNewsletters,
            searchNewsletters: searchNewsletters,
            searchNewslettersCount: searchNewslettersCount,
            addOrUpdateNewsletter: addOrUpdateNewsletter,
            deleteNewsletter: deleteNewsletter,
            sendNewsletter: sendNewsletter,
            getNationalityNotification: getNationalityNotification,
            getNationalityNotifications: getNationalityNotifications,
            searchNationalityNotifications: searchNationalityNotifications,
            searchNationalityNotificationsCount: searchNationalityNotificationsCount,
            addOrUpdateNationalityNotification: addOrUpdateNationalityNotification,
            deleteNationalityNotification: deleteNationalityNotification,
            sendNationalityNotification: sendNationalityNotification,
            getCityNotification: getCityNotification,
            getCityNotifications: getCityNotifications,
            searchCityNotifications: searchCityNotifications,
            searchCityNotificationsCount: searchCityNotificationsCount,
            addOrUpdateCityNotification: addOrUpdateCityNotification,
            deleteCityNotification: deleteCityNotification,
            sendCityNotification: sendCityNotification,
            sendFeedback: sendFeedback,
            getLoggedInUser: getLoggedInUser
        };

        return service;

        function getLoggedInUser() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + usersApiUrl + '/getloggedinuser')
                            .then(getLoggedInUserComplete)
                            .catch(getLoggedInUserFailed);

                function getLoggedInUserComplete(response) {
                    return response.data;
                }

                function getLoggedInUserFailed(error) {
                    $log.error('XHR failed for getLoggedInUserFailed.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function sendFeedback(feedback) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + feedbackApiUrl + '/sendfeedback', feedback)
                            .then(sendFeedbackComplete)
                            .catch(sendFeedbackFailed);

                function sendFeedbackComplete(response) {
                    return response.data;
                }

                function sendFeedbackFailed(error) {
                    $log.error('XHR failed for sendFeedbackFailed.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getCityNotification(cityNotificationId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + cityNotificationsApiUrl + '/' + cityNotificationId)
                            .then(getCityNotificationComplete)
                            .catch(getCityNotificationFailed);

                function getCityNotificationComplete(response) {
                    return response.data;
                }

                function getCityNotificationFailed(error) {
                    $log.error('XHR failed for getCityNotification.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function sendCityNotification(cityNotification) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + cityNotificationsApiUrl + '/send', cityNotification)
                            .then(sendCityNotificationsComplete)
                            .catch(sendCityNotificationsFailed);

                function sendCityNotificationsComplete(response) {
                    return response.data;
                }

                function sendCityNotificationsFailed(error) {
                    $log.error('XHR failed for getCityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getCityNotifications() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + cityNotificationsApiUrl)
                            .then(getCityNotificationsComplete)
                            .catch(getCityNotificationsFailed);

                function getCityNotificationsComplete(response) {
                    return response.data;
                }

                function getCityNotificationsFailed(error) {
                    $log.error('XHR failed for getCityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchCityNotifications(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + cityNotificationsApiUrl + '/search', searchCriteria)
                            .then(searchCityNotificationsComplete)
                            .catch(searchCityNotificationsFailed);

                function searchCityNotificationsComplete(response) {
                    return response.data;
                }

                function searchCityNotificationsFailed(error) {
                    $log.error('XHR failed for searchCityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchCityNotificationsCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + cityNotificationsApiUrl + '/search/count', searchCriteria)
                            .then(searchCityNotificationsCountComplete)
                            .catch(searchCityNotificationsCountFailed);

                function searchCityNotificationsCountComplete(response) {
                    return response.data;
                }

                function searchCityNotificationsCountFailed(error) {
                    $log.error('XHR failed for searchCityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateCityNotification(cityNotification) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + cityNotificationsApiUrl, cityNotification)
                            .then(addOrUpdateCityNotificationComplete)
                            .catch(addOrUpdateCityNotificationFailed);

                function addOrUpdateCityNotificationComplete(response) {
                    return response.data;
                }

                function addOrUpdateCityNotificationFailed(error) {
                    $log.error('XHR failed for saveCityNotification.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteCityNotification(cityNotificationId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + cityNotificationsApiUrl + '/' + cityNotificationId)
                            .then(deleteCityNotificationComplete)
                            .catch(deleteCityNotificationFailed);

                function deleteCityNotificationComplete(response) {
                    return response.data;
                }

                function deleteCityNotificationFailed(error) {
                    $log.error('XHR failed for deleteCityNotification.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getNationalityNotification(nationalityNotificationId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + nationalityNotificationsApiUrl + '/' + nationalityNotificationId)
                            .then(getNationalityNotificationComplete)
                            .catch(getNationalityNotificationFailed);

                function getNationalityNotificationComplete(response) {
                    return response.data;
                }

                function getNationalityNotificationFailed(error) {
                    $log.error('XHR failed for getNationalityNotification.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function sendNationalityNotification(nationalityNotification) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + nationalityNotificationsApiUrl + '/send', nationalityNotification)
                            .then(sendNationalityNotificationsComplete)
                            .catch(sendNationalityNotificationsFailed);

                function sendNationalityNotificationsComplete(response) {
                    return response.data;
                }

                function sendNationalityNotificationsFailed(error) {
                    $log.error('XHR failed for getNationalityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getNationalityNotifications() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + nationalityNotificationsApiUrl)
                            .then(getNationalityNotificationsComplete)
                            .catch(getNationalityNotificationsFailed);

                function getNationalityNotificationsComplete(response) {
                    return response.data;
                }

                function getNationalityNotificationsFailed(error) {
                    $log.error('XHR failed for getNationalityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchNationalityNotifications(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + nationalityNotificationsApiUrl + '/search', searchCriteria)
                            .then(searchNationalityNotificationsComplete)
                            .catch(searchNationalityNotificationsFailed);

                function searchNationalityNotificationsComplete(response) {
                    return response.data;
                }

                function searchNationalityNotificationsFailed(error) {
                    $log.error('XHR failed for searchNationalityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchNationalityNotificationsCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + nationalityNotificationsApiUrl + '/search/count', searchCriteria)
                            .then(searchNationalityNotificationsCountComplete)
                            .catch(searchNationalityNotificationsCountFailed);

                function searchNationalityNotificationsCountComplete(response) {
                    return response.data;
                }

                function searchNationalityNotificationsCountFailed(error) {
                    $log.error('XHR failed for searchNationalityNotifications.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateNationalityNotification(nationalityNotification) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + nationalityNotificationsApiUrl, nationalityNotification)
                            .then(addOrUpdateNationalityNotificationComplete)
                            .catch(addOrUpdateNationalityNotificationFailed);

                function addOrUpdateNationalityNotificationComplete(response) {
                    return response.data;
                }

                function addOrUpdateNationalityNotificationFailed(error) {
                    $log.error('XHR failed for saveNationalityNotification.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteNationalityNotification(nationalityNotificationId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + nationalityNotificationsApiUrl + '/' + nationalityNotificationId)
                            .then(deleteNationalityNotificationComplete)
                            .catch(deleteNationalityNotificationFailed);

                function deleteNationalityNotificationComplete(response) {
                    return response.data;
                }

                function deleteNationalityNotificationFailed(error) {
                    $log.error('XHR failed for deleteNationalityNotification.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateMe2(me2) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + me2ApiUrl, me2)
                            .then(addOrUpdateMe2Complete)
                            .catch(addOrUpdateMe2Failed);

                function addOrUpdateMe2Complete(response) {
                    return response.data;
                }

                function addOrUpdateMe2Failed(error) {
                    $log.error('XHR failed for addOrUpdateMe2.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getCategory(categoryId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + categoriesApiUrl + '/' + categoryId)
                            .then(getCategoryComplete)
                            .catch(getCategoryFailed);

                function getCategoryComplete(response) {
                    return response.data;
                }

                function getCategoryFailed(error) {
                    $log.error('XHR failed for getCategory.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getCategories() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + categoriesApiUrl)
                            .then(getCategoriesComplete)
                            .catch(getCategoriesFailed);

                function getCategoriesComplete(response) {
                    return response.data;
                }

                function getCategoriesFailed(error) {
                    $log.error('XHR failed for getCategories.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchCategories(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + categoriesApiUrl + '/search', searchCriteria)
                            .then(searchCategoriesComplete)
                            .catch(searchCategoriesFailed);

                function searchCategoriesComplete(response) {
                    return response.data;
                }

                function searchCategoriesFailed(error) {
                    $log.error('XHR failed for searchCategories.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchCategoriesCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + categoriesApiUrl + '/search/count', searchCriteria)
                            .then(searchCategoriesCountComplete)
                            .catch(searchCategoriesCountFailed);

                function searchCategoriesCountComplete(response) {
                    return response.data;
                }

                function searchCategoriesCountFailed(error) {
                    $log.error('XHR failed for searchCategories.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateCategory(category) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + categoriesApiUrl, category)
                            .then(addOrUpdateCategoryComplete)
                            .catch(addOrUpdateCategoryFailed);

                function addOrUpdateCategoryComplete(response) {
                    return response.data;
                }

                function addOrUpdateCategoryFailed(error) {
                    $log.error('XHR failed for saveCategory.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteCategory(categoryId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + categoriesApiUrl + '/' + categoryId)
                            .then(deleteCategoryComplete)
                            .catch(deleteCategoryFailed);

                function deleteCategoryComplete(response) {
                    return response.data;
                }

                function deleteCategoryFailed(error) {
                    $log.error('XHR failed for deleteCategory.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getCity(cityId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + citiesApiUrl + '/' + cityId)
                            .then(getCityComplete)
                            .catch(getCityFailed);

                function getCityComplete(response) {
                    return response.data;
                }

                function getCityFailed(error) {
                    $log.error('XHR failed for getCity.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getCities() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + citiesApiUrl, { cache: true })
                            .then(getCitiesComplete)
                            .catch(getCitiesFailed);

                function getCitiesComplete(response) {
                    return response.data;
                }

                function getCitiesFailed(error) {
                    $log.error('XHR failed for getCities.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchCities(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + citiesApiUrl + '/search', searchCriteria)
                            .then(searchCitiesComplete)
                            .catch(searchCitiesFailed);

                function searchCitiesComplete(response) {
                    return response.data;
                }

                function searchCitiesFailed(error) {
                    $log.error('XHR failed for searchCities.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchCitiesCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + citiesApiUrl + '/search/count', searchCriteria)
                            .then(searchCitiesCountComplete)
                            .catch(searchCitiesCountFailed);

                function searchCitiesCountComplete(response) {
                    return response.data;
                }

                function searchCitiesCountFailed(error) {
                    $log.error('XHR failed for searchCities.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateCity(city) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + citiesApiUrl, city)
                            .then(addOrUpdateCityComplete)
                            .catch(addOrUpdateCityFailed);

                function addOrUpdateCityComplete(response) {
                    return response.data;
                }

                function addOrUpdateCityFailed(error) {
                    $log.error('XHR failed for saveCity.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteCity(cityId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + citiesApiUrl + '/' + cityId)
                            .then(deleteCityComplete)
                            .catch(deleteCityFailed);

                function deleteCityComplete(response) {
                    return response.data;
                }

                function deleteCityFailed(error) {
                    $log.error('XHR failed for deleteCity.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getUser(userId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + usersApiUrl + '/' + userId)
                            .then(getUserComplete)
                            .catch(getUserFailed);

                function getUserComplete(response) {
                    return response.data;
                }

                function getUserFailed(error) {
                    $log.error('XHR failed for getUser.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getUsers() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + usersApiUrl)
                            .then(getUsersComplete)
                            .catch(getUsersFailed);

                function getUsersComplete(response) {
                    return response.data;
                }

                function getUsersFailed(error) {
                    $log.error('XHR failed for getUsers.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchUsers(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + usersApiUrl + '/search', searchCriteria)
                            .then(searchUsersComplete)
                            .catch(searchUsersFailed);

                function searchUsersComplete(response) {
                    return response.data;
                }

                function searchUsersFailed(error) {
                    $log.error('XHR failed for searchUsers.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchUsersCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + usersApiUrl + '/search/count', searchCriteria)
                            .then(searchUsersCountComplete)
                            .catch(searchUsersCountFailed);

                function searchUsersCountComplete(response) {
                    return response.data;
                }

                function searchUsersCountFailed(error) {
                    $log.error('XHR failed for searchUsers.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateUser(user) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + usersApiUrl, user)
                            .then(addOrUpdateUserComplete)
                            .catch(addOrUpdateUserFailed);

                function addOrUpdateUserComplete(response) {
                    return response.data;
                }

                function addOrUpdateUserFailed(error) {
                    $log.error('XHR failed for saveUser.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteUser(userId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + usersApiUrl + '/' + userId)
                            .then(deleteUserComplete)
                            .catch(deleteUserFailed);

                function deleteUserComplete(response) {
                    return response.data;
                }

                function deleteUserFailed(error) {
                    $log.error('XHR failed for deleteUser.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function syncUsers() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + usersApiUrl + '/syncUsers')
                            .then(syncUsersComplete)
                            .catch(syncUsersFailed);

                function syncUsersComplete(response) {
                    return response.data;
                }

                function syncUsersFailed(error) {
                    $log.error('XHR failed for deleteUser.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getNationality(nationalityId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + nationalitiesApiUrl + '/' + nationalityId)
                            .then(getNationalityComplete)
                            .catch(getNationalityFailed);

                function getNationalityComplete(response) {
                    return response.data;
                }

                function getNationalityFailed(error) {
                    $log.error('XHR failed for getNationality.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getNationalities() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + nationalitiesApiUrl)
                            .then(getNationalitiesComplete)
                            .catch(getNationalitiesFailed);

                function getNationalitiesComplete(response) {
                    return response.data;
                }

                function getNationalitiesFailed(error) {
                    $log.error('XHR failed for getNationalities.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchNationalities(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + nationalitiesApiUrl + '/search', searchCriteria)
                            .then(searchNationalitiesComplete)
                            .catch(searchNationalitiesFailed);

                function searchNationalitiesComplete(response) {
                    return response.data;
                }

                function searchNationalitiesFailed(error) {
                    $log.error('XHR failed for searchNationalities.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchNationalitiesCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + nationalitiesApiUrl + '/search/count', searchCriteria)
                            .then(searchNationalitiesCountComplete)
                            .catch(searchNationalitiesCountFailed);

                function searchNationalitiesCountComplete(response) {
                    return response.data;
                }

                function searchNationalitiesCountFailed(error) {
                    $log.error('XHR failed for searchNationalities.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateNationality(nationality) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + nationalitiesApiUrl, nationality)
                            .then(addOrUpdateNationalityComplete)
                            .catch(addOrUpdateNationalityFailed);

                function addOrUpdateNationalityComplete(response) {
                    return response.data;
                }

                function addOrUpdateNationalityFailed(error) {
                    $log.error('XHR failed for saveNationality.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteNationality(nationalityId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + nationalitiesApiUrl + '/' + nationalityId)
                            .then(deleteNationalityComplete)
                            .catch(deleteNationalityFailed);

                function deleteNationalityComplete(response) {
                    return response.data;
                }

                function deleteNationalityFailed(error) {
                    $log.error('XHR failed for deleteNationality.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getNewsletter(newsletterId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + newslettersApiUrl + '/' + newsletterId)
                            .then(getNewsletterComplete)
                            .catch(getNewsletterFailed);

                function getNewsletterComplete(response) {
                    return response.data;
                }

                function getNewsletterFailed(error) {
                    $log.error('XHR failed for getNewsletter.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function sendNewsletter(newsletter) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + newslettersApiUrl + '/send', newsletter)
                            .then(sendNewslettersComplete)
                            .catch(sendNewslettersFailed);

                function sendNewslettersComplete(response) {
                    return response.data;
                }

                function sendNewslettersFailed(error) {
                    $log.error('XHR failed for getNewsletters.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getNewsletters() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + newslettersApiUrl)
                            .then(getNewslettersComplete)
                            .catch(getNewslettersFailed);

                function getNewslettersComplete(response) {
                    return response.data;
                }

                function getNewslettersFailed(error) {
                    $log.error('XHR failed for getNewsletters.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchNewsletters(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + newslettersApiUrl + '/search', searchCriteria)
                            .then(searchNewslettersComplete)
                            .catch(searchNewslettersFailed);

                function searchNewslettersComplete(response) {
                    return response.data;
                }

                function searchNewslettersFailed(error) {
                    $log.error('XHR failed for searchNewsletters.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchNewslettersCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + newslettersApiUrl + '/search/count', searchCriteria)
                            .then(searchNewslettersCountComplete)
                            .catch(searchNewslettersCountFailed);

                function searchNewslettersCountComplete(response) {
                    return response.data;
                }

                function searchNewslettersCountFailed(error) {
                    $log.error('XHR failed for searchNewsletters.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateNewsletter(newsletter) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + newslettersApiUrl, newsletter)
                            .then(addOrUpdateNewsletterComplete)
                            .catch(addOrUpdateNewsletterFailed);

                function addOrUpdateNewsletterComplete(response) {
                    return response.data;
                }

                function addOrUpdateNewsletterFailed(error) {
                    $log.error('XHR failed for saveNewsletter.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteNewsletter(newsletterId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + newslettersApiUrl + '/' + newsletterId)
                            .then(deleteNewsletterComplete)
                            .catch(deleteNewsletterFailed);

                function deleteNewsletterComplete(response) {
                    return response.data;
                }

                function deleteNewsletterFailed(error) {
                    $log.error('XHR failed for deleteNewsletter.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

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
                    $log.error('XHR Failed for upVote.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
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
                    $log.error('XHR Failed for downVote.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getServerUrl() {
            $http.get('/api/bootstrapSettingsApi', { cache: true })
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
                    $log.error('XHR Failed for getJumbotronVideoUrlSetting.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchThings(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + thingsApiUrl + '/search', searchCriteria)
                            .then(searchThingsComplete)
                            .catch(searchThingsFailed);

                function searchThingsComplete(response) {
                    return response.data;
                }

                function searchThingsFailed(error) {
                    $log.error('XHR failed for searchThings.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchThingsCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + thingsApiUrl + '/search/count', searchCriteria)
                            .then(searchThingsCountComplete)
                            .catch(searchThingsCountFailed);

                function searchThingsCountComplete(response) {
                    return response.data;
                }

                function searchThingsCountFailed(error) {
                    $log.error('XHR failed for searchThings.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getLocations() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + 'api/locationsApi')
                            .then(getLocationsComplete)
                            .catch(getLocationsFailed);

                function getLocationsComplete(response) {
                    return response.data;
                }

                function getLocationsFailed(error) {
                    $log.error('XHR failed for getLocations.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getLocation(locationId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + locationsApiUrl + '/' + locationId)
                            .then(getLocationComplete)
                            .catch(getLocationFailed);

                function getLocationComplete(response) {
                    return response.data;
                }

                function getLocationFailed(error) {
                    $log.error('XHR failed for getLocation.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchLocations(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + locationsApiUrl + '/search', searchCriteria)
                            .then(searchLocationsComplete)
                            .catch(searchLocationsFailed);

                function searchLocationsComplete(response) {
                    return response.data;
                }

                function searchLocationsFailed(error) {
                    $log.error('XHR failed for searchLocations.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function searchLocationsCount(searchCriteria) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + locationsApiUrl + '/search/count', searchCriteria)
                            .then(searchLocationsCountComplete)
                            .catch(searchLocationsCountFailed);

                function searchLocationsCountComplete(response) {
                    return response.data;
                }

                function searchLocationsCountFailed(error) {
                    $log.error('XHR failed for searchLocations.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateLocation(location) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + locationsApiUrl, location)
                            .then(addOrUpdateLocationComplete)
                            .catch(addOrUpdateLocationFailed);

                function addOrUpdateLocationComplete(response) {
                    return response.data;
                }

                function addOrUpdateLocationFailed(error) {
                    $log.error('XHR failed for saveLocation.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteLocation(locationId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + locationsApiUrl + '/' + locationId)
                            .then(deleteLocationComplete)
                            .catch(deleteLocationFailed);

                function deleteLocationComplete(response) {
                    return response.data;
                }

                function deleteLocationFailed(error) {
                    $log.error('XHR failed for deleteLocation.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getFinding(findingId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + 'api/findingsApi' + '/' + findingId)
                            .then(getFindingComplete)
                            .catch(getFindingFailed);

                function getFindingComplete(response) {
                    return response.data;
                }

                function getFindingFailed(error) {
                    $log.error('XHR failed for getFindings.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateFinding(finding) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + 'api/findingsApi', finding)
                    .then(saveFindingComplete)
                    .catch(saveFindingFailed);

                function saveFindingComplete(response) {
                    return response.data;
                }

                function saveFindingFailed(error) {
                    $log.error('XHR Failed for saveFinding.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteFinding(findingId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + 'api/findingsApi' + '/' + findingId)
                            .then(deleteFindingComplete)
                            .catch(deleteFindingFailed);

                function deleteFindingComplete(response) {
                    return response.data;
                }

                function deleteFindingFailed(error) {
                    $log.error('XHR failed for deleteFinding.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getThings() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + thingsApiUrl)
                            .then(getThingsComplete)
                            .catch(getThingsFailed);

                function getThingsComplete(response) {
                    return response.data;
                }

                function getThingsFailed(error) {
                    $log.error('XHR Failed for getThings.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getThing(thingId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.get(serverUrl.resourceServerUrl + thingsApiUrl + '/' + thingId)
                            .then(getThingComplete)
                            .catch(getThingFailed);

                function getThingComplete(response) {
                    return response.data;
                }

                function getThingFailed(error) {
                    $log.error('XHR Failed for getThing.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getFoundThings() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;
                return $http.get(serverUrl.resourceServerUrl + thingsApiUrl + '/getFoundThings')
                            .then(getFoundThingsComplete)
                            .catch(getFoundThingsFailed);

                function getFoundThingsComplete(response) {
                    return response.data;
                }

                function getFoundThingsFailed(error) {
                    $log.error('XHR Failed for getFoundThings.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function getMostMe2Things() {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;
                return $http.get(serverUrl.resourceServerUrl + thingsApiUrl + '/getMostMe2Things')
                            .then(getMostMe2ThingsComplete)
                            .catch(getMostMe2ThingsFailed);

                function getMostMe2ThingsComplete(response) {
                    return response.data;
                }

                function getMostMe2ThingsFailed(error) {
                    $log.error('XHR Failed for getMostMe2Things.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function addOrUpdateThing(thing) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.post(serverUrl.resourceServerUrl + thingsApiUrl, thing)
                    .then(saveThingComplete)
                    .catch(saveThingFailed);

                function saveThingComplete(response) {
                    return response.data;
                }

                function saveThingFailed(error) {
                    $log.error('XHR Failed for saveThing.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteThing(thingId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + thingsApiUrl + '/' + thingId)
                    .then(deleteThingComplete)
                    .catch(deleteThingFailed);

                function deleteThingComplete(response) {
                    return response.data;
                }

                function deleteThingFailed(error) {
                    $log.error('XHR Failed for deleteThing.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
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
                    $log.error('XHR Failed for getSetting.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
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
                    $log.error('XHR Failed for addOrUpdateSetting.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }

        function deleteImage(imageId) {
            return getServerUrl().then(function (resource) {
                serverUrl = resource;

                return $http.delete(serverUrl.resourceServerUrl + 'api/imagesApi', imageId)
                            .then(deleteImageComplete)
                            .catch(deleteImageFailed);

                function deleteImageComplete(response) {
                    return response.data;
                }

                function deleteImageFailed(error) {
                    $log.error('XHR failed for deleteImage.' + error.data.message + ': ' + (error.data.messageDetail || error.data.exceptionMessage));
                }
            });
        }
    }
})();