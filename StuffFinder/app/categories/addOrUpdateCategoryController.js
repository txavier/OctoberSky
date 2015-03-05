(function () {
    'use strict';

    app.controller('addOrUpdateCategoryController', addOrUpdateCategoryController);

    addOrUpdateCategoryController.$inject = ['$scope', '$log', '$routeParams', '$location', 'dataService'];

    function addOrUpdateCategoryController($scope, $log, $routeParams, $location, dataService) {
        var vm = this;

        vm.categories = [];
        vm.category = {};
        vm.addOrUpdateCategory = addOrUpdateCategory;

        activate();

        function activate() {
            getCategory($routeParams.categoryId);

            return vm;
        }

        function getCategory(categoryId) {
            if (!categoryId) {
                return;
            }
            return dataService.getCategory(categoryId).then(function (data) {
                vm.category = data;

                return vm.category;
            });
        }

        function addOrUpdateCategory(category) {
            return dataService.addOrUpdateCategory(category)
                .then(function(){
                    $location.path('/categories');
                });
        }

    }

})();