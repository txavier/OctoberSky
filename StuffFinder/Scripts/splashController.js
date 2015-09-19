(function () {
    'use strict';

    app.controller('splashController', splashController);

    splashController.$inject = ['$scope', '$location', '$log', '$window', 'dataService', 'splashService'];

    function splashController($scope, $location, $log, $window, dataService, splashService) {
        var vm = this;

        vm.slideInterval = 5000;
        var slides = vm.slides = [];
        var things = [];
        vm.mostMe2Things = [];
        vm.cities = [];
        vm.city = {};
        vm.searchText = '';
        vm.navigateSearch = navigateSearch;
        vm.setShowSplash = setShowSplash;
        vm.getShowSplash = getShowSplash;

        activate();

        function activate() {
            setView();
            getCities();
        }

        function getCities() {
            vm.cities.push({ name: 'All Cities' });

            dataService.getCities().then(function (data) {
                vm.cities = vm.cities.concat(data);

                vm.city = vm.cities[4];
            });

            return vm.cities;
        }

        function setView() {
            dataService.getMostMe2Things(12).then(function (data) {
                vm.mostMe2Things = data;
            });
        }

        function navigateSearch() {
            $log.log('In navigateSearch');

            $window.location.href = '/#/search/' + (vm.city.name || 'all' | escape) + '/' + (vm.searchText || '' | escape);
        }

        function setShowSplash(showSplash) {
            splashService.setShowSplash(showSplash);

            //$location.path('/home');
        }

        function getShowSplash() {
            return splashService.getShowSplash();
        }
    }
})();
//# sourceMappingURL=maps/splashController.js.map