var keys_original = Cache.prototype.keys;
var match_original = Cache.prototype.match;
var matchAll_original = Cache.prototype.matchAll;
var delete_original = Cache.prototype.delete;

importScripts('../lib/index.js');

var tests = {
  // init
  ignoreSearch_store: function(e) {
    return ignoreSearchPrepare().then(function() {
      return createResponse({});
    });
  },

  // other
  'ignoreSearch_keysRequest:no-polyfill': function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return keys_original.call(cache, '/ignoreSearch');
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },

  // match()
  ignoreSearch_matchIgnoreNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.match('/ignoreSearch', {
        ignoreSearch: true
      });
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_matchNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.match('/ignoreSearch', {
        ignoreSearch: false
      });
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_matchIgnoreWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.match('/ignoreSearch?3', {
        ignoreSearch: true
      });
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_matchWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.match('/ignoreSearch?3', {
        ignoreSearch: false
      });
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_matchIgnoreNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.match('/__noMatch', {
        ignoreSearch: true
      });
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_matchNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.match('/__noMatch', {
        ignoreSearch: false
      });
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },

  // matchAll()
  ignoreSearch_matchAllIgnoreNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.matchAll('/ignoreSearch', {
        ignoreSearch: true
      });
    }).then(function(responses) {
      const result = responses.map(function(response) {
        return (response || createResponse({
          cached: false
        })).json();
      });

      return Promise.all(result).then(function(data) {
        return createResponse(data);
      });
    });
  },
  ignoreSearch_matchAllNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.matchAll('/ignoreSearch', {
        ignoreSearch: false
      });
    }).then(function(responses) {
      const result = responses.map(function(response) {
        return (response || createResponse({
          cached: false
        })).json();
      });

      return Promise.all(result).then(function(data) {
        return createResponse(data);
      });
    });
  },
  ignoreSearch_matchAllIgnoreWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.matchAll('/ignoreSearch?3', {
        ignoreSearch: true
      });
    }).then(function(responses) {
      const result = responses.map(function(response) {
        return (response || createResponse({
          cached: false
        })).json();
      });

      return Promise.all(result).then(function(data) {
        return createResponse(data);
      });
    });
  },
  ignoreSearch_matchAllWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.matchAll('/ignoreSearch?3', {
        ignoreSearch: false
      });
    }).then(function(responses) {
      const result = responses.map(function(response) {
        return (response || createResponse({
          cached: false
        })).json();
      });

      return Promise.all(result).then(function(data) {
        return createResponse(data);
      });
    });
  },
  ignoreSearch_matchAllIgnoreNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.matchAll('/__noMatch', {
        ignoreSearch: true
      });
    }).then(function(responses) {
      const result = responses.map(function(response) {
        return (response || createResponse({
          cached: false
        })).json();
      });

      return Promise.all(result).then(function(data) {
        return createResponse(data);
      });
    });
  },
  ignoreSearch_matchAllNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.matchAll('/__noMatch', {
        ignoreSearch: false
      });
    }).then(function(responses) {
      const result = responses.map(function(response) {
        return (response || createResponse({
          cached: false
        })).json();
      });

      return Promise.all(result).then(function(data) {
        return createResponse(data);
      });
    });
  },

  // keys()
  ignoreSearch_keysRequest: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys('/ignoreSearch');
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_keysNoRequest: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys();
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },

  // keys(request)
  ignoreSearch_keysIgnoreNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys('/ignoreSearch', {
        ignoreSearch: true
      });
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_keysNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys('/ignoreSearch', {
        ignoreSearch: false
      });
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_keysIgnoreWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys('/ignoreSearch?3', {
        ignoreSearch: true
      });
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_keysWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys('/ignoreSearch?3', {
        ignoreSearch: false
      });
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_keysIgnoreNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys('/__noMatch', {
        ignoreSearch: true
      });
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_keysNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return cache.keys('/__noMatch', {
        ignoreSearch: false
      });
    }).then(mapKeys).then(function(data) {
      return createResponse(data);
    });
  },

  // delete()
  ignoreSearch_deleteIgnoreNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return deleteHelper(cache, '/ignoreSearch', {
        ignoreSearch: true
      });
    }).then(function(data) {
      return ignoreSearchPrepare().then(function() {
        return data;
      })
    }).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_deleteNoQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return deleteHelper(cache, '/ignoreSearch', {
        ignoreSearch: false
      });
    }).then(function(data) {
      return ignoreSearchPrepare().then(function() {
        return data;
      })
    }).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_deleteIgnoreWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return deleteHelper(cache, '/ignoreSearch?3', {
        ignoreSearch: true
      });
    }).then(function(data) {
      return ignoreSearchPrepare().then(function() {
        return data;
      })
    }).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_deleteWithQuery: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return deleteHelper(cache, '/ignoreSearch?3', {
        ignoreSearch: false
      });
    }).then(function(data) {
      return ignoreSearchPrepare().then(function() {
        return data;
      })
    }).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_deleteIgnoreNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return deleteHelper(cache, '/__noMatch', {
        ignoreSearch: true
      });
    }).then(function(data) {
      return ignoreSearchPrepare().then(function() {
        return data;
      })
    }).then(function(data) {
      return createResponse(data);
    });
  },
  ignoreSearch_deleteNoMatch: function(e) {
    return caches.open('ignoreSearch').then(function(cache) {
      return deleteHelper(cache, '/__noMatch', {
        ignoreSearch: true
      });
    }).then(function(data) {
      return ignoreSearchPrepare().then(function() {
        return data;
      })
    }).then(function(data) {
      return createResponse(data);
    });
  },

  // CacheStorage.match()
  ignoreSearch_storageMatchIgnoreNoQuery: function(e) {
    return caches.match('/ignoreSearch', {
      cacheName: 'ignoreSearch',
      ignoreSearch: true
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_storageMatchNoQuery: function(e) {
    return caches.match('/ignoreSearch', {
      cacheName: 'ignoreSearch',
      ignoreSearch: false
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_storageMatchIgnoreWithQuery: function(e) {
    return caches.match('/ignoreSearch?3', {
      cacheName: 'ignoreSearch',
      ignoreSearch: true
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_storageMatchWithQuery: function(e) {
    return caches.match('/ignoreSearch?3', {
      cacheName: 'ignoreSearch',
      ignoreSearch: false
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },

  // CacheStorage.match() no cacheName
  ignoreSearch_storageMatchNoCacheIgnoreNoQuery: function(e) {
    return caches.match('/ignoreSearch', {
      ignoreSearch: true
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_storageMatchNoCacheNoQuery: function(e) {
    return caches.match('/ignoreSearch', {
      ignoreSearch: false
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_storageMatchNoCacheIgnoreWithQuery: function(e) {
    return caches.match('/ignoreSearch?3', {
      ignoreSearch: true
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
  ignoreSearch_storageMatchNoCacheWithQuery: function(e) {
    return caches.match('/ignoreSearch?3', {
      ignoreSearch: false
    }).then(function(response) {
      return response || createResponse({
        cached: false
      });
    });
  },
};

function ignoreSearchPrepare() {
  return Promise.all([
    caches.delete('ignoreSearch'),
    caches.delete('ignoreSearchObstacle'),
  ]).then(function() {
    return Promise.all([
      caches.open('ignoreSearch'),
      caches.open('ignoreSearchObstacle')
    ]);
  }).then(function(args) {
    const cache = args[0];
    const obstacleCache = args[1];

    return Promise.all([
      putSeries(cache, [
        ['/__ignoreSearch', createResponse({
          cached: true,
          index: -1
        })],
        ['/ignoreSearch?1', createResponse({
          cached: true,
          index: 1
        })],
        ['/ignoreSearch?2', createResponse({
          cached: true,
          index: 2
        })],
        ['/ignoreSearch?3', createResponse({
          cached: true,
          index: 3
        })],
        ['/ignoreSearch', createResponse({
          cached: true,
          index: 4
        })],
      ]),

      obstacleCache.put('/ignoreSearch?10', createResponse({
        cached: true,
        index: 10,
        obstacle: true
      })),
    ]);
  });
}

function deleteHelper(cache, request, options) {
  const data = {};

  return cache.delete(request, options)
  .then(function(deleted) {
    data.deleted = deleted;
    return keys_original.call(cache);
  })
  .then(mapKeys)
  .then(function(keys) {
    data.keys = keys;
    return data;
  });
}

function mapKeys(keys) {
  return keys.map(function(req) {
    var url = new URL(req.url);
    return url.pathname + url.search;
  });
}

self.addEventListener('install', function(e) {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(e) {
  var activation = caches.keys().then(function(keys) {
    const result = keys.map(function(cacheName) {
      return caches.delete(cacheName);
    });

    return Promise.all(result);
  }).then(function() {
    return self.clients.claim();
  });

  e.waitUntil(activation);
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  var test = url.pathname.match(/^\/tests\/test_([\s\S]+?)$/);
  test = test && tests[test[1]];

  if (test) {
    e.respondWith(test(e));
  }
});

function createResponse(data) {
  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

function putSeries(cache, arr) {
  return arr.reduce(function(prev, args) {
    return prev.then(function() {
      return cache.put.apply(cache, args);
    });
  }, Promise.resolve());
}