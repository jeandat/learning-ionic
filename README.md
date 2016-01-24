
# Overview

This is a very simple project to apprehend Ionic. The grunt build is very close to the one in [learning-angular](http://github.com/jdat82/learning-angular).

This mobile app is built upon IONIC and Cordova.

Scope : iOS 8+ / Android 4.4+

To try it, just clone or download the project from github, then `npm start`.

What this command does for you is :

- Install node dependencies
- Install javascript dependencies
- Build the project and launch a web server

In order to test in a simulator/emulator or even a device, you will need to install everything needed by cordova and ionic (sdk, emulators, etc.) and hit `source install-platforms.sh` which will install ios, android and browser platforms. Crosswalk is used as the default android browser.

You can use ionic command line tools normally.

During development, you can always restore platforms and plugins with this command:
```bash
ionic state restore [--plugins] [--platforms]
```

# Conventions

## Task builder

This project uses Grunt as a task manager. Grunt tasks are lazy-loaded for performance.
Tasks are defined inside `grunt` folder. There is one file per type of task. For instance, `css.js` contains css related tasks.
It allows to have all related tasks in one file without having a too big file. I found it to be a good compromise between a one-file-per-task and and a one-big-monolithic-file strategies.

## Javascript

### General

This project is using jshint and jscs to valide both form and content.

### Angular

This project tries to respect [guidelines from Angular team](https://github.com/johnpapa/angular-styleguide).

Don't forget to use super easy optimisations like [one-time binding](https://code.angularjs.org/1.4.8/docs/guide/expression) and [track-by expressions](https://code.angularjs.org/1.4.8/docs/api/ng/directive/ngRepeat).

## CSS

### SASS

`_ionic.app.scss` is reserved for ionic customization like when we want to override default colors, or default font sizes, etc.

`_layout.scss` should contain transverse layout definitions.

`app.scss` is our entry point. You probably will never have to modify it. It is responsible to import everything else.

When writing a new scss file for a component you should always prefix it with `_` so we know it is a partial. This is convention in sass world. All partials are automatically imported by `app.scss` when building. See `grunt/css.js`.

### Classes

I always liked css object oriented features but they come with the cost of performance and maintainability.
I would like to try a [BEM custom approach](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) which seems to be a good compromise :
- better performance because there is less levels of imbrication
- better maintainability and readability

# Build

Project is built inside `www`.

Just hit `grunt dev` to build the whole project for development.

To reduce build time, you can use `grunt` or `grunt newdev` to build only what changed since last build.

`grunt dist` will build with distribution options although this is not that relevant for this project ;)

## Options

### --proxy true|fase

Instrument `conf/dev.js`: change API endpoint in order to use a reverse proxy.

### --mock true|false

Instrument `conf/dev.js`: enable ngCordova mocks.

### --patterns <name>

Define which file from `conf/` will be used as source of patterns. These patterns will be used to make replacements in source files. See [grunt-replace](https://github.com/outaTiME/grunt-replace).

For instance : `grunt dev --patterns foo` would use `conf/foo.js`.

# Serving changes

> WARNING: if I'm not mistaken, ionic built-in proxy is not working behind a corporate proxy.
> For myself, I'm working on a local network made with my mobile.

## In your browser

To build, launch a local web server and watch for changes:
```bash
npm run serve
```

You may pass a `--lab` option as it will delegate to `ionic serve` internally:
```bash
npm run serve -- --lab
```

Code is loaded from `http://localhost:8100`.

## On device

To build and deploy on device (or simulator if any):
```bash
npm run <platform>
```

### Without livereload support

Allowed `platform` values:

- android
- ios

Code is loaded from `file://assets/index.html`.

### With livereload support

You may use instead:

- android-lr
- ios-lr

It will also start a watcher for code changes and the built-in ionic web server in livereload mode.

Code is loaded from `http://<your ip>:8100`.

See npm scripts in `package.json` to have better understanding and [IONIC CLI](http://ionicframework.com/docs/cli/test.html).


# Tests

## Unit tests

To launch unit tests : `npm run test` ou `npm test`.

To launch unit tests and watch for changes : `npm run wtest`.

Unit tests are run by Karma and written with Jasmine:

- JUnit reports are generated inside `doc/test/junit`
- Coverage reports are generated with Istanbul inside `doc/test/coverage`

# Documentation

To generate groc and plato documentation inside `doc` folder: `npm run doc`.

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

# Strategies

## Splashscreen

I do not recommend to auto hide the splashscreen. Depending on your device velocity the splashscreen may hide itself before the webview is visible. This is what happens on Android:

1. Black screen (which is your app's background)
1. Show Splashscreen then hide after delay
1. Reveal what is behind, so depending on device, it may be :

- still a black screen
- your webview

Augmenting the delay may be a solution if you didn't set preference `SplashShowOnlyFirstTime` to false. It is not very pretty though.
 
I recommend to either hide the splashscreen yourself when you are ready* (more on that later) or use a very basic native splashscreen (one color) and then a web splashscreen. A web splashscreen allows much more flexibility and creativity but is more expensive.

> Warning: [the plugin splashscreen is broken in version 3.0.0 and 3.1.0](https://issues.apache.org/jira/browse/CB-10412?jql=project%20%3D%20CB%20AND%20status%20in%20(Open%2C%20%22In%20Progress%22%2C%20Reopened)%20AND%20resolution%20%3D%20Unresolved%20AND%20component%20%3D%20%22Plugin%20Splashscreen%22%20AND%20text%20~%20%22hide%22%20ORDER%20BY%20priority%20DESC%2C%20summary%20ASC%2C%20updatedDate%20DESC): you can't hide the splashscreen yourself.

I don't know a cordova way to customize the app's default background, but by modifying the code of each shell and defining a custom background color in adequation with your look it can be even prettier. I don't like modifying native code though. 


# Error handling

## Default generic class

Error codes should be defined in `err.factory.js`. 

`Err` is a class that inherits the built-in `Error` class in order to add a `code` attribute. 
Its message is automatically defined based on its code but it is possible to override that message. You may also give it a cause.

To create a new error, you can do:
```javascript
// Only code
if(condition) throw new Err(100);   
    // if 100 is an an existing error code, its message will be found automatically.
```

## Default angular handler

`$exceptionHandler` was decorated to show an error modal in last resort that allow the customer to restart too.

![Error popup illustration](./img/illustration-error-popup.png)

**Concerning chains of promises, you should follow some rules:**

- the one ending a chain of promises is responsible in case of rejection to throw an exception if pertinent in order to trigger `$exceptionHandler`. Indeed, in `$q` angular implementation, contrary to `Q` there is no `done` function to catch uncaught rejected promises.  

- the one throwing an exception should throw an instance of `Err` with a code at least. 

- In order to buy time and code less, you should reuse `throwErr` injectable function which can transform classics errors to `Err` instances.

```javascript
return countryLanguageService.allCountries().then(function (response) {
	vm.countries = response.data;
}).catch(throwErr); // throwErr is injectable via DI
```

If you want to throw an exception that print a generic error message and not the one associated with your error, you
can wrap your error in a generic error which code is 0. 

```javascript
throw new Err(0, new Err(3000));
```

3000 being the cause of this 0 error.  