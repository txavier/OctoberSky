(function () {
    'use strict';

    app.controller('citiesController', citiesController);

    citiesController.$inject = ['$scope', '$log', 'dataService'];

    function citiesController($scope, $log, dataService) {
        var vm = this;

        vm.cities = [];
        vm.searchCities = searchCities;
        vm.deleteCity = deleteCity;
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
            searchCities(vm.searchCriteria);
            searchCitiesCount(vm.searchCriteria);

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCities(vm.searchCriteria);
        }

        function searchCities(searchCriteria) {
            return dataService.searchCities(searchCriteria).then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function searchCitiesCount(searchCriteria) {
            return dataService.searchCitiesCount(searchCriteria).then(function (data) {
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
                includeProperties: 'locations,cityNotifications,users'
            }

            return vm.searchCriteria;
        }

        function deleteCity(cityId) {
            return dataService.deleteCity(cityId)
                .then(function (data) {
                    searchCities(vm.searchCriteria);
                });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCities(vm.searchCriteria);
        }
    }
})();