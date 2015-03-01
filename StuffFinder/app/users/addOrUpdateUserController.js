(function () {
    app.controller('addOrUpdateUserController', addOrUpdateUserController);

    addOrUpdateUserController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateUserController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.users = [];
        vm.user = {};
        vm.addOrUpdateUser = addOrUpdateUser;

        activate();

        function activate() {
            getUser($routeParams.userId);

            return vm;
        }

        function getUser(userId) {
            if (!userId) {
                return;
            }
            return dataService.getUser(userId).then(function (data) {
                vm.user = data;

                return vm.user;
            });
        }

        function addOrUpdateUser(user) {
            return dataService.addOrUpdateUser(user)
                .then(function(){
                    $location.path('/users');
                });
        }

    }

})();