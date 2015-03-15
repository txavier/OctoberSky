(function () {
    'use strict';

    app.controller('addOrUpdateNationalityNotificationController', addOrUpdateNationalityNotificationController);

    addOrUpdateNationalityNotificationController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService', 'authService'];

    function addOrUpdateNationalityNotificationController($scope, $log, $routeParams, $location, dataService, authService) {
        var vm = this;

        vm.nationalityNotifications = [];
        //vm.nationalityNotification = { nationalityNotificationId: 0, messageBody: '' };
        vm.nationalityNotification = {};
        vm.nationalityNotification.nationalityNotificationId = 0;
        vm.nationalityNotification.messageBody = '';
        vm.addOrUpdateNationalityNotification = addOrUpdateNationalityNotification;
        vm.send = send;
        vm.nationalities = [];

        activate();

        function activate() {
            setView($routeParams.nationalityNotificationId);

            return vm;
        }

        function getNationalities() {
            return dataService.getNationalities().then(function (data) {
                vm.nationalities = data;

                return vm.nationalities;
            });
        }

        function getNationalityNotification(nationalityNotificationId) {
            //if (!nationalityNotificationId) {
            //    return;
            //}
            return dataService.getNationalityNotification(nationalityNotificationId).then(function (data) {
                vm.nationalityNotification = data;

                return vm.nationalityNotification;
            });
        }

        function setView(nationalityNotificationId) {
            if (!nationalityNotificationId) {
                getNationalities();

                return;
            }
            getNationalityNotification(nationalityNotificationId).then(function (data) {
                getNationalities().then(function () {
                    vm.nationalityNotification.nationality = vm.nationalities[vm.nationalities.getIndexBy("name", vm.nationalityNotification.nationality.name)];
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

        function addOrUpdateNationalityNotification(nationalityNotification, isGoBack) {
            nationalityNotification.userName = authService.authentication.userName;
            nationalityNotification.dateCreated = new Date();

            return dataService.addOrUpdateNationalityNotification(nationalityNotification)
                .then(function (data) {
                    vm.nationalityNotification = data;

                    if (isGoBack || true) {
                        $scope.$apply();

                        history.back();
                    }

                    return vm.nationalityNotification;
                });
        }

        function send(nationalityNotification) {
            if (nationalityNotification.nationalityNotificationId == 0) {
                addOrUpdateNationalityNotification(nationalityNotification).then(sendNationalityNotification);
            }
            else {
                sendNationalityNotification(nationalityNotification);
            }

            function sendNationalityNotification(nationalityNotification) {
                return dataService.sendNationalityNotification(nationalityNotification).then(function () {
                    $scope.$apply();

                    history.back();
                });
            }
        }

    }

})();