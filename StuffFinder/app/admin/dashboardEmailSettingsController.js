(function () {
    'use strict';

    app.controller('dashboardEmailSettingsController', dashboardEmailSettingsController);

    dashboardEmailSettingsController.$inject = ['$scope', '$location', '$log', '$timeout', 'authService', 'dataService'];

    function dashboardEmailSettingsController($scope, $location, $log, $timeout, authService, dataService) {

        var vm = this;

        activate();

        function activate() {


            return vm;
        }
    }

})();