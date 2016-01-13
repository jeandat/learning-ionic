module.exports = function (grunt) {

    // Utility function
    global.stringify = function (object) {
        return JSON.stringify(object, null, '    ');
    };

    // Load grunt tasks on demand
    require('jit-grunt')(grunt, {
        sass_compile_imports: 'grunt-sass-compile-imports'
    });

    // Will print the time taken by each task at the end of the process
    require('time-grunt')(grunt);


    // Current task name
    var taskName = grunt.cli.tasks && grunt.cli.tasks[0] || 'default';


    // Load patterns file in conf/ folder.
    // You can choose which conf file will be loaded from `conf/`  folder with option `patterns`.
    // Example: `grunt --patterns dist` will load `conf/dist.js`
    // Default value is `dev`.
    var patternsFileName = grunt.option('patterns');
    // If not provided...
    if (!patternsFileName) {
        // ... shorcut to use the dev file for default task, and dist file for the dist one.
        // So, writing `grunt dist` is equivalent to `grunt dist --patterns dist`
        patternsFileName = taskName === 'dist' ? 'dist' : 'dev';
    }
    grunt.verbose.writeln('Will use patterns inside file conf/' + patternsFileName + '.js');
    var patterns = require('./conf/' + patternsFileName + '.js');
    grunt.verbose.writeln('Patterns: ' + stringify(patterns));


    var options = {
        config: {
            src: "grunt/*.js"
        },
        src: 'app',
        tmp: '.tmp',
        pub: 'www',
        patterns: patterns
    };

    // Loads the various task configuration files
    var configs = require('load-grunt-configs')(grunt, options);

    grunt.initConfig(configs);

    // Register task aliases from aliases.yaml.
    grunt.verbose.writeln('Loading aliases…');
    yaml = require('js-yaml');
    fs = require('fs');
    var _ = require('lodash');
    var aliases = yaml.safeLoad(fs.readFileSync('grunt/aliases.yaml', 'utf8'));
    grunt.verbose.writeln('Aliases: ' + stringify(aliases) + '\n');
    _.forEach(aliases, function (value, key) {
        grunt.verbose.writeln('Registered task ' + key + ': ' + value + '\n');
        grunt.registerTask(key, value);
    });
};