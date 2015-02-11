(function () {
    'use strict';

    app.controller('thingController', thingController);

    thingController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService'];

    function thingController($scope, $location, $log, $timeout, $routeParams, authService, dataService) {

        var vm = this;

        vm.thing = {};
        vm.thingId = $routeParams.thingId;
        vm.addOrUpdateThing = addOrUpdateThing;
        vm.deleteThing = deleteThing;

        activate();

        function activate() {
            getThing();

            return vm;
        }

        function getThing() {
            return dataService.getThing(vm.thingId).then(function (data) {
                vm.thing = data;

                return vm.thing;
            });
        }

        function addOrUpdateThing() {
            vm.thing.userName = authService.authentication.userName;

            return dataService.addOrUpdateThing(vm.thing).then(function (data) {
                vm.thing = data;

                return vm.thing;
            })
        }

        function deleteThing() {
            dataService.deleteThing(vm.thing.thingId).then(function (data) {
                $location.path('/start');
            })
        }

    }

})();