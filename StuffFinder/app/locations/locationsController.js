(function () {
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
            searchLocationsCount();

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchLocations(vm.searchCriteria);
        }

        function deleteLocation(locationId) {
            return dataService.deleteOrganization(organizationId)
                .then(function (data) {
                    getLocations();
                });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchLocations(vm.searchCriteria);
        }
    }
})();