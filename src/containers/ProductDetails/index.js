import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import {
  loadProductDescription,
  gaTrack as productLoadGaTrack,
  getfinanceOptions
} from "redux/modules/productdetails";
// import { setRecentlyViewed } from 'redux/modules/recentlyviewed';
import { setRecentlyViewedLocal } from "redux/modules/recently";

import { loadReview } from "redux/modules/reviews";
import { PINCODE } from "../../helpers/Constants";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const {
      productdetails: { currentsku },
      pincode: { selectedPincode }
    } = getState();
    const pincode = selectedPincode || PINCODE;
    if (currentsku !== params.skuId) {
      await dispatch(loadProductDescription(params.skuId, pincode));
      await dispatch(getfinanceOptions());
    }
  },
  defer: ({ store: { dispatch, getState }, params }) => {
    const { reviews, productdetails } = getState();
    dispatch(loadReview(params.skuId));
    // dispatch(setRecentlyViewed(params.skuId));
    dispatch(setRecentlyViewedLocal(productdetails, reviews));
  },
  done: ({ store: { dispatch } }) => dispatch(productLoadGaTrack())
};

const ProductDetails = HomeTownLoader({
  loader: () =>
    import("./ProductDetails" /* webpackChunkName: 'ProductDetails' */)
});

export default provideHooks(hooks)(ProductDetails);
