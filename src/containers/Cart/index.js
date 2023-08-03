import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import { loadCart } from "redux/modules/cart";
import { PINCODE } from "helpers/Constants";
import { getLandingData, getLandingCategoryData } from "redux/modules/landing";
import { loadStoresData } from "redux/modules/storelocator";
import { loadMyAddress } from "redux/modules/myaddress";
import { getCartContactDetails } from "../../redux/modules/cart";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      app: { sessionId },
      pincode: { selectedPincode },
      userLogin: { isLoggedIn }
    } = getState();
    await dispatch(getLandingData("added-to-cart"));
    await dispatch(getCartContactDetails());
    await dispatch(getLandingCategoryData());
    await dispatch(loadStoresData());
    if (isLoggedIn) {
      await dispatch(loadMyAddress());
    }
    if (sessionId) {
      const pincode = selectedPincode === "" ? PINCODE : selectedPincode;
      dispatch(loadCart(sessionId, pincode)).catch(error => console.log(error));
    }
  }
};

const Cart = HomeTownLoader({
  loader: () => import("./Cart" /* webpackChunkName: 'Cart' */)
});
export default provideHooks(hooks)(Cart);
