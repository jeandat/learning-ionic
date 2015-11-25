'use strict';

var jadeTemplates = {
    '<%= pub %>/js/templates.js': ['<%= src %>/**/*.jade', '!<%= src %>/index.jade']
};

module.exports.tasks = {

    // Pre process the only template that is converted to pure html (our main entry).
    jade: {
        index: {
            dest: '<%= pub %>/index.html',
            src: '<%= tmp %>/app.jade'
        }
    },

    // Pre process all other jade templates as an angular module
    html2js: {
        options: {
            base: '<%= src %>',
            module: 'templates',
            quoteChar: '\'',
            indentString: '    ',
            singleModule: true,
            jade: {
                // This prevents auto expansion of empty arguments
                // e.g. 'div(ui-view)' becomes '<div ui-view></div>'
                //     instead of '<div ui-view='ui-view'></div>'
                doctype: 'html'
            }
        },
        dev: {
            files: jadeTemplates
        },
        dist: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true
                }
            },
            files: jadeTemplates
        }
    },

    // Watcher for jade templates converted to html
    chokidar:{
        htmlTemplate: {
            files: ['<%= src %>/app.jade'],
            tasks:['newer:replace', 'jade:index']
        },
        jsTemplate:{
            files: ['<%= src %>/**/*.jade', '!<%= src %>/app.jade'],
            tasks: ['newer:replace', 'html2js:dev']
        }
    }
};