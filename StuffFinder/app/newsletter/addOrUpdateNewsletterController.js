(function () {
    'use strict';

    app.controller('addOrUpdateNewsletterController', addOrUpdateNewsletterController);

    addOrUpdateNewsletterController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService', 'authService'];

    function addOrUpdateNewsletterController($scope, $log, $routeParams, $location, dataService, authService) {
        var vm = this;

        vm.newsletters = [];
        vm.newsletter = { newsletterId: 0, messageBody: '' };
        vm.addOrUpdateNewsletter = addOrUpdateNewsletter;
        vm.send = send;

        activate();

        function activate() {
            getNewsletter($routeParams.newsletterId);

            return vm;
        }

        function getNewsletter(newsletterId) {
            if (!newsletterId) {
                return;
            }
            return dataService.getNewsletter(newsletterId).then(function (data) {
                vm.newsletter = data;

                return vm.newsletter;
            });
        }

        function addOrUpdateNewsletter(newsletter) {
            newsletter.userName = authService.authentication.userName;
            newsletter.dateCreated = new Date();

            return dataService.addOrUpdateNewsletter(newsletter)
                .then(function () {
                    $location.path('/newsletters');
                });
        }

        function send(newsletter) {
            if (newsletter.newsletterId == 0) {
                addOrUpdateNewsletter(newsletter).then(sendNewsletter);
            }
            else
            {
                sendNewsletter();
            }


            function sendNewsletter() {
                return dataService.sendNewsletter(newsletter).then(function () {
                    $location.path('/newsletters');
                });
            }
        }

    }

})();