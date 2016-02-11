
# Overview

This is a demo app to apprehend IONIC which is built upon Cordova.

Scope : iOS 8+ / Android 4.4+

Quick readers can do `npm start` in order to :

- Install node dependencies
- Install javascript dependencies
- Build project
- Launch a web server with reverse proxy and livereload
- Open app in default browser

Nonetheless I do not recommend to develop with your browser. It is different than a real device. You should develop on a real device and use the browser solution when it makes sense to make your life simpler for particular cases.

In order to test in a simulator/emulator/device, you will need first to install everything needed by cordova and ionic (sdk, emulators, etc.) and then hit `ionic state restore` in your terminal which will install all cordova platforms and plugins. See prerequisites (next section).

Then you just need to use one of the predefined npm alias. For instance: `npm run android` in order to :

- Build project
- Deploy on a real device if connected or an emulator/simulator as fallback

[Crosswalk](https://www.npmjs.com/package/cordova-plugin-crosswalk-webview) is used as the default android browser, thus allowing us to share the same engine for all platforms. It give us control on that engine. We can update it whenever we want and have always the latest innovations from Chromium. The downside is a 25mb overload to the apk size.

On iOS land, [WkWebView](https://www.npmjs.com/package/cordova-plugin-wkwebview-engine) is not used yet because it is too young.

# Prerequisites

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

This project should work on all versions of node since 0.12.7. I recommend [NVM](https://github.com/creationix/nvm) for simple and powerful node management.

# Conventions

## Build

This project uses [Grunt](http://gruntjs.com/) as a task manager. Grunt tasks are lazy-loaded for performance.
Tasks are defined inside `grunt` folder. There is one file per type of task. For instance, `css.js` contains css related tasks. It allows to have all related tasks in one file without having a too bigger file. I found it to be a good compromise between a one-file-per-task and and a one-big-monolithic-file strategies.

Grunt is used essentially to build web code and start tools.

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

# Run

The file `package.json` contains a list of useful alias that you can invoke with `npm run <alias>`.

## In case you don't know

Ionic comes with some very useful tools. Essentially it allows three differents way to test and deploy your code :

- Start a web server with optional proxy support and then deploy in a browser
  - which means your code is served via a web server loaded from `http://localhost:8100`
- Deploy in a real device (or a simulator/emulator if none)
  - which means your code is copied on device and loaded from a `file://` url
- Deploy in a real device (or a simulator/emulator if none) in livereload mode
  - which means your code is copied once on device and then served via a web server
  - your code is loaded from `http://<ip>:8100` even though your are on a real device

> WARNING: if I'm not mistaken, ionic built-in proxy is not working behind a corporate proxy.
> For myself, I'm working either on wifi or on a local network made with my mobile.


## npm run serve

- Build project with cordova mocks and proxy support
- Serve the app in default browser

You may pass a `--lab` option as it will delegate to `ionic serve` internally:
```bash
npm run serve -- --lab
```

## npm run android

- Build web code
- Build native code 
- Deploy to android device (emulator if none)

## npm run android-lr

- Build web code with proxy support
- Build native code
- Start a watcher for web code
- Start a web server with proxy
- Deploy to android device (emulator if none) with livereload support

## npm run ios

- Build web code 
- Build native code 
- Deploy to ios device (simulator if none)

## npm run ios-lr

- Build web project with proxy support
- Build native code 
- Start a watcher for web code
- Start a web server with proxy
- Deploy to ios device (simulator if none) with livereload support

## npm test

- Build web project with cordova mocks support
- Execute unit tests with karma in a PhantomJS container

## npm run wtest

- Build web project with cordova mocks support
- Start a watcher for web code
- Execute unit tests with karma in a PhantomJS container with auto-watch enabled
  - it means changes to code or tests are taken into account live

## npm run doc

- Generate [groc](https://github.com/nevir/groc) and [plato](https://github.com/es-analysis/plato) documentation.

## npm run build [-- \<platform>]

If you simply want to build code without mocks/proxy/livereload options.

- Build web code
- Build native code

# Build (web code)

## Overview

Project is built inside `www`.

Just hit `grunt dev` to build the whole project for development.

To reduce build time, you can use `grunt` or `grunt newdev` to build only what changed since last build.

`grunt dist` will build with distribution options.

## Options

### --proxy | --no-proxy

Instrument `conf/dev.js`: change API endpoint in order to use a reverse proxy.

### --mock | --no-mock

Instrument `conf/dev.js`: enable ngCordova mocks.

### --patterns \<name>

Define which file from `conf/` will be used as source of patterns. These patterns will be used to make replacements in source files. See [grunt-replace](https://github.com/outaTiME/grunt-replace).

For instance : `grunt dev --patterns foo` would use `conf/foo.js`.

### --platform \<name>

Not used right now but can be useful if you want to instrument a configuration file or a task for a platform.

# Tests

## Unit tests

To launch unit tests : `npm run test` ou `npm test`.

To launch unit tests and watch for changes : `npm run wtest`.

Unit tests are run by Karma and written with Jasmine:

- JUnit reports are generated inside `doc/test/junit`
- Coverage reports are generated with Istanbul inside `doc/test/coverage`

# Documentation

To generate groc and plato documentation inside `doc` folder: `npm run doc`.

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