(function () {
    'use strict';

    app.controller('indexController', indexController);

    indexController.$inject = ['$scope', '$location', '$log', '$window', 'dataService'];

    function indexController($scope, $location, $log, $window, dataService) {
        var vm = this;

        vm.slideInterval = 5000;
        var slides = vm.slides = [];
        var things = [];
        vm.mostMe2Things = [];
        vm.cities = [];
        vm.city = {};
        vm.searchText = '';
        vm.navigateSearch = navigateSearch;

        activate();

        function activate() {
            setView();
            getCities();
        }

        function getCities() {
            vm.cities.push({ name: 'All Cities' });

            vm.city = vm.cities[0];

            dataService.getCities().then(function (data) {
                vm.cities = vm.cities.concat(data);
            });

            return vm.cities;
        }

        function setView() {
            dataService.getMostMe2Things().then(function (data) {
                vm.mostMe2Things = data;

                // Set the carousel.
                //addSlide(vm.mostMe2Things);
            });
        }

        //function addSlide(mostMe2Things) {
            
        //    angular.forEach(mostMe2Things, function (thing, key1) {
        //        angular.forEach(thing.images, function (image, key) {
        //            this.push({ image: "data:image/jpeg;base64," + image.imageBinary, thingId: thing.thingId });
        //        }, slides);
        //    }, things);
        //}

        function navigateSearch() {
            $log.log('In navigateSearch');

            $window.location.href = '/#/search/' + (vm.city.name || 'all' | escape) + '/' + (vm.searchText || '' | escape);
        }
    }
})();