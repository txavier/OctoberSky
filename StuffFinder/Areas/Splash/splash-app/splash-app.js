
var app = angular
    .module('splash-app', [
        'ngRoute',
        'ngResource',
        'ui.bootstrap',
        'shared.directives',
        'angularVideoBg'
    ]);

app.config(config);

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/index', {
            templateUrl: 'Areas/Splash/index.html',
            controller: 'indexController',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
}

app.filter('escape', function () {
    return window.encodeURIComponent;
});