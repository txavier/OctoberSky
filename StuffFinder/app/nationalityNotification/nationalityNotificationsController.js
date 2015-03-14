(function () {
    'use strict';

    app.controller('nationalityNotificationsController', nationalityNotificationsController);

    nationalityNotificationsController.$inject = ['$scope', '$log', 'dataService'];

    function nationalityNotificationsController($scope, $log, dataService) {
        var vm = this;

        vm.nationalityNotifications = [];
        vm.searchNationalityNotifications = searchNationalityNotifications;
        vm.deleteNationalityNotification = deleteNationalityNotification;
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
            searchNationalityNotifications(vm.searchCriteria);
            searchNationalityNotificationsCount(vm.searchCriteria);

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchNationalityNotifications(vm.searchCriteria);
        }

        function searchNationalityNotifications(searchCriteria) {
            dataService.searchNationalityNotifications(searchCriteria).then(function (data) {
                vm.nationalityNotifications = data;

                return vm.nationalityNotifications;
            });

            searchNationalityNotificationsCount(searchCriteria);
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

        function deleteNationalityNotification(nationalityNotificationId) {
            return dataService.deleteNationalityNotification(nationalityNotificationId)
                .then(function (data) {
                    searchNationalityNotifications(vm.searchCriteria);
                });
        }

        function searchNationalityNotificationsCount(searchCriteria) {
            return dataService.searchNationalityNotificationsCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchNationalityNotifications(vm.searchCriteria);
        }
    }
})();