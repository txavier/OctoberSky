(function () {
    'use strict';

    app.controller('indexController', indexController);

    indexController.$inject = ['$scope', '$location', 'authService', 'splashService'];

    function indexController($scope, $location, authService, splashService) {
        var vm = this;

        vm.slideInterval = 5000;
        var slides = vm.slides = [];
        vm.logOut = logOut;
        vm.authentication = {};

        function activate() {
            setAuthentication();

            // Initially show splash screen.
            splashService.setShowSplash(true);
        }

        function logOut() {
            authService.logOut();
            $location.path('/home');
        }

        function setAuthentication() {
            vm.authentication = authService.authentication;
        }

        function setShowSplash(showSplash) {
            return splashService.setShowSplash(showSplash);
        }

        function getShowSplash() {
            return splashService.getShowSplash();
        }
    }
})();