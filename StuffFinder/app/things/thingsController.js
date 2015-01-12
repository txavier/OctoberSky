'use strict';
app.controller('thingsController', ['$scope', 'thingsService', function ($scope, thingsService) {

    $scope.things = [];

    //thingsService.getThings().then(function (results) {

    //    $scope.things = results.data;

    //}, function (error) {
    //    //alert(error.data.message);
    //});

    $(document).ready(function () {

        $(".player").mb_YTPlayer();

    });

}]);