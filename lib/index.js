'use strict';

(function () {
  var isChrome = navigator.userAgent.indexOf('Chrome/') !== -1;

  // Currently polyfill is only for Chrome
  // Once chrome ships CacheQueryOptions, change detection to specific version
  if (!isChrome) return;

  var cacheKeysMethod = Cache.prototype.keys;

  function patchMethod(methodName, handler) {
    var originalMethod = Cache.prototype[methodName];

    var newMethod = function newMethod(request, options) {
      var _this = this;

      // No request, nothing to fix
      if (!request) {
        return originalMethod.call(this);
      }

      // Query Cache
      // If options.ignoreMethod is false and request.method is neither "GET" nor "HEAD", then:
      // return ...
      if (request instanceof Request && request.method !== 'GET' && request.method !== 'HEAD' && (!options || options.ignoreMethod !== true)) {
        var result = undefined;

        switch (methodName) {
          case 'delete':
            result = false;break;
          case 'matchAll':
          case 'keys':
            result = [];break;
          // By default is `undefined`
          // case 'match': result = void 0; break;
        }

        return Promise.resolve(result);
      }

      // No special options, nothing to fix
      if ((!options || options.ignoreSearch !== true) && !(isChrome && methodName === 'keys')

      // Chrome has ignoreMethod = true by default
      // and this polyfill is mostly for it
      // 'ignoreMethod' in options
      ) {
          // delete options.ignoreSearch;
          return originalMethod.call(this, request, options);
        }

      options || (options = {});

      var boundMethod = function boundMethod(request, options) {
        return originalMethod.call(_this, request, options);
      };

      var requestURL = new URL(typeof request === 'string' ? request : request.url, new URL(registration.scope).origin);

      // Get all requests in Cache, with original keys() method
      return cacheKeysMethod.call(this).then(function (keys) {
        // Filter with specified options
        keys = keys.filter(function (cached) {
          return matchUrls(requestURL, cached, options);
        });

        // Exec final handler for fixed method
        return handler(keys, boundMethod);
      });
    };

    Object.defineProperty(Cache.prototype, methodName, {
      value: newMethod,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }

  function matchUrls(url, cachedRequest, options) {
    var cachedUrl = new URL(cachedRequest.url);

    if (url.origin !== cachedUrl.origin || url.pathname !== cachedUrl.pathname || options.ignoreSearch !== true && url.search !== cachedUrl.search) {
      return false;
    }

    return true;
  }

  patchMethod('match', function (keys, original) {
    return keys.length ? original(keys[0]) : Promise.resolve();
  });

  patchMethod('matchAll', function (keys, original) {
    var result = keys.map(function (request) {
      return original(request);
    });

    return Promise.all(result).then(function (results) {
      return results.map(function (arr) {
        // Use only first item of matchAll() since it doesn't support
        // matching with ignoreSarch and ignoreVary anyway
        return arr[0];
      });
    });
  });

  patchMethod('delete', function (keys, original) {
    var result = keys.map(function (request) {
      return original(request);
    });

    return Promise.all(result).then(function (deleted) {
      for (var i = 0, len = deleted.length; i < len; i++) {
        if (deleted[i]) return true;
      }

      return false;
    });
  });

  patchMethod('keys', function (keys, original) {
    return Promise.all(keys);
  });

  var originalStorageMatch = CacheStorage.prototype.match;

  Object.defineProperty(CacheStorage.prototype, 'match', {
    value: function match(request, options) {
      var _this2 = this;

      if (!request || !options || !('ignoreMethod' in options || options.ignoreSearch === true)) {
        return originalStorageMatch.call(this, request, options);
      }

      // Manual match in Cache with fixed method
      if (options.cacheName) {
        return this.open(options.cacheName).then(function (cache) {
          return cache.match(request, options);
        });
      }

      this.keys().then(function (keys) {
        var result = Promise.resolve();
        var cursor = -1;

        var step = function step() {
          cursor++;

          return result.then(function (val) {
            if (typeof val !== 'undefined' || cursor >= keys.length) {
              return val;
            }

            return _this2.open(keys[cursor]).then(function (cache) {
              return cache.match(request, options);
            }).then(step);
          });
        };

        return keys.length ? step() : result;
      });
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
})();