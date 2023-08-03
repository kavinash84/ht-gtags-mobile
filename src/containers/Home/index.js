import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import { wrapDispatch } from "multireducer";
import {
  isLoaded as isSectionLoaded,
  // loadOffers,
  loadHomePage
} from "redux/modules/homepage";
// import { loadStores, isLoaded as isStoresLoaded } from "redux/modules/stores";
// import { loadBanner2 } from "../../redux/modules/listingbanners";
import { PINCODE } from "helpers/Constants";
import {
  loadDealOfTheDay
  // loadBestSellers,
  // loadBanners,
  // loadAnnouncementBar,
  // loadCategoryMenu,
  // loadCategories
} from "../../redux/modules/homepage";

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      pincode: { selectedPincode }
    } = getState();

    const defaultPincode = selectedPincode === "" ? PINCODE : selectedPincode;

    // if (!isSectionLoaded(getState(), "announcement")) {
    //   await wrapDispatch(dispatch, "announcement")(loadAnnouncementBar());
    // }
    // if (!isSectionLoaded(getState(), "banners")) {
    //   await wrapDispatch(
    //     dispatch,
    //     "banners"
    //   )(loadBanners()).catch(error => console.log(error));
    // }
    // if (!isSectionLoaded(getState(), "categories")) {
    //   await wrapDispatch(
    //     dispatch,
    //     "categories"
    //   )(loadCategories()).catch(error => console.log(error));
    // }
    if (!isSectionLoaded(getState(), "dealoftheday")) {
      await wrapDispatch(
        dispatch,
        "dealoftheday"
      )(loadDealOfTheDay(defaultPincode)).catch(error => console.log(error));
    }
    // if (!isSectionLoaded(getState(), "bestsellers")) {
    //   await wrapDispatch(
    //     dispatch,
    //     "bestsellers"
    //   )(loadBestSellers(defaultPincode)).catch(error => console.log(error));
    // }
    // await dispatch(loadBanner2()).catch(error => console.log(error));
    await wrapDispatch(
      dispatch,
      "homepageData"
    )(loadHomePage()).catch(error => console.log(error));
  }
  // defer: ({ store: { dispatch, getState } }) => {
  // if (!isSectionLoaded(getState(), "offers")) {
  //   wrapDispatch(
  //     dispatch,
  //     "offers"
  //   )(loadOffers()).catch(error => console.log(error));
  // }
  // if (!isStoresLoaded(getState())) {
  //   dispatch(loadStores()).catch(error => console.log(error));
  // }
  // }
};

const HomeLoadable = HomeTownLoader({
  loader: () => import("./Home" /* webpackChunkName: 'Home' */)
});

export default provideHooks(hooks)(HomeLoadable);
