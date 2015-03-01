(function () {
    app.controller('nationalitiesController', nationalitiesController);

    nationalitiesController.$inject = ['$scope', '$log', 'dataService'];

    function nationalitiesController($scope, $log, dataService) {
        var vm = this;

        vm.nationalities = [];
        vm.searchNationalities = searchNationalities;
        vm.deleteNationality = deleteNationality;
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
            searchNationalities(vm.searchCriteria);
            searchNationalitiesCount();

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchNationalities(vm.searchCriteria);
        }

        function searchNationalities(searchCriteria) {
            return dataService.searchNationalities(searchCriteria).then(function (data) {
                vm.nationalities = data;

                return vm.nationalities;
            });

            searchNationalitiesCount(searchCriteria);
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

        function deleteNationality(nationalityId) {
            return dataService.deleteOrganization(organizationId)
                .then(function (data) {
                    getNationalities();
                });
        }

        function searchNationalitiesCount(searchCriteria) {
            return dataService.searchNationalitiesCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchNationalities(vm.searchCriteria);
        }
    }
})();