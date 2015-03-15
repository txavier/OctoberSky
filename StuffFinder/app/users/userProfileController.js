(function () {
    'use strict';

    app.controller('userProfileController', userProfileController);

    userProfileController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function userProfileController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.users = [];
        vm.user = {};
        vm.user.cityId = null;
        vm.user.nationalityId = null;
        vm.user.nationality = {};
        vm.user.nationality.name = null;
        vm.user.city = {};
        vm.user.city.name = null;
        vm.addOrUpdateUser = addOrUpdateUser;
        vm.nationalities = [];
        vm.cities = [];

        activate();

        function activate() {
            getUser();
            getNationalities();
            getCities();

            return vm;
        }

        function getNationalities() {
            return dataService.getNationalities().then(function (data) {
                vm.nationalities = data;

                return vm.nationalities;
            });
        }

        function getCities() {
            return dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function getUser() {
            return dataService.getLoggedInUser().then(function (data) {
                vm.user = data;

                return vm.user;
            });
        }

        function addOrUpdateUser(user) {
            user.cityId = user.city ? user.city.cityId : null;
            user.nationalityId = user.nationality ? user.nationality.nationalityId : null;

            return dataService.addOrUpdateUser(user)
                .then(function () {
                    $scope.$apply();

                    history.back();
                });
        }

    }

})();