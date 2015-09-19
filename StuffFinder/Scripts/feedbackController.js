(function () {
    'use strict';

    app.controller('feedbackController', feedbackController);

    feedbackController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService', 'authService'];

    function feedbackController($scope, $log, $routeParams, $location, dataService, authService) {
        var vm = this;

        vm.feedback = {};
        vm.feedback.message = '';
        vm.feedback.name = '';
        vm.feedback.email = '';
        vm.send = send;

        activate();

        function activate() {

            return vm;
        }

        function send(feedback) {
            dataService.sendFeedback(feedback);

            history.back();
        }

    }

})();
//# sourceMappingURL=maps/feedbackController.js.map