(function () {
    'use strict';

    app.controller('locationsController', locationsController);

    locationsController.$inject = ['$scope', '$log', 'dataService'];

    function locationsController($scope, $log, dataService) {
        var vm = this;

        vm.locations = [];
        vm.searchLocations = searchLocations;
        vm.deleteLocation = deleteLocation;
        vm.totalItems = 0;
        vm.itemsPerPage = 10;
        vm.currentPage = 1;
        vm.pageChanged = pageChanged;
        vm.setSortOrder = setSortOrder;
        vm.orderBy = null;
        vm.searchText = null;
        vm.searchCriteria = {};
        vm.searchCriteria.searchText = null;

        activate();

        function activate() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);
            searchLocations(vm.searchCriteria);
            searchLocationsCount(vm.searchCriteria);

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchLocations(vm.searchCriteria);
        }

        function searchLocations(searchCriteria) {
            return dataService.searchLocations(searchCriteria).then(function (data) {
                vm.locations = data;

                return vm.locations;
            });
        }

        function searchLocationsCount(searchCriteria) {
            return dataService.searchLocationsCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function setSearchCriteria(currentPage, itemsPerPage, orderBy, searchText) {
            vm.searchCriteria = {
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                orderBy: orderBy,
                searchText: searchText,
                includeProperties: 'city,findings,findings.thing'
            }

            return vm.searchCriteria;
        }

        function deleteLocation(locationId) {
            return dataService.deleteLocation(locationId)
                .then(function (data) {
                    searchLocations(vm.searchCriteria);
                });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchLocations(vm.searchCriteria);
        }
    }
})();