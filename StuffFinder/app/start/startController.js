(function () {
    'use strict';

    app.controller('startController', startController);

    startController.$inject = ['$scope', '$location', '$log', '$timeout', '$routeParams', 'authService', 'dataService', 'ngToast'];

    function startController($scope, $location, $log, $timeout, $routeParams, authService, dataService, ngToast) {

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

        activate();

        function activate() {
            getMostMe2Things();
            //getJumbotronVideoUrlSetting();
            playJumbotronVideo();

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
                ngToast.create('Sorry you have to be logged in to do this.');

                return;
            }

            ngToast.create('You want it? You got it.  An email will be sent to you when this item is found in your city!');

            return me2Service.me2(thingId).then(function (data) {
                searchThings(vm.searchCriteria);
            });
        }

        function getMostMe2Things() {
            return dataService.getMostMe2Things().then(function (data) {
                vm.things = data;

                return vm.things;
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

        function upVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.upVote(vote).then(function (data) {
                getMostMe2Things();
            });
        }

        function downVote(thing) {
            var vote = {};

            vote.userName = authService.authentication.userName;
            vote.thingId = thing.thingId;

            return dataService.downVote(vote).then(function (data) {
                getMostMe2Things();
            });
        }
    }

})();