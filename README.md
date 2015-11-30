
# Overview 

This is a very simple project to apprehend Ionic. The grunt build is very close to the one in [learning-angular](http://github.com/jdat82/learning-angular).

To try it, just clone or download the project from github, then `npm start`.

What this command does for you is :

- Install node dependencies: `npm install`
- Install javascript dependencies: `bower install`
- Build the project and launch a web server: `grunt serve --lab`

In order to test in a simulator/emulator or even a device, you will need to install everything needed by cordova and ionic (sdk, emulators, etc.) and hit `source install-platforms.sh` which will install ios, android and browser platforms. Crosswalk is used as the default
android browser. 

You can use ionic command line tools normally.

This project uses Grunt as a task manager. Grunt tasks are lazy-loaded for performance.

This project tries to respect [guidelines from the Angular team](https://github.com/johnpapa/angular-styleguide). 

# Build

Project is built inside `www`.

Just hit `grunt dev` to build the whole project for development.

To reduce build time, you can use `grunt` or `grunt newdev` to build only what changed since last build. 

`grunt dist` will build with distribution options although this is not that relevant for this project ;)

# Web server

To launch a local web server and watch for changes: `grunt serve`. 
You may pass a `--lab` option as it will delegate to `ionic serve` internally. 

# Tests

To launch unit tests in one shot: `npm test`.

## Unit tests

To launch unit tests : `grunt test`.

To launch unit tests and watch for changes : `grunt wtest`.

Unit tests are run by Karma and written with Jasmine: 

- JUnit reports are generated inside `doc/test/junit`
- Coverage reports are generated with Istanbul inside `doc/test/coverage`

# Documentation

To generate groc and plato documentation inside `doc` folder: `grunt doc`.
 
# Prerequisite

Cordova, Ionic, Bower and Grunt should be installed globally, they will delegate to a local instance if any :
```bash
npm i -g cordova ionic bower grunt-cli
```

iOS deployment tools should also be installed globally as recommended by Ionic for practical reasons too :
```bash
npm i -g ios-sim ios-deploy
```

XCode should be installed from Mac App Store and launched at least once.

Android Studio and sdk should be installed. Android tools should be in path. 
You may install and configure emulator images if you want to run this project in an emulator.

JDK 7 (or more recent) should be installed.

This project should work on all versions of node since 0.12.7. I recommend NVM for simple and powerful node management. 