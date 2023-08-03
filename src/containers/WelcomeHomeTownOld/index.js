import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import {loadWelcomeExchangeData} from 'redux/modules/exchange';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadWelcomeExchangeData()).catch(error => console.log(error));
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }

  }
};
const WelcomeHomeTown = HomeTownLoader({
  loader: () => import('./WelcomeHomeTown' /* webpackChunkName: 'WelcomeHomeTown' */)
});

export default provideHooks(hooks)(WelcomeHomeTown);