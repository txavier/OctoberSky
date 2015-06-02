(function () {
    'use strict';

    app.controller('whereIsItController', whereIsItController);

    whereIsItController.$inject = ['$scope', '$location', '$log', '$timeout', 'authService', 'dataService', 'thingService'];

    function whereIsItController($scope, $location, $log, $timeout, authService, dataService, thingService) {

        var vm = this;

        vm.authentication = {};
        vm.authentication.userName = authService.authentication.userName;
        vm.thing = {};
        vm.thing.thingCity = {};
        vm.thing.thingCity.thingCityId = 0;
        vm.thing.thingCity.city = {};
        vm.thing.thingCity.cityId = 0;
        vm.thing.thingCity.thingId = 0;
        vm.thing.thingCity.userId = 0;
        vm.thing.thingCities = [];
        vm.thing.categoryId = null;
        vm.categories = [];
        vm.addOrUpdate = addOrUpdate;
        vm.cities = [];

        activate();

        function activate() {
            playJumbotronVideo();
            getCategories();
            getNewThing();
            initiateDroplet();
            getCities();

            return vm;
        }

        function getCities() {
            return dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function initiateDroplet() {
            $scope.$on('$dropletReady', function whenDropletReady() {
                vm.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);

                uploadFiles();
            });
        }

        function uploadFiles() {
            return dataService.getServerUrl().then(function (resource) {
                var serverUrl = resource;

                vm.interface.setRequestUrl(serverUrl.resourceServerUrl + 'api/thingsApi' + '/files');
            });
        }

        // When the page is ready this plays the youtube video.
        function playJumbotronVideo() {
            $(document).ready(function () {
                $(".player").mb_YTPlayer();
            });
        }

        function getCategories() {
            return dataService.getCategories().then(function(data) {
                vm.categories = data;
                return vm.categories;
            });
        }

        function getNewThing() {
            if (thingService.getThing() != null) {
                vm.thing = thingService.getThing();

                thingService.clearThing();
            }

            vm.thing.postedDate = new Date();

            vm.thing.userName = authService.authentication.userName;

            return vm.thing;
        }

        function addOrUpdate() {
            vm.thing.userName = authService.authentication.userName;

            vm.thing.thingCities.push(vm.thing.thingCity);

            vm.thing.postedDate = new Date();

            dataService.addOrUpdateThing(vm.thing)
                .then(function (data) {
                    vm.thing = data;

                    vm.interface.setPostData({ id: vm.thing.thingId, userName: authService.authentication.userName });

                    vm.interface.uploadFiles();

                    $scope.$apply();

                    history.back();
                })
                .catch(handleFailure);
        }

        function handleFailure(error) {
            $log.error('Failure notice.' + error.data.message + ': ' + error.data.messageDetail);
        }

    }
})();