http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
angular
    .module('shared.directives')
    .directive('ngEnter', ngEnter);

function ngEnter() {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}