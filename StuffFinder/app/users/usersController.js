(function () {
    'use strict';

    app.controller('usersController', usersController);

    usersController.$inject = ['$scope', '$log', 'dataService'];

    function usersController($scope, $log, dataService) {
        var vm = this;

        vm.users = [];
        vm.searchUsers = searchUsers;
        vm.deleteUser = deleteUser;
        vm.totalItems = 0;
        vm.itemsPerPage = 10;
        vm.currentPage = 1;
        vm.pageChanged = pageChanged;
        vm.setSortOrder = setSortOrder;
        vm.orderBy = null;
        vm.searchText = null;
        vm.searchCriteria = {};
        vm.searchCriteria.searchText = null;
        vm.syncUsers = syncUsers;

        activate();

        function activate() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);
            searchUsers(vm.searchCriteria);
            searchUsersCount(vm.searchCriteria);

            return vm;
        }

        function syncUsers() {
            dataService.syncUsers().then(function (data) {
                searchUsers(vm.searchCriteria);
            });
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchUsers(vm.searchCriteria);
        }

        function searchUsers(searchCriteria) {
            return dataService.searchUsers(searchCriteria).then(function (data) {
                vm.users = data;

                return vm.users;
            });
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

        function deleteUser(userId) {
            return dataService.deleteUser(userId)
                .then(function (data) {
                    searchUsers(vm.searchCriteria);
                });
        }

        function searchUsersCount(searchCriteria) {
            return dataService.searchUsersCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchUsers(vm.searchCriteria);
        }
    }
})();