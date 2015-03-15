(function () {
    'use strict';

    app.controller('cityNotificationsController', cityNotificationsController);

    cityNotificationsController.$inject = ['$scope', '$log', 'dataService'];

    function cityNotificationsController($scope, $log, dataService) {
        var vm = this;

        vm.cityNotifications = [];
        vm.searchCityNotifications = searchCityNotifications;
        vm.deleteCityNotification = deleteCityNotification;
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
            searchCityNotifications(vm.searchCriteria);
            searchCityNotificationsCount(vm.searchCriteria);

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCityNotifications(vm.searchCriteria);
        }

        function searchCityNotifications(searchCriteria) {
            dataService.searchCityNotifications(searchCriteria).then(function (data) {
                vm.cityNotifications = data;

                return vm.cityNotifications;
            });

            searchCityNotificationsCount(searchCriteria);
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

        function deleteCityNotification(cityNotificationId) {
            return dataService.deleteCityNotification(cityNotificationId)
                .then(function (data) {
                    searchCityNotifications(vm.searchCriteria);
                });
        }

        function searchCityNotificationsCount(searchCriteria) {
            return dataService.searchCityNotificationsCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCityNotifications(vm.searchCriteria);
        }
    }
})();