﻿(function () {
    'use strict';

    app.controller('searchController', searchController);

    searchController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService', 'me2Service',
    'ngToast'];

    function searchController($scope, $location, $log, $timeout, $routeParams, authService, dataService, me2Service, ngToast) {

        var vm = this;
        
        vm.things = [];
        vm.query = $routeParams.query;
        vm.cityName = $routeParams.cityName;
        vm.jumbotronVideoUrlSetting = {};
        vm.dataProperty = '';
        vm.upVote = upVote;
        vm.downVote = downVote;
        vm.redBoxShadow = '0 0 1em rgb(148,62,15)';
        vm.redFont = 'rgb(148,62,15)';
        vm.greenBoxShadow = '0 0 1em rgb(57,118,40)';
        vm.greenFont = 'rgb(57,118,40)';
        vm.totalItems = 0;
        vm.itemsPerPage = 100;
        vm.currentPage = 1;
        vm.pageChanged = pageChanged;
        vm.setSortOrder = setSortOrder;
        vm.orderBy = null;
        vm.searchText = null;
        vm.searchCriteria = {};
        vm.searchCriteria.searchText = null;
        vm.me2 = me2;
        vm.loggedInUser = {};

        activate();

        function activate() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.query, vm.cityName);
            searchThings(vm.searchCriteria);
            searchThingsCount(vm.searchCriteria);
            getJumbotronVideoUrlSetting();
            getLoggedInUser();

            return vm;
        }

        function getLoggedInUser() {
            return dataService.getLoggedInUser().then(function (data) {
                vm.loggedInUser = data;
            });
        }

        function me2(thingId) {
            if (!vm.loggedInUser) {
                ngToast.create('Sorry you have to be logged in to do this.');

                return;
            }

            ngToast.create('You want it? You got it.  An email will be sent to you when this item is found in your city!');

            return me2Service.me2(thingId).then(function (data) {
                searchThings(vm.searchCriteria);
            });
        }

        function searchThings(searchCriteria) {
            dataService.searchThings(searchCriteria).then(function (data) {
                vm.things = data;

                return vm.things;
            });
        }

        function searchThingsCount(searchCriteria) {
            return dataService.searchThingsCount(searchCriteria).then(function (data) {
                vm.totalItems = data || 0;

                return vm.totalItems;
            });
        }

        function setSearchCriteria(currentPage, itemsPerPage, orderBy, searchText, cityName) {
            var searchParams = [
                {
                    key: "cityName",
                    value: cityName
                }
            ];

            vm.searchCriteria = {
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                orderBy: orderBy,
                searchText: searchText,
                searchParams: searchParams
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

        function pageChanged() {
            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText, vm.cityName);

            searchCities(vm.searchCriteria);
        }

        function setSortOrder(orderBy) {
            vm.orderBy = orderBy;

            setSearchCriteria(vm.currentPage, vm.itemsPerPage, vm.orderBy, vm.searchText);

            searchCities(vm.searchCriteria);
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