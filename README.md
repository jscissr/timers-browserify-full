# timers-browserify-full [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][npm-url]

[![saucelabs][saucelabs-image]][saucelabs-url]

[travis-image]: https://img.shields.io/travis/jscissr/timers-browserify-full.svg?style=flat
[travis-url]: https://travis-ci.org/jscissr/timers-browserify-full
[npm-image]: https://img.shields.io/npm/v/timers-browserify-full.svg?style=flat
[npm-url]: https://npmjs.org/package/timers-browserify-full
[downloads-image]: https://img.shields.io/npm/dm/timers-browserify-full.svg?style=flat
[saucelabs-image]: https://saucelabs.com/browser-matrix/timers-full.svg
[saucelabs-url]: https://saucelabs.com/u/timers-full

This module is based on the original source files of node v0.12.0. This means that it is
as compatible to node as possible, and it also uses linked lists like node. But
it also means that it is quite heavy, and not necessary for most browserify
projects. If you don't heavily use timers, the [timers-browserify](https://www.npmjs.com/package/timers-browserify)
module, which is already integrated in browserify, is probably better suited.

Size: 1.73KB gzipped (4.45KB uncompressed)

## install / usage with browserify

```bash
npm install timers-browserify-full
```

To use it with browserify, you have to use the js API of browserify;
the command line API does not support changing builtins.

Example:

```js
var browserify = require('browserify');

var builtins = require('browserify/lib/builtins.js');
builtins.timers = require.resolve('timers-browserify-full');

var b = browserify();

b.add(...
```

The above example will use timers-browserify-full for all browserify builds.
If you only want it for a specific build of a larger build script:

```js
var browserify = require('browserify');

var builtins = require('browserify/lib/builtins.js');
var myBuiltins = {};
Object.keys(builtins).forEach(function(key) {
  myBuiltins[key] = builtins[key];
});

myBuiltins.timers = require.resolve('timers-browserify-full')

var b = browserify({builtins: myBuiltins});

b.add(...
```

## globals

In node, the functions setTimeout, clearTimeout, setInterval, clearInterval,
setImmediate & clearImmediate are added to the global namespace. I don't
recommend doing this in the browser, because it overrides the native functions.
But you can use the following snippet *inside* your modules — this doesn't touch
the global namespace:


```js
var timers = require('timers');

var setTimeout = timers.setTimeout,
    clearTimeout = timers.clearTimeout,
    setInterval = timers.setInterval,
    clearInterval = timers.clearInterval,
    setImmediate = timers.setImmediate,
    clearImmediate = timers.clearImmediate;
```

## credit

The two main files, timers.js and _linklist.js, are of course based on [joyent/node](https://github.com/joyent/node);
the _linklist.js file is even untouched!

The two scripts in `bin` are borrowed from [feross/buffer](https://github.com/feross/buffer) with modifications.

## license

MIT