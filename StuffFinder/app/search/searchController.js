(function () {
    'use strict';

    app.controller('searchController', searchController);

    searchController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService'];

    function searchController($scope, $location, $log, $timeout, $routeParams, authService, dataService) {

        var vm = this;
        
        vm.things = [];
        vm.query = $routeParams.query;
        vm.jumbotronVideoUrlSetting = {};
        vm.dataProperty = '';

        activate();

        function activate() {
            searchThings();
            getJumbotronVideoUrlSetting();

            return vm;
        }

        function searchThings() {
            return dataService.searchThings(vm.query).then(function (data) {
                vm.things = data;

                return vm.things;
            });
        }

        function playJumbotronVideo() {
            $(document).ready(function () {

                $(".player").mb_YTPlayer();

            });
        }

        function getJumbotronVideoUrlSetting() {
            return dataService.getJumbotronVideoUrlSetting().then(function (data) {
                vm.jumbotronVideoUrlSetting = data;
                vm.dataProperty = '{ videoURL: \'' + vm.jumbotronVideoUrlSetting.settingValue + '\', containment: \'.video-section\', quality: \'large\', autoPlay: true, mute: true, opacity: 1 }';

                playJumbotronVideo();

                return vm.jumbotronVideoUrlSetting;
            });
        }
    }

})();