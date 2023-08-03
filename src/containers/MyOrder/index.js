import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { loadMyOrders } from 'redux/modules/orders';
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
        data: { contact_number: contactNumber }
      }
    } = getState();
    await dispatch(loadMyOrders(contactNumber)).catch(error => console.log(error));
  }
};
const MyOrders = HomeTownLoader({
  loader: () => import('./MyOrder' /* webpackChunkName: 'MyOrders' */)
});

export default provideHooks(hooks)(MyOrders);
