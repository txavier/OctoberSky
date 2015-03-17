(function () {
    'use strict';

    app.controller('indexController', indexController);

    indexController.$inject = ['$scope', '$location', 'authService'];

    function indexController($scope, $location, authService) {
        var vm = this;

        vm.slideInterval = 5000;
        var slides = vm.slides = [];
        vm.logOut = logOut;
        vm.authentication = {};

        function activate() {
            setAuthentication();
        }

        function logOut() {
            authService.logOut();
            $location.path('/home');
        }

        function setAuthentication() {
            vm.authentication = authService.authentication;
        }
    }
})();