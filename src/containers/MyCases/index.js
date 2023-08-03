import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadMyCases } from 'redux/modules/mycases';
import { loadUserProfile } from 'redux/modules/profile';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      profile: { loaded }
    } = getState();
    if (!loaded) {
      await dispatch(loadUserProfile()).catch(error => console.log(error));
    }
    const {
      profile: {
        data: { salesforce_account_id: sfid, contact_number: cn }
      }
    } = getState();
    await dispatch(loadMyCases(sfid, '', '', '', cn)).catch(error => console.log(error));
  }
};
const MyCases = HomeTownLoader({
  loader: () => import('./MyCases' /* webpackChunkName: 'MyOrders' */)
});

export default provideHooks(hooks)(MyCases);
