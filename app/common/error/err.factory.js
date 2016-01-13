(function () {
    'use strict';

    angular
        .module('app')
        .factory('Err', createClass);

    function createClass() {

        var codes = {
            // HTTP errors: xxx
            0: 'Something went wrong obviously…',
            500: 'The server connexion failed, please try again later',

            // Messages for …: 1xxx
            1000: '…'

        };

        // TODO
        // Change contract : use an object as only input.
        // Allows to add dynamic parameters
        // Could be useful for $exceptionHandler to know if an error should be show to a user
        // or if we should use the default message.
        // Could be useful also to forward the whole objet to a translate service as input for parameters.

        // TODO
        // translations should be fetched at runtime when Err instance is created with parameter values.

        // TODO
        // Err messages not translated can't have parameters right now.

        function Err(code, source, message) {

            this.name = 'Err';

            if (code == null) throw 'You should provide an error code';

            // Optional error code.
            // It is not smart to create an Err instance without a code or a message.
            this.code = code;

            // Optional raw error
            this.source = source;

            // Optional error message
            // It seems the built-in Error constructor can't be called, so we have to set the message ourselves.
            // It is not smart to create an Err instance without a code or a message.
            // If a translation is found in the current i18n bundle, it is used, else, we use a default english one.
            // Codes not present in `defaultTranslations.js` are generally used only for console.xxx calls.
            this.message = message || codes[code];
        }

        // Err will inherit from Error
        Err.prototype = Object.create(Error.prototype);
        Err.prototype.constructor = Err;

        return Err;
    }

})();

