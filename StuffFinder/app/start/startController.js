'use strict'
app.controller('startController', ['$scope', 'thingsService',
    function ($scope, thingsService) {

        $scope.mostMeTooed = thingsService.getMostMe2Things();
        //$scope.mostMeTooed = thingsService.getFoundThings();
    
        $(document).ready(function () {

            $(".player").mb_YTPlayer();

        });
   
    }]);