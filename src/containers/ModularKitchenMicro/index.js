import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { STATIC_BLOCK as STATIC_BLOCK_API } from 'helpers/apiUrls';
import { getData, gotData } from 'redux/modules/services';
import { loadModKitchenData } from 'redux/modules/modularkitchen';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadModKitchenData()).catch(error => console.log(error));
    if (!gotData(getState(), 'modularkitchen')) {
      await dispatch(getData(`${STATIC_BLOCK_API}/modular_kitchen_react`, 'modularkitchen'));
    }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const ModularKitchenMicro = HomeTownLoader({
  loader: () => import('./ModularKitchenMicro' /* webpackChunkName: 'ModularKitchenMicro' */)
});

export default provideHooks(hooks)(ModularKitchenMicro);
