'use strict';
app.factory('tokensManagerService', ['$http','ngAuthSettings', 'dataService', function ($http, ngAuthSettings, dataService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    dataService.getServerUrl().then(function (resource) {
        serviceBase = resource.authenticationServerUrl;
    });
    
    var tokenManagerServiceFactory = {};

    var _getRefreshTokens = function () {

        return $http.get(serviceBase + 'api/refreshtokens').then(function (results) {
            return results;
        });
    };

    var _deleteRefreshTokens = function (tokenid) {

        return $http.delete(serviceBase + 'api/refreshtokens/?tokenid=' + tokenid).then(function (results) {
            return results;
        });
    };

    tokenManagerServiceFactory.deleteRefreshTokens = _deleteRefreshTokens;
    tokenManagerServiceFactory.getRefreshTokens = _getRefreshTokens;

    return tokenManagerServiceFactory;

}]);