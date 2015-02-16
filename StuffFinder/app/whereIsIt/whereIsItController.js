(function () {
    'use strict';

    app.controller('whereIsItController', whereIsItController);

    whereIsItController.$inject = ['$scope', '$location', '$log', '$timeout', 'authService', 'dataService'];

    function whereIsItController($scope, $location, $log, $timeout, authService, dataService) {

        var vm = this;

        /**
         * @property interface
         * @type {Object}
         */
        vm.interface = {};

        /**
         * @property uploadCount
         * @type {Number}
         */
        vm.uploadCount = 0;

        /**
         * @property success
         * @type {Boolean}
         */
        vm.success = false;

        /**
         * @property error
         * @type {Boolean}
         */
        vm.error = false;

        vm.authentication = {};
        vm.authentication.userName = authService.authentication.userName;
        vm.thing = {};
        vm.thing.categoryId = null;
        vm.categories = [];
        vm.save = save;

        activate();

        function activate() {
            playJumbotronVideo();

            getCategories();

            getNewThing();

            return vm;
        }

        // Listen for when the interface has been configured.
        $scope.$on('$dropletReady', function whenDropletReady() {

            vm.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg', 'torrent']);
            vm.interface.setRequestUrl('upload.html');
            vm.interface.defineHTTPSuccess([/2.{2}/]);
            vm.interface.useArray(false);

        });

        // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {

            vm.uploadCount = files.length;
            vm.success = true;
            console.log(response, files);

            $timeout(function timeout() {
                vm.success = false;
            }, 5000);

        });

        // Listen for when the files have failed to upload.
        $scope.$on('$dropletError', function onDropletError(event, response) {

            vm.error = true;
            console.log(response);

            $timeout(function timeout() {
                vm.error = false;
            }, 5000);

        });

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

        function save() {
            dataService.addOrUpdateThing(vm.thing)
                .then(
                    $location.path('/start')
                )
                .catch();
        }

    }
})();