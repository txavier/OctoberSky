(function () {
    'use strict';

    app.controller('jumbotronYoutubeVideoSettingsController', jumbotronYoutubeVideoSettingsController);

    jumbotronYoutubeVideoSettingsController.$inject = ['$scope', '$location', '$log', '$timeout', 'authService', 'dataService'];

    function jumbotronYoutubeVideoSettingsController($scope, $location, $log, $timeout, authService, dataService) {

        var vm = this;

        vm.setting = {};
        vm.setting.jumbotronVideoUrlSetting = {};
        vm.setting.jumbotronVideoUrlSetting.Value = '';

        activate();

        function activate() {
            getJumbotronVideoUrlSetting();

            return vm;
        }

        function getJumbotronVideoUrlSetting() {
            return dataService.getJumbotronVideoUrlSetting().then(function (data) {
                vm.jumbotronVideoUrlSetting = data;

                return vm.jumbotronVideoUrlSetting;
            });
        }
    }

})();
//# sourceMappingURL=maps/jumbotronYoutubeVideoSettingsController.js.map