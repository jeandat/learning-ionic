'use strict';

module.exports = function (grunt) {
    return {
        tasks: {

            // Generate a readable and searchable source code
            groc: {
                options: {
                    out: 'doc/groc/'
                },
                src: ['<%= src %>/**/*.js', 'test/unit/**/*.js']
            },

            // Generate statistics about code quality
            plato: {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc')
                },
                files: {
                    dest: 'doc/plato/',
                    src: ['<%= src %>/**/*.js']
                }
            }
        }
    };
};