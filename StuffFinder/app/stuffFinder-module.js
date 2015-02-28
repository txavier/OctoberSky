var app = angular.module('stuffFinderModule', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngResource', 'ui.bootstrap', 'ngDroplet', 'uiGmapgoogle-maps']);

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

    $routeProvider.when("/thing/:thingId", {
        controller: "thingController",
        controllerAs: 'vm',
        templateUrl: "/app/templates/thing.html"
    });

    $routeProvider.when("/start", {
        controller: "startController",
        controllerAs: 'vm',
        templateUrl: "/app/templates/start.html"
    });

    $routeProvider.when("/found-thing-and-location", {
        controller: "foundThingAndLocationController",
        controllerAs: 'vm',
        templateUrl: "/app/templates/found-thing-and-location.html"
    });

    $routeProvider.when("/found-it/:thingId", {
        controller: "foundItController",
        controllerAs: 'vm',
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

    $routeProvider.when("/search", {
        controller: 'searchController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/search.html'
    });

    $routeProvider.when("/search/:query", {
        controller: 'searchController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/search.html'
    });

    $routeProvider.when('/where-is-it', {
        controller: 'whereIsItController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/where-is-it.html'
    });

    $routeProvider.when('/dashboard-email-settings', {
        controller: 'dashboardEmailSettingsController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/dashboard-email-settings.html'
    });

    $routeProvider.when('/jumbotron-youtube-video-settings', {
        controller: 'jumbotronYoutubeVideoSettingsController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/jumbotron-youtube-video-settings.html'
    });

    $routeProvider.when('/thing/edit/:thingId', {
        controller: 'editThingController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/edit-thing.html'
    });

    $routeProvider.when('/finding/edit/:findingId', {
        controller: 'editFindingController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/edit-finding.html'
    });

    $routeProvider.when('/finding/add/:thingId', {
        controller: 'addFindingController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-finding.html'
    });

    $routeProvider.otherwise({ redirectTo: "/index" });
});

app.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBPUGy5syJHUaDeR_E_FTwgOO4Th8vm63Y',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});

var serviceBase = '';

app.run(['dataService', function (dataService) {
    dataService.getServerUrl().then(function (resource) {
        serviceBase = resource.authenticationServerUrl;
    });
}])

app.run(['dataService', function activateFaceBook() {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1540766432878939',
            xfbml: true,
            version: 'v2.2'
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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