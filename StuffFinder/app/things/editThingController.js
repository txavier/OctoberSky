(function () {
    'use strict';

    app.controller('editThingController', editThingController);

    editThingController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService'];

    function editThingController($scope, $location, $log, $timeout, $routeParams, authService, dataService) {

        var vm = this;

        vm.authentication = {};
        vm.authentication.userName = authService.authentication.userName;
        vm.thing = {};
        vm.thing.categoryId = null;
        vm.categories = [];
        vm.addOrUpdate = addOrUpdate;

        activate();

        function activate() {
            playJumbotronVideo();
            getCategories();
            getThing();
            initiateDroplet();

            return vm;
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
            return dataService.getCategories().then(function (data) {
                vm.categories = data;

                return vm.categories;
            });
        }

        function getThing() {
            return dataService.getThing($routeParams.thingId).then(function (data) {
                vm.thing = data;

                return vm.thing;
            });
        }

        function addOrUpdate() {
            dataService.addOrUpdateThing(vm.thing)
                .then(function (data) {
                    vm.interface.setPostData({ id: data.thingId });

                    vm.interface.uploadFiles();

                    history.back();

                    scope.$apply();
                })
                .catch(handleFailure);
        }

        function handleFailure(error) {
            $log.error('Failure notice.' + error.data.message + ': ' + error.data.messageDetail);
        }

    }
})();