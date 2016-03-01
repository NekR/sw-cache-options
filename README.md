# ServiceWorker `CacheQueryOptions` polyfill

## Install

#### Webpack/Browserify/Whatever-bundler

```
npm install -i sw-cache-options
```

#### Browser

* Copy `dist/sw-cache-options.js` into your project
* Load it inside ServiceWorker by `importScripts('sw-cache-options.js')`

## Implementation

This is a polyfill for [`CacheQueryOptions`](https://www.w3.org/TR/service-workers/#cache-query-options-dictionary) of ServiceWorker. At a momemnt, Chrome (and its family) doesn't support it natively, so polyfill required. Chrome is sniffed by user agent, exactly this way:
```
const isChrome = navigator.userAgent.indexOf('Chrome/') !== -1
```

* `ignoreSearch` is implemented for all methods which accepts it.
* `ignoreMethod` is implemented for all methods which accepts it.
* `ignoreVary` is **not** implemented. Reason is that it requires getting all responses (`Cache#matchAll()`), which might not be so bad, I do not want to deal with it a moment. Feel free to make a PR for it.

Browsers which support `CacheQueryOptions` nativily: Firefox.

## Tests

Open https://rawgit.com/NekR/sw-cache-options/master/tests/index.html in target browser and open DevTools console, tests' resulsts are logged into it.

Tests can be run againt any browser with ServiceWorker support, since they check general support of `CacheQueryOptions`. However, polyfill is applied only in Chrome-family browsers, so for actuall results test there. To test in other browser:

* Clone repository
* Go to `src/index.js` and comment the line `if (!isChrome) return;`
* Then run in command line `gulp build`
* And startup server in repo directory, like this `http-server -p 7777 -c-1`
* Open `localhost:7777/tests/index.html` and open DevTools console to see results

## License

MIT