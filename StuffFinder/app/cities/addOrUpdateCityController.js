(function () {
    'use strict';

    app.controller('addOrUpdateCityController', addOrUpdateCityController);

    addOrUpdateCityController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateCityController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.cities = [];
        vm.city = {};
        vm.addOrUpdateCity = addOrUpdateCity;

        activate();

        function activate() {
            getCity($routeParams.cityId);

            return vm;
        }

        function getCity(cityId) {
            if (!cityId) {
                return;
            }
            return dataService.getCity(cityId).then(function (data) {
                vm.city = data;

                return vm.city;
            });
        }

        function addOrUpdateCity(city) {
            return dataService.addOrUpdateCity(city)
                .then(function(){
                    $scope.$apply();

                    history.back();
                });
        }

    }

})();