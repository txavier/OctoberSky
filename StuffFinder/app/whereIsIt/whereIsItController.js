(function () {
    'use strict';

    app.controller('whereIsItController', whereIsItController);

    whereIsItController.$inject = ['$scope', '$location', '$log', '$timeout', 'authService', 'dataService'];

    function whereIsItController($scope, $location, $log, $timeout, authService, dataService) {

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
            getNewThing();
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
            return dataService.getCategories().then(function(data) {
                vm.categories = data;
                return vm.categories;
            });
        }

        function getNewThing() {
            var result = {
                postedDate: new Date(),
                comments: [
                    {
                    date: new Date(),
                    originalPoster: true,
                    name: authService.authentication.userName,
                    commentText: ''
                    }],
                userName: authService.authentication.userName,
            }

            vm.thing = result;

            return result;
        }

        function addOrUpdate() {
            vm.thing.userName = authService.authentication.userName;

            vm.thing.postedDate = new Date();

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