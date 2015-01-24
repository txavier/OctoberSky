'use strict';
app.controller('sidebarController', ['$scope', 'authService', function ($scope, authService) {

    $scope.authentication = {};

    $scope.authentication.userName = authService.authentication.userName;

    $scope.authentication.sidebarAuthenticationLabel = authService.authentication.userName ?
        authService.authentication.userName + ' ' + 'Sign Out' : 'Sign In';

    var logout = function () {
        authService.logOut();
    }

    $(document).ready(function () {

        $(".player").mb_YTPlayer();

    });
}]);