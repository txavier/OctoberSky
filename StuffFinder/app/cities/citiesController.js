(function () {
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
            searchCitiesCount();

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

            searchCitiesCount(searchCriteria);
        }

        function setSearchCriteria(currentPage, itemsPerPage, orderBy, searchText) {
            vm.searchCriteria = {
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                orderBy: orderBy,
                searchText: searchText
            }

            return vm.searchCriteria;
        }

        function deleteCity(cityId) {
            return dataService.deleteOrganization(organizationId)
                .then(function (data) {
                    getCities();
                });
        }

        function searchCitiesCount(searchCriteria) {
            return dataService.searchCitiesCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCities(vm.searchCriteria);
        }
    }
})();