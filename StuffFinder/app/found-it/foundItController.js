'use strict'
app.controller('foundItController', 
    function foundItController($scope, $log, $timeout, $http) {

        $scope.location = '';

        $(document).ready(function () {

            $(".player").mb_YTPlayer();

        });

        $scope.map = { center: { latitude: 24.416563, longitude: 54.543546 }, zoom: 12 };
        $scope.map = { center: { latitude: 24.416563, longitude: 54.543546 }, zoom: 12 };
        $scope.options = { scrollwheel: false };
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 24.416563,
                longitude: 54.543546
            },
            options: { draggable: true },
            events: {
                dragend: function (marker, eventName, args) {
                    $log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=false&key=AIzaSyBPUGy5syJHUaDeR_E_FTwgOO4Th8vm63Y')
                    .success(function (response) {
                        if (response.status === "ZERO_RESULTS") {
                            $scope.location = "lat: " + lat + ' ' + 'lon: ' + lon;
                        }
                        else {
                            $scope.location = response.results[0].formatted_address + ' [lat: ' + lat + ' ' + 'lon: ' + lon + ']';
                        }
                    });

                    $scope.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
        $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
            if (_.isEqual(newVal, oldVal))
                return;
            $scope.coordsUpdates++;
        });
        $timeout(function () {
            //$scope.marker.coords = {
            //    latitude: 42.1451,
            //    longitude: -100.6680
            //};
            $scope.dynamicMoveCtr++;
            $timeout(function () {
                //$scope.marker.coords = {
                //    latitude: 43.1451,
                //    longitude: -102.6680
                //};
                $scope.dynamicMoveCtr++;
            }, 2000);
        }, 1000);
    }
);