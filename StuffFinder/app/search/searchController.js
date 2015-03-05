(function () {
    'use strict';

    app.controller('searchController', searchController);

    searchController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService', 'searchService'];

    function searchController($scope, $location, $log, $timeout, $routeParams, authService, dataService, searchService) {

        var vm = this;
        
        vm.things = [];
        vm.query = $routeParams.query;
        vm.searchCityId = searchService.getSearchCityId();
        vm.jumbotronVideoUrlSetting = {};
        vm.dataProperty = '';
        vm.upVote = upVote;
        vm.downVote = downVote;
        vm.redBoxShadow = 'inset 0 0 1em rgb(180,167,23), 0 0 1em rgb(153,87,32)';
        vm.greenBoxShadow = '0 0 1em rgb(92,135,45)';
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
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.query, vm.searchCityId);
            searchThings(vm.searchCriteria);
            searchThingsCount();
            getJumbotronVideoUrlSetting();

            return vm;
        }

        function searchThings(searchCriteria) {
            return dataService.searchThings(searchCriteria).then(function (data) {
                vm.things = data;

                return vm.things;
            });

            searchThingsCount(searchCriteria);
        }

        function searchThingsCount(searchCriteria) {
            return dataService.searchThingsCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function setSearchCriteria(currentPage, itemsPerPage, orderBy, searchText, searchCityId) {
            vm.searchCriteria = {
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                orderBy: orderBy,
                searchText: searchText,
                searchCity: searchCityId
            }

            return vm.searchCriteria;
        }

        function playJumbotronVideo() {
            $(document).ready(function () {

                $(".player").mb_YTPlayer();

            });
        }

        function getJumbotronVideoUrlSetting() {
            return dataService.getJumbotronVideoUrlSetting().then(function (data) {
                vm.jumbotronVideoUrlSetting = data;
                vm.dataProperty = '{ videoURL: \'' + vm.jumbotronVideoUrlSetting.settingValue + '\', containment: \'.video-section\', quality: \'large\', autoPlay: true, mute: true, opacity: 1 }';

                playJumbotronVideo();

                return vm.jumbotronVideoUrlSetting;
            });
        }

        function upVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.upVote(vote).then(function (data) {
                searchThings();
            });
        }

        function downVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.downVote(vote).then(function (data) {
                searchThings();
            });
        }
    }

})();