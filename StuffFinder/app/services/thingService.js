(function () {
    'use strict';

    app.factory('thingService', thingService);

    thingService.$inject = ['$log'];

    function thingService($log) {

        var _thing = null;

        var service = {
            getThing: getThing,
            setThing: setThing,
            clearThing: clearThing
        };

        return service;

        function getThing() {
            return _thing;
        }

        function setThing(thing) {
            _thing = thing;
        }

        function clearThing() {
            _thing = null;
        }

    }
})();