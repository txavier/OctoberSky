(function () {
    'use strict';

    app.controller('newslettersController', newslettersController);

    newslettersController.$inject = ['$scope', '$log', 'dataService'];

    function newslettersController($scope, $log, dataService) {
        var vm = this;

        vm.newsletters = [];
        vm.searchNewsletters = searchNewsletters;
        vm.deleteNewsletter = deleteNewsletter;
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
            searchNewsletters(vm.searchCriteria);
            searchNewslettersCount(vm.searchCriteria);

            return vm;
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchNewsletters(vm.searchCriteria);
        }

        function searchNewsletters(searchCriteria) {
            dataService.searchNewsletters(searchCriteria).then(function (data) {
                vm.newsletters = data;

                return vm.newsletters;
            });

            searchNewslettersCount(searchCriteria);
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

        function deleteNewsletter(newsletterId) {
            return dataService.deleteNewsletter(newsletterId)
                .then(function (data) {
                    searchNewsletters(vm.searchCriteria);
                });
        }

        function searchNewslettersCount(searchCriteria) {
            return dataService.searchNewslettersCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchNewsletters(vm.searchCriteria);
        }
    }
})();