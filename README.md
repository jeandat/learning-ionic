
# EXPERIMENTAL - Work in progress

# Overview 

This is a very simple project to apprehend Ionic. The grunt build is very close to the one in [learning-angular](http://github.com/jdat82/learning-angular).

To try it, just clone or download the project from github, then `npm start`.

What this command does for you is :

- Install node dependencies: `npm install`
- Install javascript dependencies: `bower install`
- Install webdriver-manager (used by protractor for end-to-end tests): `node 
node_modules/protractor/bin/webdriver-manager update`
- Build the project and launch a web server: `grunt serve`

This project uses Grunt as a task manager. Grunt tasks are lazy-loaded for performance.

This project tries to respect [guidelines from the Angular team](https://github.com/johnpapa/angular-styleguide#exception-handling). 

# Prerequisite

You should install grunt and bower globally if not done already : `npm i -g grunt-cli bower`.

# Build

Project is built inside `build/public`.

Just hit `grunt dev` to build the whole project for development.

To reduce build time, you can use `grunt` or `grunt newdev` to build only what changed since last build. 

`grunt dist` will build with distribution options although this is not that relevant for this project ;)

# Web server

To launch a local web server : `grunt serve`.

To launch a local web server and watch for changes: `grunt wserve`.

# Tests

To launch unit and e2e tests in one shot: `npm test`.

## Unit tests

To launch unit tests : `grunt test`.

To launch unit tests and watch for changes : `grunt wtest`.

Unit tests are run by Karma and written with Jasmine: 

- JUnit reports are generated inside `doc/test/junit`
- Coverage reports are generated with Istanbul inside `doc/test/coverage`

## E2E tests

To launch e2e tests : `grunt test_e2e`.

E2E tests are run by Protractor and written with Jasmine.

# Documentation

To generate groc and plato documentation inside `doc` folder: `grunt doc`. 