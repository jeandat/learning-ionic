'use strict';

module.exports = function (grunt, config) {

    var patterns = config.patterns;

    return {
        tasks: {

            clean: {
                build: {
                    src: ['<%= tmp %>/*', '<%= pub %>/*']
                },
                doc: {
                    src: ['doc/*', '!doc/screens']
                },
                test: {
                    src: ['doc/test']
                }
            },

            // Replace tokens respecting pattern '@@something'.
            replace: {
                build: {
                    options: {
                        patterns: [{
                            json: patterns
                        }]
                    },
                    filter: 'isFile',
                    expand: 'true',
                    cwd: '<%= src %>',
                    src: ['**'],
                    dest: '<%= tmp %>'
                }
            }
        }
    };
};

