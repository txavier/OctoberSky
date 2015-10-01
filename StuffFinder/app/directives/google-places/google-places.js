// https://gist.github.com/VictorBjelkholm/6687484

app.directive('googleplace', googleplace);

googleplace.$inject = ['uiGmapGoogleMapApi'];

function googleplace(uiGmapGoogleMapApi) {
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };
    var mapping = {
        street_number: 'number',
        route: 'street',
        locality: 'city',
        administrative_area_level_1: 'state',
        country: 'country',
        postal_code: 'zip'
    };

    var directive = {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?',
            options: '=?'
        },
        link: link
    };

    return directive;

    function link(scope, element, attrs, model) {
        var _options = scope.options ? scope.options : {
            types: [],
            componentRestrictions: {}
        };

        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function (maps) {
            scope.gPlace = new maps.places.Autocomplete(element[0], _options);

            maps.event.addListener(scope.gPlace, 'place_changed', function () {
                var place = scope.gPlace.getPlace();
                var details = place.geometry && place.geometry.location ? {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                } : {};
                // Get each component of the address from the place details
                // and fill the corresponding field on the form.
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        details[mapping[addressType]] = val;
                    }
                }
                details.formatted = place.formatted_address;
                details.placeId = place.place_id;
                scope.$apply(function () {
                    scope.details = scope.gPlace.getPlace();
                    model.$setViewValue(element.val());
                });
            });
        });
    }
}
