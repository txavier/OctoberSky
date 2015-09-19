(function () {
    'use strict';

    app.controller('startController', startController);

    startController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService', 'toaster'];

    function startController($scope, $location, $log, $timeout, $routeParams, authService, dataService, toaster) {

        var vm = this;

        vm.things = [];
        vm.query = $routeParams.query;
        vm.jumbotronVideoUrlSetting = {};
        vm.dataProperty = '';
        vm.upVote = upVote;
        vm.downVote = downVote;
        vm.redBoxShadow = '0 0 1em rgb(148,62,15)';
        vm.redFont = 'rgb(148,62,15)';
        vm.greenBoxShadow = '0 0 1em rgb(57,118,40)';
        vm.greenFont = 'rgb(57,118,40)';
        vm.loggedInUser = {};
        vm.itemsPerPage = 10

        activate();

        function activate() {
            getMostMe2Things(vm.itemsPerPage);

            if (authService.authentication.userName) {
                getLoggedInUser();
            }

            return vm;
        }

        function getLoggedInUser() {
            return dataService.getLoggedInUser().then(function (data) {
                vm.loggedInUser = data;
            });
        }

        function me2(thingId) {
            if (!vm.loggedInUser) {
                toaster.pop('error', 'Uh oh', 'Sorry you have to be logged in to do this.');

                return;
            }

            toaster.pop('success', 'Done', 'You want it? You got it.  An email will be sent to you when this item is found in your city!');

            return me2Service.me2(thingId).then(function (data) {
                searchThings(vm.searchCriteria);
            });
        }

        function getMostMe2Things(itemsPerPage) {
            return dataService.getMostMe2Things(itemsPerPage).then(function (data) {
                vm.things = data;

                return vm.things;
            });
        }

        function upVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.upVote(vote).then(function (data) {
                getMostMe2Things(vm.itemsPerPage);
            });
        }

        function downVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.downVote(vote).then(function (data) {
                getMostMe2Things(vm.itemsPerPage);
            });
        }
    }

})();
//# sourceMappingURL=maps/startController.js.map