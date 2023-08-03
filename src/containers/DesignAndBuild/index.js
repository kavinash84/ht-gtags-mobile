import { provideHooks } from 'redial';
import HomeTownLoader from 'containers/Loader';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
// import { STATIC_BLOCK as STATIC_BLOCK_API } from 'helpers/apiUrls';
// import { getData, gotData } from 'redux/modules/services';
import { loadDesingBuildData } from 'redux/modules/designBuild';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadDesingBuildData()).catch(error => console.log(error));
    // if (!gotData(getState(), 'modularkitchen')) {
    //   await dispatch(getData(`${STATIC_BLOCK_API}/modular_kitchen_react`, 'modularkitchen'));
    // }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }
  }
};

const Designbuild = HomeTownLoader({
  loader: () => import('./DesignBuild' /* webpackChunkName: 'ModularKitchenMicro' */)
});

export default provideHooks(hooks)(Designbuild);
