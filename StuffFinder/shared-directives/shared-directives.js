angular
    .module('shared.directives', [
        'ngRoute',
        'ngResource',
        'ui.bootstrap'
    ]);

angular
    .module('shared.directives')
    .config(config);

function config($routeProvider, $locationProvider) {
}