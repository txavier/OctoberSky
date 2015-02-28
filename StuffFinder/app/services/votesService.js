(function () {
    'use strict';

    app.factory('votesService', votesService);

    votesService.$inject = [];

    function votesService() {

        var service = {
            sumVotes: sumVotes
        };

        return service;

        function sumVotes(votes) {
            var sum = 0;

            // Sum all of the vote values and return them.
            for (var i = 0; i < votes.length; i++) {
                sum += votes[i].value;
            }

            return sum;
        }

    }
})();