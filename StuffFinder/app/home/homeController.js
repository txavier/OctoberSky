'use strict';
app.controller('homeController', ['$scope', function ($scope) {

    $(document).ready(function () {

        $(".player").mb_YTPlayer();

    });
}]);