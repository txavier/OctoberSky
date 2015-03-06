(function () {
    'use strict';

    app.controller('addOrUpdateNewsletterController', addOrUpdateNewsletterController);

    addOrUpdateNewsletterController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateNewsletterController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.newsletters = [];
        vm.newsletter = {};
        vm.addOrUpdateNewsletter = addOrUpdateNewsletter;

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
            return dataService.addOrUpdateNewsletter(newsletter)
                .then(function () {
                    $location.path('/newsletters');
                });
        }

    }

})();