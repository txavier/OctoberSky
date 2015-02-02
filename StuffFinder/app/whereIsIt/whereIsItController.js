(function () {
    'use strict';

    app.controller('whereIsItController', whereIsItController);

    whereIsItController.$inject = ['$scope', '$location', '$log', 'authService', 'dataService'];

    function whereIsItController($scope, $location, $log, authService, dataService) {

        var vm = this;

        vm.authentication = {};
        vm.authentication.userName = authService.authentication.userName;
        vm.thing = {};
        vm.thing.categoryId = null;
        vm.categories = [];
        vm.save = save;

        activate();

        function activate() {
            playJumbotronVideo();

            vm.categories = getCategories();

            vm.thing = getNewThing();

            return vm;
        }

        // When the page is ready this plays the youtube video.
        function playJumbotronVideo() {
            $(document).ready(function () {

                $(".player").mb_YTPlayer();

            });
        }

        function getCategories() {
            var result = [{ id: 10, name: 'furniture' }, { id: 12, name: 'food' }];

            return result;
        }

        function getNewThing() {
            var result = {
                postedDate: new Date(),
                comments: [
                    {
                    date: new Date(),
                    originalPoster: true,
                    name: authService.authentication.userName,
                }],
            }

            return result;
        }

        function save() {
            dataService.saveThing(vm.thing)
                .then(
                    $location.path('/start')
                )
                .catch();
        }

    }
})();