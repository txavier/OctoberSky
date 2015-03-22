// http://stackoverflow.com/questions/14070285/how-to-implement-history-back-in-angular-js
// http://jsfiddle.net/asgoth/WaRKv/
angular
    .module('shared.directives')
    .directive('backButton', backButton);

function backButton() {
    var directive = {
        restrict: 'E',
        template: "<input type='submit' value='Back' class='btn btn-primary pull-right' />",
        scope: {
            back: '@back',
        },
        link: link
    };

    return directive;

    function link(scope, element, attrs) {
        $(element[0]).on('click', function () {
            history.back();
            scope.$apply();
        });
    }
}