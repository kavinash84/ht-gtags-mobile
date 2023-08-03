import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadModKitchenData } from 'redux/modules/modularkitchen';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadModKitchenData()).catch(error => console.log(error));
  }
};

const ModularKitchen = HomeTownLoader({
  loader: () => import('./ModularKitchen' /* webpackChunkName: 'ModularKitchen' */)
});

export default provideHooks(hooks)(ModularKitchen);
