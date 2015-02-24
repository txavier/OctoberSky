(function () {
    'use strict';

    app.controller('foundItController', foundItController);

    foundItController.$inject = ['$scope', '$log', '$timeout', '$http', '$location', '$routeParams', 'authService', 'dataService'];

    function foundItController($scope, $log, $timeout, $http, $location, $routeParams, authService, dataService) {

        var vm = this;
        
        vm.thing = {};
        vm.thing.description = null;
        vm.thing.findings = [{ location: {}, date: null, price: null, upcCode: null }];
        vm.map = { center: { latitude: 24.416563, longitude: 54.543546 }, zoom: 12 };
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
            getJumbotronVideoUrlSetting();
            setMapMarker();
            getCategories();
            datepickerToggleMin();
            datepickerToggleMax();
            initiateDroplet();
            getThing();

            return vm;
        }

        function getThing() {
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

        function playJumbotronVideo() {
            $(document).ready(function () {
                $(".player").mb_YTPlayer();
            });
        }

        function getJumbotronVideoUrlSetting() {
            return dataService.getJumbotronVideoUrlSetting().then(function (data) {
                vm.jumbotronVideoUrlSetting = data;
                vm.dataProperty = '{ videoURL: \'' + vm.jumbotronVideoUrlSetting.settingValue + '\', containment: \'.video-section\', quality: \'large\', autoPlay: true, mute: true, opacity: 1 }';

                playJumbotronVideo();

                return vm.jumbotronVideoUrlSetting;
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

            vm.thing.findings[0].userName = authService.authentication.userName;

            vm.thing.postedDate = vm.thing.postedDate ? vm.thing.postedDate : new Date();

            dataService.addOrUpdateThing(vm.thing)
                .then(function (data) {
                    vm.interface.setPostData({ id: data.thingId });

                    vm.interface.uploadFiles();

                    $location.path('/start');
                })
                .catch(handleFailure);
        }

        function handleFailure(error) {
            $log.error('Failure notice.' + error.data.message + ": " + error.data.messageDetail);
        }

        // Begin region map.

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

        // End region map.

        // Begin region datepicker.
        
        function datepickerClear () {
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