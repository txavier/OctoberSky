(function () {
    app.controller('addOrUpdateUserController', addOrUpdateUserController);

    addOrUpdateUserController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateUserController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.users = [];
        vm.user = {};
        vm.user.cityId = null;
        vm.user.nationalityId = null;
        vm.user.nationality = {};
        vm.user.city = {};
        vm.user.city.name = null;
        vm.addOrUpdateUser = addOrUpdateUser;
        vm.nationalities = [];
        vm.cities = [];

        activate();

        function activate() {
            getUser($routeParams.userId);
            getNationalities();
            getCities();

            return vm;
        }

        function getNationalities() {
            return dataService.getNationalities().then(function (data) {
                vm.nationalities = data;

                return vm.nationalities;
            });
        }

        function getCities() {
            return dataService.getCities().then(function (data) {
                vm.cities = data;

                return vm.cities;
            });
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
            user.cityId = user.city ? user.city.cityId : null;
            user.nationalityId = user.nationality ? user.nationality.nationalityId : null;

            return dataService.addOrUpdateUser(user)
                .then(function(){
                    $location.path('/users');
                });
        }

    }

})();