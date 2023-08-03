import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadSofaLandingData } from 'redux/modules/sofalanding';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadSofaLandingData()).catch(error => console.log(error));
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }

  }
};
const SofaLanding = HomeTownLoader({
  loader: () => import('./SofaLanding' /* webpackChunkName: 'SofaLanding' */)
});

export default provideHooks(hooks)(SofaLanding);