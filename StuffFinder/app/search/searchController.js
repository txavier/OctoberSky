(function () {
    'use strict';

    app.controller('searchController', searchController);

    searchController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService',
        'me2Service', 'toaster', 'thingService'];

    function searchController($scope, $location, $log, $timeout, $routeParams, authService, dataService, me2Service, toaster,
        thingService) {

        var vm = this;
        
        vm.things = [];
        vm.query = $routeParams.query;
        vm.cityName = $routeParams.cityName;
        vm.jumbotronVideoUrlSetting = {};
        vm.dataProperty = '';
        vm.upVote = upVote;
        vm.downVote = downVote;
        vm.redBoxShadow = '0 0 1em rgb(148,62,15)';
        vm.redFont = 'rgb(148,62,15)';
        vm.greenBoxShadow = '0 0 1em rgb(57,118,40)';
        vm.greenFont = 'rgb(57,118,40)';
        vm.totalItems = 0;
        vm.totalItemsInAllCities = 0;
        vm.itemsPerPage = 10;
        vm.currentPage = 1;
        vm.pageChanged = pageChanged;
        vm.setSortOrder = setSortOrder;
        vm.orderBy = null;
        vm.searchText = null;
        vm.searchCriteria = {};
        vm.searchCriteria.searchText = null;
        vm.me2 = me2;
        vm.loggedInUser = {};
        vm.googleThings = [];
        vm.foundGoogleThing = foundGoogleThing;

        activate();

        function activate() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.query, vm.cityName);
            searchThings(vm.searchCriteria);
            searchThingsCount(vm.searchCriteria);
            searchAllThingsCount(vm.searchCriteria);
            //getJumbotronVideoUrlSetting();
            playJumbotronVideo();
            
            if (authService.authentication.userName) {
                getLoggedInUser();
            }

            return vm;
        }

        function getLoggedInUser() {
            return dataService.getLoggedInUser().then(function (data) {
                vm.loggedInUser = data;

                return vm.loggedInUser;
            });
        }

        function me2(thingId) {
            getLoggedInUser().then(function (data) {
                toaster.pop('success', 'Done', 'You want it? You got it.  An email will be sent to you when this item is found in your city!');

                return me2Service.me2(thingId).then(function (data) {
                    searchThings(vm.searchCriteria);
                });
            });
        }

        // This overloaded message handles me2's for things that dont yet exist.  This method will persist all the objects
        // to the database.
        function me2(thing) {
            getLoggedInUser().then(function (data) {
                toaster.pop('success', 'Done', 'You want it? You got it.  An email will be sent to you when this item is found in your city!');

                return me2Service.me2(thing).then(function (data) {
                    searchThings(vm.searchCriteria);
                });
            });
        }

        function foundGoogleThing(thing) {
            thingService.setThing(thing);

            $location.path('/where-is-it');
        }

        function foundThingAndLocationGoogleThing(thing) {
            thingService.setThing(thing);

            $location.path('/found-thing-and-location');
        }

        function searchThings(searchCriteria) {
            dataService.searchThings(searchCriteria).then(function (data) {
                vm.things = vm.things.concat(data);

                return vm.things;
            });
        }

        function searchThingsCount(searchCriteria) {
            return dataService.searchThingsCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                if (vm.totalItems < 5) {
                    searchThingsInGoogle(searchCriteria.searchText);
                }

                return vm.totalItems;
            });
        }

        function searchThingsInGoogle(searchText) {
            return dataService.searchThingsInGoogle(searchText).then(function (data) {
                vm.googleThings = data;

                return vm.googleThings;
            });
        }

        function searchAllThingsCount(searchCriteria) {
            for (var i = 0; i < searchCriteria.searchParams.length; i++) {
                if (searchCriteria.searchParams[i].key === 'cityName'
                    && searchCriteria.searchParams[i].value
                    && searchCriteria.searchParams[i].value.toLowerCase() != 'all') {
                    var allSearchCriteria =
                        createSearchCriteria(searchCriteria.currentPage, searchCriteria.itemsPerPage, searchCriteria.orderBy, searchCriteria.searchText, 'all');

                    return dataService.searchThingsCount(allSearchCriteria).then(function (data) {
                        vm.totalItemsInAllCities = data || 0;

                        return vm.totalItemsInAllCities;
                    });
                }
            }
        }
        
        function createSearchCriteria(currentPage, itemsPerPage, orderBy, searchText, cityName) {
            var searchCriteria = {};

            var searchParams = [
                {
                    key: "cityName",
                    value: cityName
                }
            ];

            searchCriteria = {
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                orderBy: orderBy,
                searchText: searchText,
                searchParams: searchParams
            }

            return searchCriteria;
        }

        function setSearchCriteria(currentPage, itemsPerPage, orderBy, searchText, cityName) {
            vm.searchCriteria = createSearchCriteria(currentPage, itemsPerPage, orderBy, searchText, cityName);

            return vm.searchCriteria;
        }

        function playJumbotronVideo() {
            $(document).ready(function () {

                $(".player").mb_YTPlayer();

            });
        }

        function getJumbotronVideoUrlSetting() {
            return dataService.getJumbotronVideoUrlSetting().then(function (data) {
                vm.jumbotronVideoUrlSetting = data;
                vm.dataProperty = '{ videoURL: \'' + vm.jumbotronVideoUrlSetting.settingValue + '\', containment: \'.video-section\', quality: \'large\', autoPlay: true, mute: true, opacity: 1 }';

                playJumbotronVideo();

                return vm.jumbotronVideoUrlSetting;
            });
        }

        function pageChanged() {
            vm.currentPage++;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchCriteria.searchText, vm.cityName);

            searchThings(vm.searchCriteria);
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchThings(vm.searchCriteria);
        }

        function upVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.upVote(vote).then(function (data) {
                searchThings();
            });
        }

        function downVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.downVote(vote).then(function (data) {
                searchThings();
            });
        }
    }

})();