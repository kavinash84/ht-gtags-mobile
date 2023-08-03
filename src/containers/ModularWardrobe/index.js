import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { loadModularWardrobeData } from '../../redux/modules/modularWardrobe';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadModularWardrobeData()).catch(error => console.log(error));
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const ModularWardrobeContainer = HomeTownLoader({
  loader: () => import('./modularWardContainer' /* webpackChunkName: 'ModularWardrobe' */)
});

export default provideHooks(hooks)(ModularWardrobeContainer);
