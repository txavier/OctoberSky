(function () {
    'use strict';

    app.controller('adminController', adminController);

    adminController.$inject = ['$scope', '$location', '$log', '$timeout', 'authService', 'dataService'];

    function adminController($scope, $location, $log, $timeout, authService, dataService) {
        var vm = this;

        vm.newMe2sInPastWeekCount = 0;
        vm.totalUsersCount = 0;
        vm.newFindingsInPastWeekCount = 0;
        vm.newThingsInPastWeekCount = 0;

        activate();

        function activate() {
            getNewThingsInPastWeekCount();
            getNewFindingsInPastWeekCount();
            getTotalUsersCount();
            getNewMe2sInPastWeekCount();

            return vm;
        }

        function getNewThingsInPastWeekCount() {
            return dataService.getNewThingsInPastWeekCount().then(function (data) {
                vm.newThingsInPastWeekCount = data;
            });
        }

        function getNewFindingsInPastWeekCount() {
            return dataService.getNewFindingsInPastWeekCount().then(function (data) {
                vm.newFindingsInPastWeekCount = data;
            });
        }

        function getTotalUsersCount() {
            return dataService.getTotalUsersCount().then(function (data) {
                vm.totalUsersCount = data;
            });
        }

        function getNewMe2sInPastWeekCount() {
            return dataService.getNewMe2sInPastWeekCount().then(function (data) {
                vm.newMe2sInPastWeekCount = data;
            });
        }
    }
})();