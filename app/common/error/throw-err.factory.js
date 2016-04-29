(function(){
    'use strict';

    angular
        .module('app')
        .factory('throwErr', factory);

    /////////

    // Dumb function that take an error and throw it.
    // Can be used in conjunction with a catch block for instance when the only think you want to do
    // is throw whatever comes in.
    function factory(){
        return function throwErr(err){
            throw err;
        };
    }

})();
