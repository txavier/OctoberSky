(function () {
    'use strict';

    app.controller('whereIsItController', whereIsItController);

    whereIsItController.$inject = ['$scope', '$location', '$log', 'authService', 'dataService'];

    function whereIsItController($scope, $location, $log, authService, dataService) {

        var vm = this;

        vm.authentication = {};
        vm.authentication.userName = authService.authentication.userName;
        
        activate();

        function activate() {
            playJumbotronVideo();
        }

        // When the page is ready this plays the youtube video.
        function playJumbotronVideo() {
            $(document).ready(function () {

                $(".player").mb_YTPlayer();

            });
        }
    }
})();