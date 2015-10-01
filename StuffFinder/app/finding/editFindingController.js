(function () {
    'use strict';

    app.controller('editFindingController', editFindingController);

    editFindingController.$inject = ['$scope', '$log', '$timeout', '$http', '$location', '$routeParams', 'authService', 'dataService'];

    function editFindingController($scope, $log, $timeout, $http, $location, $routeParams, authService, dataService) {

        var vm = this;

        //vm.finding = {};
        //vm.finding.location = {};
        //vm.finding.location.city = {};
        vm.thing = {};
        //vm.map = { center: { latitude: 24.416563, longitude: 54.543546 }, zoom: 12 };
        vm.options = { scrollwheel: false };
        vm.addOrUpdate = addOrUpdate;
        vm.categories = {};
        vm.datepickerFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.datepickerFormat = vm.datepickerFormats[3];
        vm.datepickerOpen = datepickerOpen;
        vm.datepickerOpened = false;
        vm.datepickerDateOptions = { formatYear: 'yy', startingDay: 1 };
        vm.clear = datepickerClear;
        //vm.marker = {};
        vm.slideInterval = 5000;
        var slides = vm.slides = [];
        vm.locations = [];
        vm.cities = [];
        vm.deleteImage = deleteImage;
        vm.searchNewLocation = searchNewLocation;
        vm.finding = { location: { locationName: '', latitude: null, longitude: null, city: {} }, date: new Date(), price: null, upcCode: null };
        vm.details = {};
        vm.overrideCityNameChange = false;

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
            setView($routeParams.findingId);
            getCategories();
            datepickerToggleMin();
            datepickerToggleMax();
            initiateDroplet();
            getLocations();

            return vm;
        }

        // administrative_area_level_1
        // Abu Dhabi == أبو ظبي
        // Al Ain == أبو ظبي
        // Dubai == إمارة دبيّ
        // Fujairah == الفجيرة
        // Ras Al-Khaimah = Ras al Khaimah
        // Sharjah = إمارة الشارقةّ

        // locality
        // Ajman == Ajman
        // Ras Al-Khaimah = Ras Al-Khaimah
        // Umm Al-Quwain = Umm Al Quwain
        function searchNewLocation(locationName) {
            if (locationName.length > 3) {
                if (vm.details && vm.details.formatted_address) {
                    vm.thing.finding = {};

                    vm.thing.finding.location = {
                        latitude: vm.details.geometry.location.lat(),
                        longitude: vm.details.geometry.location.lng(),
                        formattedAddress: vm.details.formatted_address,
                        locationName: locationName,
                        city: getCityFromDetails(vm.details)
                    };

                    vm.finding.location = vm.thing.finding.location;

                    $scope.finding.location = vm.thing.finding.location;

                    if (vm.thing.finding.location.city && vm.thing.finding.location.city.name) {
                        vm.finding.location.city = vm.cities[vm.cities.getIndexBy("name", vm.thing.finding.location.city.name)];
                    }

                    //$scope.$apply();

                    $scope.marker.coords.latitude = vm.thing.finding.location.latitude;
                    $scope.marker.coords.longitude = vm.thing.finding.location.longitude;

                    vm.map.center.latitude = vm.thing.finding.location.latitude;
                    vm.map.center.longitude = vm.thing.finding.location.longitude;
                    vm.map.zoom = 12;

                    vm.overrideCityNameChange = true;
                }
            }
        }

        function getCityFromDetails(details) {
            var city = null;

            // Search for city name.
            for (var i = 0; i < details.address_components.length; i++) {
                switch (details.address_components[i].long_name) {
                    case 'Abu Dhabi': {
                        city = 'Abu Dhabi';
                        break;
                    }
                    case 'Dubai': {
                        city = 'Dubai';
                        break;
                    }
                    case 'Fujairah': {
                        city = 'Fujairah';
                        break;
                    }
                    case 'Ras Al-Khaimah': {
                        city = 'Ras Al-Khaimah';
                        break;
                    }
                    case 'Sharjah': {
                        city = 'Sharjah';
                        break;
                    }
                    case 'أبو ظبي': {
                        city = 'Abu Dhabi';
                        break;
                    }
                    case 'إمارة دبيّ': {
                        city = 'Dubai';
                        break;
                    }
                    case 'الفجيرة': {
                        city = 'Fujairah';
                        break;
                    }
                    case 'Ras al Khaimah': {
                        city = 'Ras Al-Khaimah';
                        break;
                    }
                    case 'إمارة الشارقةّ': {
                        city = 'Sharjah';
                        break;
                    }
                }

                switch (details.address_components[i].long_name) {
                    case 'Ajman': {
                        city = 'Ajman';
                        break;
                    }
                    case 'Ras Al-Khaimah': {
                        city = 'Ras Al-Khaimah';
                        break;
                    }
                    case 'Umm Al Quwain': {
                        city = 'Umm Al-Quwain';
                        break;
                    }
                }
            }

            var result = vm.cities[vm.cities.getIndexBy("name", city)];

            return result;
        }

        function setView(findingId) {
            return getFinding(findingId).then(function () {
                getCities().then(function () {
                    vm.finding.location.city = vm.cities[vm.cities.getIndexBy("name", vm.finding.location.city.name)];
                });
            });
        }

        function getCities() {
            return dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function getLocations() {
            return dataService.getLocations().then(function (data) {
                vm.locations = data;

                return vm.locations;
            });
        }

        function getFinding(findingId) {
            return dataService.getFinding(findingId).then(function (data) {
                vm.finding = data;

                vm.map = { center: { latitude: vm.finding.location.latitude, longitude: vm.finding.location.longitude }, zoom: 12 };

                setMapMarker(vm.finding.location.latitude, vm.finding.location.longitude);

                addSlide(vm.finding.images);

                getThing(vm.finding.thingId);

                return vm.finding;
            });
        }

        function getThing(thingId) {
            dataService.getThing(thingId).then(function (data) {
                vm.thing = data;
            });
        }

        function addSlide(images) {
            if (images.length == 0) {
                return;
            }
            else {
                angular.forEach(images, function (image, key) {
                    this.push({ image: "data:image/jpeg;base64," + image.imageBinary });
                }, slides);
            }
        };

        function deleteImage(imageId) {
            return dataService.deleteImage(imageId).then(function (data) {
                $log.log("Image deletion successful");

                setView();
            });
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
            vm.finding.userName = authService.authentication.userName;

            vm.finding.date = new Date();

            dataService.addOrUpdateFinding(vm.finding)
                .then(function (data) {
                    vm.interface.setPostData({ id: data.findingId, userName: authService.authentication.userName });

                    vm.interface.uploadFiles();

                    $scope.$apply();

                    history.back();
                })
                .catch(handleFailure);
        }

        function handleFailure(error) {
            $log.error('Failure notice.' + error.data.message + ": " + error.data.messageDetail);
        }

        // Begin region map.

        function setMapMarker(latitude, longitude) {
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: latitude,
                    longitude: longitude
                },
                options: { draggable: true },
                events: {
                    dragend: function (marker, eventName, args) {
                        $log.log('marker dragend');
                        var lat = marker.getPosition().lat();
                        var lon = marker.getPosition().lng();
                        $log.log(lat);
                        $log.log(lon);

                        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&language=en&sensor=false&key=AIzaSyBPUGy5syJHUaDeR_E_FTwgOO4Th8vm63Y')
                        .success(function (response) {
                            if (response.status === "ZERO_RESULTS") {
                                vm.finding.location.latitude = lat;
                                vm.finding.location.longitude = lon;
                            }
                            else {
                                vm.finding.location.formattedAddress = response.results[0].formatted_address;
                                vm.finding.location.latitude = lat;
                                vm.finding.location.longitude = lon;
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

        $scope.finding = vm.finding;
        $scope.finding.location = vm.finding.location;
        $scope.finding.location.city = vm.finding.location.city;
        $scope.finding.location.city.latitude = vm.finding.location.city.latitude;
        $scope.finding.location.latitude = vm.finding.location.latitude;

        $scope.$watch('finding.location.city', function (current, original) {
            if (_.isEqual(current, original) || !current) {
                vm.finding.location = {};
                vm.finding.location.locationName = vm.finding.location.locationName || '';
                vm.finding.location.city = original;
                return;
            }

            // Set the drop down to the city of the location from the selected
            // city from the typeahead textarea.
            //vm.finding.location.city = vm.cities[vm.cities.getIndexBy("name", current.city.name)];

            if (!vm.overrideCityNameChange) {
                $scope.marker.coords.latitude = current.latitude;
                $scope.marker.coords.longitude = current.longitude;

                vm.map.center.latitude = current.latitude;
                vm.map.center.longitude = current.longitude;

                vm.finding.location.latitude = current.latitude;
                vm.finding.location.longitude = current.longitude;

                vm.map.zoom = 12;
            }
            else {
                vm.overrideCityNameChange = true;
            }
        });

        $scope.$watch('finding.location.locationName', function (current, original) {
            if (_.isEqual(current, original) || (!current || (current && current.latitude != undefined && !current.latitude))) {
                return;
            }

            if (!vm.locations.getIndexBy("locationName", current.locationName)) {
                return;
            }

            vm.finding.location = vm.locations[vm.locations.getIndexBy("locationName", current.locationName)];

            // Set the drop down to the city of the location from the selected
            // city from the typeahead textarea.
            vm.finding.location.city = vm.cities[vm.cities.getIndexBy("name", vm.finding.location.city.name)];

            $scope.marker.coords.latitude = vm.finding.location.latitude;
            $scope.marker.coords.longitude = vm.finding.location.longitude;

            vm.map.center.latitude = vm.finding.location.latitude;
            vm.map.center.longitude = vm.finding.location.longitude;
            vm.map.zoom = 12;
        });

        Array.prototype.getIndexBy = function (name, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][name] == value) {
                    return i;
                }
            }
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

        // End region map.

        // Begin region datepicker.

        function datepickerClear() {
            vm.thing.findings[0].date = null;
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