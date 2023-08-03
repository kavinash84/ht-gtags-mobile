import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadWelcomeData } from 'redux/modules/welcome';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadWelcomeData()).catch(error => console.log(error));
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