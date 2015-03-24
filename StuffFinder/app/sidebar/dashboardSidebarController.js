(function () {
    'use strict';

    app.controller('dashboardSidebarController', dashboardSidebarController);

    dashboardSidebarController.$inject = ['$scope', '$location', '$log', 'authService', 'dataService'];

    function dashboardSidebarController($scope, $location, $log, authService, dataService) {
        var vm = this;

        vm.version = '';

        activate();

        function activate() {
            getVersion();
        }

        function getVersion() {
            return dataService.getSetting('version').then(function (data) {
                vm.version = data;
            });
        }
    }
})();