(function () {
    'use strict';

    app.controller('addOrUpdateUserController', addOrUpdateUserController);

    addOrUpdateUserController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateUserController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.users = [];
        vm.user = {};
        vm.user.cityId = null;
        vm.user.nationalityId = null;
        vm.user.nationality = {};
        vm.user.city = {};
        vm.user.city.name = null;
        vm.addOrUpdateUser = addOrUpdateUser;
        vm.nationalities = [];
        vm.cities = [];

        activate();

        function activate() {
            setView($routeParams.userId);

            return vm;
        }

        function setView(userId) {
            return getUser(userId).then(function () {
                getNationalities().then(function () {
                    if (vm.user.nationalityId) {
                        vm.user.nationality = vm.nationalities[vm.nationalities.getIndexBy("nationalityId", vm.user.nationalityId)];
                    }
                });

                getCities().then(function () {
                    if (vm.user.cityId) {
                        vm.user.city = vm.cities[vm.cities.getIndexBy("cityId", vm.user.cityId)];
                    }
                });

                return vm.user;
            });
        }

        Array.prototype.getIndexBy = function (name, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][name] == value) {
                    return i;
                }
            }
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

        function getUser(userId) {
            if (!userId) {
                return;
            }
            return dataService.getUser(userId).then(function (data) {
                vm.user = data;

                return vm.user;
            });
        }

        function addOrUpdateUser(user) {
            user.cityId = user.city ? user.city.cityId : null;
            user.nationalityId = user.nationality ? user.nationality.nationalityId : null;

            user.thingCities = null;
            user.nationality = null;
            user.city = null;

            return dataService.addOrUpdateUser(user)
                .then(function(){
                    $scope.$apply();

                    history.back();
                });
        }

    }

})();