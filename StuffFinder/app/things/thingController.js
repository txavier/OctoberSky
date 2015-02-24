(function () {
    'use strict';

    app.controller('thingController', thingController);

    thingController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService'];

    function thingController($scope, $location, $log, $timeout, $routeParams, authService, dataService) {

        var vm = this;

        vm.thing = {};
        vm.thing.images = [];
        vm.thingId = $routeParams.thingId;
        vm.addOrUpdateThing = addOrUpdateThing;
        vm.deleteThing = deleteThing;
        vm.slideInterval = 5000;
        var slides = vm.slides = [];
        vm.thing.findings = [];
        vm.map = { center: { latitude: 24.416563, longitude: 54.543546 }, zoom: 12 };
        vm.options = { scrollwheel: false };
        vm.upVote = upVote;
        vm.downVote = downVote;

        // Scope variables have to be accessible for the watch statements.
        $scope.coordsUpdates = 0;
        $scope.dynamicMoveCtr = 0;
        $scope.marker = {};
        $scope.marker.coords = {};
        $scope.marker.options = {};
        $scope.marker.coords.latitude = '';
        $scope.marker.coords.longitude = '';

        activate();

        function activate() {
            setView();

            return vm;
        }

        // Set up facebook components.
        //$scope.$watch('href', function () {
        //        FB.XFBML.parse();
        //})

        function setView() {
            return getThing().then(function (data) {
                vm.thing = data;

                setMapMarker();

                // Set the carousel.
                addSlide(vm.thing.images);
            })
        }

        function addSlide(image) {
            if (vm.thing.images.length == 0 && vm.thing.imageUrl) {
                slides.push({ image: vm.thing.imageUrl });
            }
            else if (vm.thing.images.length == 0 && !vm.thing.imageUrl) {
                return;
            }
            else {
                angular.forEach(vm.thing.images, function (image, key) {
                    this.push({ image: "data:image/jpeg;base64," + image.imageBinary });
                }, slides);
            }
        };

        function getThing() {
            return dataService.getThing(vm.thingId).then(function (data) {
                vm.thing = data;

                return vm.thing;
            });
        }

        function addOrUpdateThing() {
            vm.thing.userName = authService.authentication.userName;

            return dataService.addOrUpdateThing(vm.thing).then(function (data) {
                vm.thing = data;

                return vm.thing;
            });
        }

        function deleteThing() {
            dataService.deleteThing(vm.thing.thingId).then(function (data) {
                $location.path('/start');
            });
        }

        function setMapMarker() {
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
                                vm.thing.findings[0].location.latitude = lat;
                                vm.thing.findings[0].location.longitude = lon;
                            }
                            else {
                                vm.thing.findings[0].location.formattedAddress = response.results[0].formatted_address;
                                vm.thing.findings[0].location.latitude = lat;
                                vm.thing.findings[0].location.longitude = lon;
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
        }

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