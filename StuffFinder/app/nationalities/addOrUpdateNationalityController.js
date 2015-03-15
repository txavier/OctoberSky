(function () {
    'use strict';

    app.controller('addOrUpdateNationalityController', addOrUpdateNationalityController);

    addOrUpdateNationalityController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateNationalityController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.nationalities = [];
        vm.nationality = {};
        vm.addOrUpdateNationality = addOrUpdateNationality;

        activate();

        function activate() {
            getNationality($routeParams.nationalityId);

            return vm;
        }

        function getNationality(nationalityId) {
            if (!nationalityId) {
                return;
            }
            return dataService.getNationality(nationalityId).then(function (data) {
                vm.nationality = data;

                return vm.nationality;
            });
        }

        function addOrUpdateNationality(nationality) {
            return dataService.addOrUpdateNationality(nationality)
                .then(function(){
                    $scope.$apply();

                    history.back();
                });
        }

    }

})();