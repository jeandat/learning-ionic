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

            // Utility so useful for versioning
            bump: {
                options: {
                    files: ['package.json'],
                    commitFiles: ['package.json'],
                    pushTo: 'origin'
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

