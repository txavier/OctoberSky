'use strict';
app.controller('thingsController', ['$scope', 'thingsService', 'dataService', function ($scope, thingsService, dataService) {

    $scope.mostMeTooed = dataService.getMostMe2Things().then(function (data) {
        $scope.mostMeTooed = data;
    });
    
    $scope.foundThings = dataService.getFoundThings().then(function (data) {
        $scope.foundThings = data;
    });

    $(document).ready(function () {

        $(".player").mb_YTPlayer();

    });

}]);