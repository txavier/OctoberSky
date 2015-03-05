(function () {
    'use strict';

    app.controller('addOrUpdateLocationController', addOrUpdateLocationController);

    addOrUpdateLocationController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateLocationController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.locations = [];
        vm.location = {};
        vm.addOrUpdateLocation = addOrUpdateLocation;
        vm.cities = [];

        activate();

        function activate() {
            getLocation($routeParams.locationId);
            getCities();

            return vm;
        }

        function getCities() {
            dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function getLocation(locationId) {
            if (!locationId) {
                return;
            }
            return dataService.getLocation(locationId).then(function (data) {
                vm.location = data;

                return vm.location;
            });
        }

        function addOrUpdateLocation(location) {
            return dataService.addOrUpdateLocation(location)
                .then(function(){
                    $location.path('/locations');
                });
        }

    }

})();