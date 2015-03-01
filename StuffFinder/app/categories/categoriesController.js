(function () {
    app.controller('categoriesController', categoriesController);

    categoriesController.$inject = ['$scope', '$log', 'dataService'];

    function categoriesController($scope, $log, dataService) {
        var vm = this;

        vm.categories = [];
        vm.searchCategories = searchCategories;
        vm.deleteCategory = deleteCategory;
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
            searchCategories(vm.searchCriteria);
            searchCategoriesCount();

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCategories(vm.searchCriteria);
        }

        function searchCategories(searchCriteria) {
            return dataService.searchCategories(searchCriteria).then(function (data) {
                vm.categories = data;

                return vm.categories;
            });

            searchCategoriesCount(searchCriteria);
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

        function deleteCategory(categoryId) {
            return dataService.deleteOrganization(organizationId)
                .then(function (data) {
                    getCategories();
                });
        }

        function searchCategoriesCount(searchCriteria) {
            return dataService.searchCategoriesCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCategories(vm.searchCriteria);
        }
    }
})();