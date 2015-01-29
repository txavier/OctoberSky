'use strict';
app.controller('thingsController', ['$scope', 'thingsService', function ($scope, thingsService) {

    $scope.mostMeTooed = thingsService.getMostMe2Things();

    $scope.foundThings = thingsService.getFoundThings();


    //thingsService.getThings().then(function (results) {

    //    $scope.things = results.data;

    //}, function (error) {
    //    //alert(error.data.message);
    //});

    $(document).ready(function () {

        $(".player").mb_YTPlayer();

    });

}]);