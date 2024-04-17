'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"manifest.json": "2f343fe10d0c4be09cf05abb79cb6515",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"index.html": "a2db328445ebd70671b21c2d62a81eb9",
"/": "a2db328445ebd70671b21c2d62a81eb9",
"assets/FontManifest.json": "e57b4b0896642d26ea22502b1ebf084c",
"assets/AssetManifest.bin": "aab5608995c7269bcced87035b8eb8d8",
"assets/packages/fefufit_icons/assets/fonts/FefuIcons.ttf": "00cbb747a9fa81eeb571b64f3908c8f0",
"assets/assets/github-mark.svg": "8dcc6b5262f3b6138b1566b357ba89a9",
"assets/AssetManifest.bin.json": "0dd63fbd29027e4ae382a8c411eb620a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/NOTICES": "287634e675da8ded8e28b6d4e6cb8d5c",
"assets/fonts/MaterialIcons-Regular.otf": "a31c70a03961ce35ac38c672c938b079",
"assets/AssetManifest.json": "c5532e842acb5a7daec1d41304b2d0b5",
"main.dart.js": "923be850471b17e746c6950638ed0a11",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"version.json": "ff966ab969ba381b900e61629bfb9789",
"icons/android-icon-144x144.png": "30ac6a1ee7ba57b39b925c70aeeb6dfa",
"icons/apple-icon-144x144.png": "30ac6a1ee7ba57b39b925c70aeeb6dfa",
"icons/favicon.ico": "0de1046c815be36f2d68f3833486dfdd",
"icons/apple-icon-precomposed.png": "6ecc732bbb1d90299a4271f2ac7e4fb7",
"icons/apple-icon-60x60.png": "31138bb98b92bc79286ded5b99737dae",
"icons/ms-icon-144x144.png": "30ac6a1ee7ba57b39b925c70aeeb6dfa",
"icons/apple-icon-120x120.png": "1c4e96fe74f2c956f78a61cc031974f2",
"icons/android-icon-48x48.png": "74b222594906fad205785352e61ac93e",
"icons/favicon-96x96.png": "68cb3209565c26ff60cfee27ea11a081",
"icons/ms-icon-310x310.png": "45606a78a092e1aa7b907b0ba9008b14",
"icons/apple-icon-57x57.png": "b9edf7c3a21ad6a124b9474362c48b8d",
"icons/ms-icon-70x70.png": "b54ed347efa912d3576dc71b9aad9d55",
"icons/apple-icon-152x152.png": "cf572a0191d22b09b3cb1c12eef99a5b",
"icons/apple-icon-72x72.png": "aa0ccc8c67c31c2601cd2a0d2df951e0",
"icons/android-icon-36x36.png": "87ba90a914debf692d634fee0c0ab8fb",
"icons/apple-icon.png": "6ecc732bbb1d90299a4271f2ac7e4fb7",
"icons/apple-icon-180x180.png": "237e6f37e0e9025c122d2b083e7a48b8",
"icons/apple-icon-76x76.png": "638b78c4c12f8fe81a5e5cdcec427013",
"icons/favicon-16x16.png": "d2f4dfc103aa7eeaa3a4ea849b23dbb2",
"icons/android-icon-192x192.png": "cf57fba966cdc2f16cf08fcad39bd010",
"icons/android-icon-96x96.png": "68cb3209565c26ff60cfee27ea11a081",
"icons/favicon-32x32.png": "16dcf696fdcb22268268f837197dbe0d",
"icons/android-icon-72x72.png": "aa0ccc8c67c31c2601cd2a0d2df951e0",
"icons/apple-icon-114x114.png": "b7b1c7747ee058820b6ba0d7dcd0fc63",
"icons/browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"icons/ms-icon-150x150.png": "66bc58df7d5ddd49f46893e7d28e6169"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
