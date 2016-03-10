(function () {
    'use strict';

    angular
        .module('app')
        .factory('Err', createClass);

    function createClass($interpolate) {

        var codes = {
            // Messages for common errors: 1xxx
            1000: 'Network unavailable right now',
            1001: 'Your request timed out. Please try again.',
            1002: 'Something went wrong. Please try again.',
            1003: 'Damn, the limit of 3000 requests per day has been reached. Please try again tomorrow.',
            1004: 'Missing argument: {{missing}}'

        };

        // `code` {Number}: mandatory. By convention, all errors should be defined in `codes` above to have a
        // centralized registry of errors in the app.
        // Accepted options:
        // - `message` {String}: override default message configured for this code
        // - `cause` {ANY}: source error
        // - `ui` {Boolean}: if that error rise to $exceptionHandler, should it show it in a toast ?
        // You may add custom attributes for yourself. Indeed, the whole `options` object will be used as context when
        // `message` is interpolated.
        function Err(code, options) {

            this.name = 'Err';

            if (code == null) throw 'You should provide an error code';

            options = options || {};

            // Optional error code.
            // It is not smart to create an Err instance without a code or a message.
            this.code = code;
            // Copy in hash for later.
            options.code = code;

            // Optional raw error
            this.source = options.source;

            // Optional error message
            // It seems the built-in Error constructor can't be called, so we have to set the message ourselves.
            // It is not smart to create an Err instance without a code or a message.
            // If a translation is found in the current i18n bundle, it is used, else, we use a default english one.
            // Codes not present in `defaultTranslations.js` are generally used only for console.xxx calls.
            this.message = options.message || codes[code];
            // Will replace interpolation patterns if any.
            this.message = $interpolate(this.message)(options);

            // If true, message will be used in a toast if it rises up to our $exceptionHandler implementation.
            this.ui = options.ui || false;
        }

        // Err will inherit from Error
        Err.prototype = Object.create(Error.prototype);
        Err.prototype.constructor = Err;

        return Err;
    }

})();

