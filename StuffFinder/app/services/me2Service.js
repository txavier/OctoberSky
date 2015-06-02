(function () {
    'use strict';

    app.factory('me2Service', me2Service);

    me2Service.$inject = ['authService', 'dataService'];

    function me2Service(authService, dataService) {

        var service = {
            me2: me2
        };

        return service;

        function me2(thingId) {
            var me2 = {};

            me2.thingId = thingId;
            me2.userName = authService.authentication.userName;
            me2.date = new Date();

            return dataService.addOrUpdateMe2(me2).then(function (me2Sum) {
                return me2Sum;
            });
        }

        function me2(thing) {
            return dataService.addOrUpdateThing(thing).then(function (data) {
                return me2(data.thingId).then(function (data2) {
                    return data2;
                });
            });
        }

    }
})();