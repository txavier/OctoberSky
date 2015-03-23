var app = angular.module('stuffFinderModule', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar',
    'ngResource', 'ui.bootstrap', 'ngDroplet', 'uiGmapgoogle-maps', 'textAngular', 'shared.directives']);

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
        templateUrl: "/app/templates/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/templates/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/templates/associate.html"
    });

    $routeProvider.when("/index", {
        controller: 'indexController',
        templateUrl: '/index.html'
    });

    $routeProvider.when("/admin", {
        controller: 'adminController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/admin.html'
    });

    $routeProvider.when("/search", {
        controller: 'searchController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/search.html'
    });

    $routeProvider.when("/search/all/:query", {
        controller: 'searchController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/search.html'
    });

    $routeProvider.when("/search/:cityName", {
        controller: 'searchController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/search.html'
    });

    $routeProvider.when("/search/:cityName/:query", {
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

    $routeProvider.when('/categories', {
        controller: 'categoriesController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/categories.html'
    });

    $routeProvider.when('/category/add', {
        controller: 'addOrUpdateCategoryController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-category.html'
    });

    $routeProvider.when('/category/update/:categoryId', {
        controller: 'addOrUpdateCategoryController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-category.html'
    });

    $routeProvider.when('/cities', {
        controller: 'citiesController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/cities.html'
    });

    $routeProvider.when('/city/add', {
        controller: 'addOrUpdateCityController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-city.html'
    });

    $routeProvider.when('/city/update/:cityId', {
        controller: 'addOrUpdateCityController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-city.html'
    });

    $routeProvider.when('/locations', {
        controller: 'locationsController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/locations.html'
    });

    $routeProvider.when('/location/add', {
        controller: 'addOrUpdateLocationController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-location.html'
    });

    $routeProvider.when('/location/update/:locationId', {
        controller: 'addOrUpdateLocationController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-location.html'
    });

    $routeProvider.when('/nationalities', {
        controller: 'nationalitiesController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/nationalities.html'
    });

    $routeProvider.when('/nationality/add', {
        controller: 'addOrUpdateNationalityController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-nationality.html'
    });

    $routeProvider.when('/nationality/update/:nationalityId', {
        controller: 'addOrUpdateNationalityController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-nationality.html'
    });

    $routeProvider.when('/users', {
        controller: 'usersController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/users.html'
    });

    $routeProvider.when('/user/add', {
        controller: 'addOrUpdateUserController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-user.html'
    });

    $routeProvider.when('/user/update/:userId', {
        controller: 'addOrUpdateUserController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-user.html'
    });

    $routeProvider.when('/newsletters', {
        controller: 'newslettersController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/newsletters.html'
    });

    $routeProvider.when('/newsletter/add', {
        controller: 'addOrUpdateNewsletterController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-newsletter.html'
    });

    $routeProvider.when('/newsletter/update/:newsletterId', {
        controller: 'addOrUpdateNewsletterController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-newsletter.html'
    });

    $routeProvider.when('/how-it-works', {
        templateUrl: '/app/templates/how-it-works.html'
    });

    $routeProvider.when('/city-notifications', {
        controller: 'cityNotificationsController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/city-notifications.html'
    });

    $routeProvider.when('/city-notification/add', {
        controller: 'addOrUpdateCityNotificationController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-city-notification.html'
    });

    $routeProvider.when('/city-notification/update/:cityNotificationId', {
        controller: 'addOrUpdateCityNotificationController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-city-notification.html'
    });

    $routeProvider.when('/nationality-notifications', {
        controller: 'nationalityNotificationsController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/nationality-notifications.html'
    });

    $routeProvider.when('/nationality-notification/add', {
        controller: 'addOrUpdateNationalityNotificationController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-nationality-notification.html'
    });

    $routeProvider.when('/nationality-notification/update/:nationalityNotificationId', {
        controller: 'addOrUpdateNationalityNotificationController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/add-or-update-nationality-notification.html'
    });

    $routeProvider.when('/feedback', {
        controller: 'feedbackController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/feedback.html'
    });

    $routeProvider.when('/user-profile', {
        controller: 'userProfileController',
        controllerAs: 'vm',
        templateUrl: '/app/templates/user-profile.html'
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
    clientId: 'ngAuthApp'
        //'StuffFinder'
        //'1540766432878939'
    //915674078507-ersdkqkfl2nah49s5ier2drnlstajqov.apps.googleusercontent.com'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.filter('escape', function () {
    return window.encodeURIComponent;
});