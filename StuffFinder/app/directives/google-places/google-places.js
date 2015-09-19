app.directive('googleplace', googleplace);

googleplace.$inject = ['uiGmapGoogleMapApi'];

function googleplace(uiGmapGoogleMapApi) {
    var directive = {
        require: 'ngModel',
        link: link
    };

    return directive;

    function link(scope, element, attrs, model) {
        var options = {
            types: [],
            componentRestrictions: {}
        };

        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function (maps) {
            scope.gPlace = new maps.places.Autocomplete(element[0], options);

            maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    model.$setViewValue(element.val());
                });
            });
        });
    }
}
