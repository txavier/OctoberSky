(function () {
    'use strict';

    app.controller('indexController', indexController);

    indexController.$inject = ['$scope', '$location', 'dataService'];

    function indexController($scope, $location, dataService) {
        var vm = this;

        vm.slideInterval = 5000;
        var slides = vm.slides = [];
        var things = [];
        vm.mostMe2Things = [];

        activate();

        function activate() {
            setView();
        }

        function setView() {
            dataService.getMostMe2Things().then(function (data) {
                vm.mostMe2Things = data;

                // Set the carousel.
                addSlide(vm.mostMe2Things);
            });
        }

        function addSlide(mostMe2Things) {
            
            angular.forEach(mostMe2Things, function (thing, key1) {
                angular.forEach(thing.images, function (image, key) {
                    this.push({ image: "data:image/jpeg;base64," + image.imageBinary, thingId: thing.thingId });
                }, slides);
            }, things);
        }
    }
})();