'use strict'
app.controller('startController', ['$scope', 'thingsService', 'dataService',
function ($scope, thingsService, dataService) {

    $scope.mostMeTooed = dataService.getMostMe2Things().then(function (data) {
        $scope.mostMeTooed = data;
    });
    
        $(document).ready(function () {

            $(".player").mb_YTPlayer();

        });
   
    }]);