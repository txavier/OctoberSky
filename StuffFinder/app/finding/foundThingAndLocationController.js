(function () {
    'use strict';

    app.controller('foundThingAndLocationController', foundThingAndLocationController);

    foundThingAndLocationController.$inject = ['$scope', '$log', '$timeout', '$http', '$location', '$routeParams', 'authService',
        'dataService', 'thingService'];

    function foundThingAndLocationController($scope, $log, $timeout, $http, $location, $routeParams, authService, dataService,
        thingService) {

        var vm = this;
        
        vm.thing = {};
        vm.thing.description = null;
        vm.defaultCoordinates = { latitude: 24.45875166303192, longitude: 54.36872893652344 };
        vm.map = { center: vm.defaultCoordinates, zoom: 12 };
        vm.options = { scrollwheel: false };
        vm.addOrUpdate = addOrUpdate;
        vm.categories = {};
        vm.thing.categoryId = null;
        vm.datepickerFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.datepickerFormat = vm.datepickerFormats[3];
        vm.datepickerOpen = datepickerOpen;
        vm.datepickerOpened = false;
        vm.datepickerDateOptions = { formatYear: 'yy', startingDay: 1 };
        vm.clear = datepickerClear;
        vm.locations = [];
        vm.thing.finding = { location: { locationName: '', city: { cityId: null } }, date: null, price: null, upcCode: null };
        vm.cities = [];
        vm.searchNewLocation = searchNewLocation;

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
            setMapMarker();
            getCategories();
            datepickerToggleMin();
            datepickerToggleMax();
            initiateDroplet();
            getThing();
            getLocations();
            getCities();

            return vm;
        }

        function searchNewLocation(locationName) {
            if (locationName.length > 3) {
                dataService.searchNewLocation(locationName, (vm.thing.finding.location.city.name) ? vm.thing.finding.location.city.name : 'dubai').then(function (data) {
                    if (data != null) {
                        if (!vm.thing.finding) {
                            vm.thing.finding = { location: { locationName: '' }, date: new Date(), price: null, upcCode: null };
                        }
                        vm.thing.finding.location = data;

                        $scope.finding.location = data;

                        vm.finding.location.city = vm.cities[vm.cities.getIndexBy("name", vm.thing.finding.location.city.name)];
                    }
                });
            }
        }

        function getCities() {
            dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function getLocations() {
            dataService.getLocations().then(function (data) {
                vm.locations = data;
            });
        }

        function getThing() {
            if (thingService.getThing() != null) {
                vm.thing = thingService.getThing();

                vm.thing.finding = vm.thing.finding == null ? 
                    { location: { locationName: '', city: { cityId: null } }, date: null, price: null, upcCode: null }
                    : vm.thing.finding;

                thingService.clearThing();
            }
            if ($routeParams.thingId) {
                dataService.getThing($routeParams.thingId).then(function (data) {
                    vm.thing = data;
                });
            }
        }

        function initiateDroplet() {
            $scope.$on('$dropletReady', function whenDropletReady() {
                vm.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);

                uploadFiles();
            });
        }

        function uploadFiles() {
            return dataService.getServerUrl().then(function (resource) {
                var serverUrl = resource;

                vm.interface.setRequestUrl(serverUrl.resourceServerUrl + 'api/thingsApi' + '/files');
            });
        }

        function getCategories() {
            return dataService.getCategories().then(function (data) {
                vm.categories = data;
                return vm.categories;
            });
        }

        function addOrUpdate() {
            // If this thing already has a username do not save over it.
            vm.thing.userName = vm.thing.userName ? vm.thing.userName : authService.authentication.userName;

            vm.thing.finding.userName = authService.authentication.userName;

            vm.thing.postedDate = vm.thing.postedDate ? vm.thing.postedDate : new Date();

            dataService.addOrUpdateThing(vm.thing)
                .then(function (data) {
                    vm.interface.setPostData({ id: data.thingId, userName: authService.authentication.userName });

                    vm.interface.uploadFiles();

                    $scope.$apply();

                    history.back();
                })
                .catch(handleFailure);
        }

        function handleFailure(error) {
            $log.error('Failure notice.' + error.data.message + ": " + error.data.messageDetail);
        }

        // Set the marker on the map to the default location.
        function setMapMarker() {
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: vm.thing.finding.location.latitude ? vm.thing.finding.location.latitude : vm.defaultCoordinates.latitude,
                    longitude: vm.thing.finding.location.latitude ? vm.thing.finding.location.longitude : vm.defaultCoordinates.longitude
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
                                vm.thing.finding.location.latitude = lat;
                                vm.thing.finding.location.longitude = lon;
                            }
                            else {
                                vm.thing.finding.location.formattedAddress = response.results[0].formatted_address;
                                vm.thing.finding.location.latitude = lat;
                                vm.thing.finding.location.longitude = lon;
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

        // Watch for the finding.location variable being changed. When it does
        // change the map center longitude and latitude.  Also change the marker.
        // We would like the center and marker to be together on the screen.
        $scope.thing = vm.thing;
        $scope.thing.finding = vm.thing.finding;
        $scope.thing.finding.location.latitude = vm.thing.finding.location.latitude;

        $scope.$watch('thing.finding.location.locationName', function (current, original) {
            if (_.isEqual(current, original) || !current.latitude) {
                return;
            }

            if (!vm.locations.getIndexBy("locationName", current.locationName)) {
                return;
            }

            vm.thing.finding.location = vm.locations[vm.locations.getIndexBy("locationName", current.locationName)];

            // Set the drop down to the city of the location from the selected
            // city from the typeahead textarea.
            vm.thing.finding.location.city = vm.cities[vm.cities.getIndexBy("name", vm.thing.finding.location.city.name)];

            $scope.marker.coords.latitude = vm.thing.finding.location.latitude;
            $scope.marker.coords.longitude = vm.thing.finding.location.longitude;

            vm.map.center.latitude = vm.thing.finding.location.latitude;
            vm.map.center.longitude = vm.thing.finding.location.longitude;
            vm.map.zoom = 12;
        });

        Array.prototype.getIndexBy = function (name, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][name] == value) {
                    return i;
                }
            }
        }

        $scope.thing.finding.location.city = vm.thing.finding.location.city;

        $scope.$watch('thing.finding.location.city', function (current, original) {
            if (_.isEqual(current, original) || !current) {
                vm.thing.finding.location = {};
                vm.thing.finding.location.locationName = vm.thing.finding.location.locationName || '';
                vm.thing.finding.location.city = original;
                return;
            }

            $scope.marker.coords.latitude = current.latitude;
            $scope.marker.coords.longitude = current.longitude;

            vm.map.center.latitude = current.latitude;
            vm.map.center.longitude = current.longitude;

            vm.thing.finding.location.latitude = current.latitude;
            vm.thing.finding.location.longitude = current.longitude;

            vm.map.zoom = 12;
        });

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

        // End region map.

        // Begin region datepicker.
        
        function datepickerClear () {
            vm.thing.finding.date = null;
        };

        function datepickerToggleMin() {
            vm.datepickerMinDate = vm.datepickerMinDate ? null : new Date(1900, 1, 1);
        };

        function datepickerToggleMax() {
            vm.datepickerMaxDate = vm.datepickerMaxDate ? null : new Date();
        };

        function datepickerOpen($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datepickerOpened = true;
        };

        // End region datepicker.
    }

})();