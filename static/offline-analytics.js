importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.googleAnalytics.initialize({
  parameterOverrides: {
    cd4: 'offline',
  },
});
