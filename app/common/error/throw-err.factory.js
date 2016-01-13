(function() {
    'use strict';

    angular
        .module('app')
        .factory('throwErr', defineDefaultBehaviorOnRejection);

    // Its role is to define a common behavior for others components to reuse when a chain of promise ends with a rejection.
    function defineDefaultBehaviorOnRejection(Err) {

        return function throwErr(err) {

            // if err is already an error instance
            if(err instanceof Error) throw err;

            // if err is a simple string:
            // - 0: for default message
            // - err: become the source error
            if (_.isString(err)) throw new Err(0, err);

            // if err is an angular classical response object from $http:
            // - status: http code become our error code. We may have a predefined message for that code.
            // - statusText: will become the source error
            if (_.has(err, 'status') && _.has(err, 'statusText')) throw new Err(err.status, err.statusText);
        };
    }

})();