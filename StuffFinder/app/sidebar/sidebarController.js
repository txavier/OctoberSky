(function () {
    'use strict';

    app.controller('sidebarController', sidebarController);

    sidebarController.$inject = ['$scope', '$location', '$log', 'authService', 'dataService'];

    function sidebarController($scope, $location, $log, authService, dataService) {

        var vm = this;

        vm.authentication = {};
        vm.authentication.userName = authService.authentication.userName;
        vm.authentication.sidebarAuthenticationLabel = '';
        vm.authentication.getSidebarAuthenticationLabel = getSidebarAuthenticationLabel;
        vm.authentication.loginlogout = loginlogout;
        vm.query = '';
        vm.cities = [];

        // Scope references needed for deep watch on service variable.
        // http://stackoverflow.com/questions/12576798/how-to-watch-service-variables
        $scope.authService = authService;
        $scope.authService.authentication = authService.authentication;
        $scope.authService.authentication.userName = authService.authentication.userName;

        activate();

        function activate() {
            playJumbotronVideo();
            getSidebarAuthenticationLabel();
            getCities();
        }

        $scope.$watch('authService.authentication.userName', function (current, original) {
            $log.info('authService.authentication.userName was %s', original);
            $log.info('authService.authentication.userName is now %s', current);

            vm.authentication.userName = current;
            getSidebarAuthenticationLabel();
        });

        function getCities() {
            dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function getSidebarAuthenticationLabel() {
            vm.authentication.sidebarAuthenticationLabel = vm.authentication.userName ? vm.authentication.userName + ' ' + 'Sign Out' : 'Sign In';

            return vm.authentication.sidebarAuthenticationLabel;
        }

        // If the person is logged in then this method will log them out.
        // If the person is logged out then this method will take them to
        // the log in page.
        function loginlogout() {

            // If the is auth is false then we want to login now.
            if (authService.authentication.isAuth) {
                authService.logOut();
            }
            else {
                $location.path("/home");
            }
        }

        // When the page is ready this plays the youtube video.
        function playJumbotronVideo() {
            $(document).ready(function () {

                $(".player").mb_YTPlayer();

            });
        }

    }
})();