(function () {
    'use strict';

    app.controller('addOrUpdateNationalityNotificationController', addOrUpdateNationalityNotificationController);

    addOrUpdateNationalityNotificationController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService', 'authService'];

    function addOrUpdateNationalityNotificationController($scope, $log, $routeParams, $location, dataService, authService) {
        var vm = this;

        vm.nationalityNotifications = [];
        vm.nationalityNotification = { nationalityNotificationId: 0, messageBody: '' };
        vm.addOrUpdateNationalityNotification = addOrUpdateNationalityNotification;
        vm.send = send;

        activate();

        function activate() {
            getNationalityNotification($routeParams.nationalityNotificationId);

            return vm;
        }

        function getNationalityNotification(nationalityNotificationId) {
            if (!nationalityNotificationId) {
                return;
            }
            return dataService.getNationalityNotification(nationalityNotificationId).then(function (data) {
                vm.nationalityNotification = data;

                return vm.nationalityNotification;
            });
        }

        function addOrUpdateNationalityNotification(nationalityNotification) {
            nationalityNotification.userName = authService.authentication.userName;
            nationalityNotification.dateCreated = new Date();

            return dataService.addOrUpdateNationalityNotification(nationalityNotification)
                .then(function () {
                    $location.path('/nationalityNotifications');
                });
        }

        function send(nationalityNotification) {
            if (nationalityNotification.nationalityNotificationId == 0) {
                addOrUpdateNationalityNotification(nationalityNotification).then(sendNationalityNotification);
            }
            else
            {
                sendNationalityNotification();
            }


            function sendNationalityNotification() {
                return dataService.sendNationalityNotification(nationalityNotification).then(function () {
                    $location.path('/nationalityNotifications');
                });
            }
        }

    }

})();