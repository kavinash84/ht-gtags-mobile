import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
// import { setOrderId } from 'redux/modules/app';
import {
  isLoaded as isPaymentStatusLoaded,
  load
} from "redux/modules/paymentstatus";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId }
    } = getState();
    if (sessionId) {
      await dispatch(load(sessionId));
    }
  }
};

const Order = HomeTownLoader({
  loader: () => import("./Order" /* webpackChunkName: 'Order' */)
});

export default provideHooks(hooks)(Order);
