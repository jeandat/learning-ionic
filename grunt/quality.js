'use strict';

var extend = require('node.extend');

var jshintFiles = [{
    src: ['grunt/*.js', '<%= tmp %>/**/*.js', 'test/unit/**/*.js']
}];

module.exports = function (grunt) {
    return {
        tasks: {

            // Lint js files (semantics)
            jshint: {
                options: extend(grunt.file.readJSON('.jshintrc'), {
                    reporter: require('jshint-stylish')
                }),
                dev: {
                    options: {
                        debug: true,     // true: Allow debugger statements e.g. browser breakpoints.
                        devel: true      // Development/debugging (alert, confirm, etc)
                    },
                    files: jshintFiles
                },
                dist: {
                    files: jshintFiles
                }
            },

            // Lint js files (style)
            jscs: {
                options: {
                    config: '.jscsrc',
                    reporter: require('jscs-stylish').path
                },
                build: {
                    src: ['grunt/*.js', '<%= tmp %>/**/*.js', '!<%= tmp %>/**/*.spec.js']
                }
            }
        }
    };
};