import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadreclinerlandingData } from 'redux/modules/reclinerlanding';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadreclinerlandingData()).catch(error => console.log(error));
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};
const ReclinerLanding = HomeTownLoader({
  loader: () => import('./ReclinerLanding' /* webpackChunkName: 'ReclinerLanding' */)
});

export default provideHooks(hooks)(ReclinerLanding);
