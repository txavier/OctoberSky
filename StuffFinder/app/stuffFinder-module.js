var app = angular.module('stuffFinderModule', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngResource', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/templates/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/templates/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/templates/signup.html"
    });

    $routeProvider.when("/things", {
        controller: "thingsController",
        templateUrl: "/app/templates/things.html"
    });

    $routeProvider.when("/start", {
        controller: "startController",
        templateUrl: "/app/templates/start.html"
    });

    $routeProvider.when("/found-it", {
        controller: "foundItController",
        templateUrl: "/app/templates/found-it.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });

    $routeProvider.when("/index", {
        controller: 'indexController',
        templateUrl: '/index.html'
    });

    $routeProvider.when("/admin", {
        controller: 'adminController',
        templateUrl: '/app/templates/admin.html'
    });

    $routeProvider.when('/where-is-it', {
        controller: 'whereIsItController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/where-is-it.html'
    });

    $routeProvider.otherwise({ redirectTo: "/index" });
});

var serviceBase = '';

app.run(['dataService', function (dataService) {
    dataService.getServerUrl().then(function (resource) {
        serviceBase = resource.authenticationServerUrl;
    });
}])

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: '915674078507-ersdkqkfl2nah49s5ier2drnlstajqov.apps.googleusercontent.com'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);