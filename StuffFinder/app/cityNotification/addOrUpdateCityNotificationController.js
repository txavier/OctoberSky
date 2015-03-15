(function () {
    'use strict';

    app.controller('addOrUpdateCityNotificationController', addOrUpdateCityNotificationController);

    addOrUpdateCityNotificationController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService', 'authService'];

    function addOrUpdateCityNotificationController($scope, $log, $routeParams, $location, dataService, authService) {
        var vm = this;

        vm.cityNotifications = [];
        vm.cityNotification = { cityNotificationId: 0, messageBody: '' };
        vm.addOrUpdateCityNotification = addOrUpdateCityNotification;
        vm.send = send;
        vm.cities = [];

        activate();

        function activate() {
            setView($routeParams.cityNotificationId);

            return vm;
        }

        function getCities() {
            return dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
        }

        function getCityNotification(cityNotificationId) {
            //if (!cityNotificationId) {
            //    return;
            //}
            return dataService.getCityNotification(cityNotificationId).then(function (data) {
                vm.cityNotification = data;

                return vm.cityNotification;
            });
        }

        function setView(cityNotificationId) {
            if (!cityNotificationId) {
                    getCities();
                    return;
                }
            getCityNotification(cityNotificationId).then(function (data) {
                getCities().then(function () {
                    vm.cityNotification.city = vm.cities[vm.cities.getIndexBy("name", vm.cityNotification.city.name)];
                });
            });
        }

        Array.prototype.getIndexBy = function (name, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][name] == value) {
                    return i;
                }
            }
        }

        function addOrUpdateCityNotification(cityNotification, isGoBack) {
            cityNotification.userName = authService.authentication.userName;
            cityNotification.dateCreated = new Date();

            return dataService.addOrUpdateCityNotification(cityNotification)
                .then(function (data) {
                    vm.cityNotification = data;

                    if (isGoBack || true) {
                        $scope.$apply();

                        history.back();
                    }

                    return vm.cityNotification;
                });
        }

        function send(cityNotification) {
            if (cityNotification.cityNotificationId == 0) {
                addOrUpdateCityNotification(cityNotification).then(sendCityNotification);
            }
            else
            {
                sendCityNotification(cityNotification);
            }

            function sendCityNotification(cityNotification) {
                return dataService.sendCityNotification(cityNotification).then(function () {
                    $scope.$apply();

                    history.back();
                });
            }
        }

    }

})();