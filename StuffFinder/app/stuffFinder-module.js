﻿var app = angular.module('stuffFinderModule', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

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

    $routeProvider.otherwise({ redirectTo: "/start" });
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});