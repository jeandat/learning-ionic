This folder contains environment key/values loaded by Grunt when starting.

They are used in the `replace` process which is done on all source files. It is not specific to javascript. They can be used in any file.

The default is to have two files, one for dev and the other for production.

You can specify the file to use like this (filename without extension) :

```bash
grunt dist --patterns dist
```

If you don't specify a file, the default is to use `dev.js` for `dev` task and `dist.js` for `dist` task.

So the previous command line is equivalent to :

```bash
grunt dist
```

You can insert patterns in any file by prefixing a pattern with `@@` like this :

```javascript
$compileProvider.debugInfoEnabled('@@env' === 'dev');
```

