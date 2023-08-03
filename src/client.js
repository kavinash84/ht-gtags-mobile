/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { trigger } from 'redial';
import createBrowserHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { getStoredState } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';
import createStore from 'redux/create';
import apiClient from 'helpers/apiClient';
import routes from 'routes';
import asyncMatchRoutes from 'utils/asyncMatchRoutes';
import { loadState } from 'utils/localStorage';
import { ReduxAsyncConnect, Provider } from 'components';

const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: 30 * 86400
    }
  }),
  stateReconciler(inboundState, originalState) {
    return originalState;
  },
  whitelist: ['app', 'userLogin', 'pincode', 'selectForDemo']
};

const dest = document.getElementById('content');
const client = apiClient();
const providers = { app: {}, restApp: {}, client };

(async () => {
  const preloadedState = await getStoredState(persistConfig);
  const getLocalStorageState = loadState();

  // merge state
  const mergedState = {
    ...preloadedState,
    ...window.__data,
    ...getLocalStorageState
  };

  const history = createBrowserHistory();
  const store = createStore({
    history,
    data: {
      ...mergedState
    },
    helpers: providers,
    persistConfig
  });

  const hydrate = async _routes => {
    const { components, match, params } = await asyncMatchRoutes(_routes, history.location.pathname);
    const triggerLocals = {
      ...providers,
      store,
      match,
      params,
      history,
      location: history.location
    };

    await trigger('fetch', components, triggerLocals);
    await trigger('defer', components, triggerLocals);
    trigger('done', components, triggerLocals);

    ReactDOM.hydrate(
      <HotEnabler>
        <Provider store={store} {...providers}>
          <ConnectedRouter history={history}>
            <ReduxAsyncConnect routes={_routes} store={store} helpers={providers}>
              {renderRoutes(_routes)}
            </ReduxAsyncConnect>
          </ConnectedRouter>
        </Provider>
      </HotEnabler>,
      dest
    );
  };
  await hydrate(routes);
  await Loadable.preloadReady();

  if (module.hot) {
    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes');
      hydrate(nextRoutes).catch(err => {
        console.error('Error on routes reload:', err);
      });
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-reactroot']) {
      console.error('Server-side React render was discarded.\n' +
          'Make sure that your initial render does not contain any client-side code.');
    }
  }

  if (__DEVTOOLS__ && !window.devToolsExtension) {
    const devToolsDest = document.createElement('div');
    window.document.body.insertBefore(devToolsDest, null);
    const DevTools = require('./containers/DevTools/DevTools');
    ReactDOM.hydrate(
      <Provider store={store}>
        <DevTools />
      </Provider>,
      devToolsDest
    );
  }

  if (!__DEVELOPMENT__ && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      registration.onupdatefound = () => {
        // The updatefound event implies that reg.installing is set; see
        // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
        const installingWorker = registration.installing;

        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                const event = new Event('updatesFound');
                window.dispatchEvent(event);
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
              }
              break;
            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
            default:
          }
        };
      };
    } catch (error) {
      console.log('Error registering service worker: ', error);
    }

    await navigator.serviceWorker.ready;
  }
})();
