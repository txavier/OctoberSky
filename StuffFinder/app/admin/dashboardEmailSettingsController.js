(function () {
    'use strict';

    app.controller('dashboardEmailSettingsController', dashboardEmailSettingsController);

    dashboardEmailSettingsController.$inject = ['$scope'];

    function dashboardEmailSettingsController($scope) {
        var vm = this;

        activate();

        function activate() {
            return vm;
        }
    }
})();