﻿(function () {
    'use strict';

    app.controller('sidebarController', sidebarController);

    sidebarController.$inject = ['$scope', '$location', '$log', 'authService', 'dataService'];

    function sidebarController($scope, $location, $log, authService, dataService) {
        var vm = this;

        vm.authentication = {};
        vm.authentication.userName = authService.authentication.userName;
        vm.authentication.sidebarAuthenticationLabel = '';
        vm.authentication.getSidebarAuthenticationLabel = getSidebarAuthenticationLabel;
        vm.authentication.loginlogout = loginlogout;
        vm.query = '';
        vm.cities = [];
        vm.searchCity = null;
        vm.largeClass = 'hidden-lg';
        vm.smallClass = 'visible-lg';
        vm.changeClassEnter = changeClassEnter;
        vm.changeClassLeave = changeClassLeave;
        vm.activeClass = '';
        vm.largeMenuClass = 'hidden-lg hidden-xs';
        vm.smallMenuClass = 'visible-lg hidden-xs';
        vm.sidebarColumnClass = 'col-sm-1 col-xs-1';
        vm.mainColumnClass = 'col-sm-11';
        vm.toggleClasses = toggleClasses;
        vm.smallScreenLargeMenuClass = 'hidden-lg hidden-xs';
        vm.smallScreenSmallMenuClass = 'hidden-lg visible-xs';
        vm.loggedInUser = {};
        vm.showDashboard = false;
        vm.navigateSearch = navigateSearch;

        // Scope references needed for deep watch on service variable.
        // http://stackoverflow.com/questions/12576798/how-to-watch-service-variables
        $scope.authService = authService;
        $scope.authService.authentication = authService.authentication;
        $scope.authService.authentication.userName = authService.authentication.userName;

        activate();

        function activate() {
            playJumbotronVideo();
            getSidebarAuthenticationLabel();
            setView();

            if (authService.authentication.userName) {
                getLoggedInUser();
            }
        }

        $scope.$watch('authService.authentication.userName', function (current, original) {
            $log.info('authService.authentication.userName was %s', original);
            $log.info('authService.authentication.userName is now %s', current);

            vm.authentication.userName = current;
            getSidebarAuthenticationLabel();

            if (authService.authentication.userName) {
                getLoggedInUser().then(function (data) {
                    if (vm.loggedInUser.isAdmin) {
                        vm.showDashboard = true;
                    }
                    else {
                        vm.showDashboard = false;
                    }
                });
            }
            else {
                vm.showDashboard = false;
            }
        });

        function getLoggedInUser() {
            return dataService.getLoggedInUser().then(function (data) {
                vm.loggedInUser = data;
            });
        }

        function toggleClasses() {
            if (vm.smallScreenLargeMenuClass == 'hidden-lg hidden-xs') {
                vm.smallScreenLargeMenuClass = 'hidden-lg visible-xs';
                vm.smallScreenSmallMenuClass = 'hidden-lg hidden-xs';
                vm.sidebarColumnClass = 'col-sm-1 col-xs-2';
                vm.activeClass = 'active';
            }
            else {
                vm.smallScreenLargeMenuClass = 'hidden-lg hidden-xs';
                vm.smallScreenSmallMenuClass = 'hidden-lg visible-xs';
                vm.sidebarColumnClass = 'col-sm-1 col-xs-1';
                vm.activeClass = '';
            }
        }

        function changeClassEnter() {
            vm.activeClass = "active";
            vm.largeMenuClass = 'visible-lg hidden-xs';
            vm.smallMenuClass = 'hidden-lg hidden-xs';
            vm.sidebarColumnClass = 'col-sm-2 col-xs-1';
            vm.mainColumnClass = 'col-sm-10';
        }

        function changeClassLeave() {
            vm.activeClass = '';
            vm.largeMenuClass = 'hidden-lg hidden-xs';
            vm.smallMenuClass = 'visible-lg hidden-xs';
            vm.sidebarColumnClass = 'col-sm-1  col-xs-1';
            vm.mainColumnClass = 'col-sm-11';
        }

        function getCities() {
            return dataService.getCities().then(function (data) {
                vm.cities = data;
            });
        }

        function setDropDown() {
            vm.cities.splice(0, 0, { name: "All Cities" });

            vm.searchCity = vm.cities[0];
        }

        function setView() {
            getCities().then(function (data) {
                setDropDown();
            });
        }

        function getSidebarAuthenticationLabel() {
            vm.authentication.sidebarAuthenticationLabel = vm.authentication.userName ? vm.authentication.userName + ' ' + 'Sign Out' : 'Sign In';

            return vm.authentication.sidebarAuthenticationLabel;
        }

        // If the person is logged in then this method will log them out.
        // If the person is logged out then this method will take them to
        // the log in page.
        function loginlogout() {
            // If the is auth is false then we want to login now.
            if (authService.authentication.isAuth) {
                authService.logOut();

                vm.showDashboard = false;
            }
            else {
                $location.path("/home");
            }
        }

        // When the page is ready this plays the youtube video.
        function playJumbotronVideo() {
            $(document).ready(function () {
                $(".player").mb_YTPlayer();
            });
        }

        function navigateSearch() {
            $log.log('In navigateSearch');

            $location.path('/search/' + (vm.searchCity.name || 'all' | escape) + '/' + (vm.query || '' | escape));
        }
    }
})();