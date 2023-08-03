import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadBedLandingData } from 'redux/modules/bedlanding';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadBedLandingData()).catch(error => console.log(error));
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }

  }
};
const BedLanding = HomeTownLoader({
  loader: () => import('./BedLanding' /* webpackChunkName: 'BedLanding' */)
});

export default provideHooks(hooks)(BedLanding);