import { routerReducer } from "react-router-redux";
import multireducer from "multireducer";
import cart from "./modules/cart";
import products from "./modules/products";
import wishlist from "./modules/wishlist";
import search from "./modules/search";
import homepage from "./modules/homepage";
import staticPages from "./modules/static";
import loadmore from "./modules/loadmore";
import userLogin from "./modules/login";
import updatepassword from "./modules/updatepassword";
import userconsent from "./modules/userconsent";
import profile from "./modules/profile";
import userSignUp from "./modules/signup";
import forgotpassword from "./modules/forgotpassword";
import productdetails from "./modules/productdetails";
import reviews from "./modules/reviews";
import pincode from "./modules/pincode";
import app from "./modules/app";
import orders from "./modules/orders";
import tracking from "./modules/tracking";
import trackorder from "./modules/trackorder";
import paymentoptions from "./modules/paymentoptions";
import paymentstatus from "./modules/paymentstatus";
import checkout from "./modules/checkout";
import coupon from "./modules/coupon";
import myaddress from "./modules/myaddress";
import mycases from "./modules/mycases";
import notifs from "./modules/notifs";
import address from "./modules/address";
import category from "./modules/category";
import analytics from "./modules/analytics";
import services from "./modules/services";
import cases from "./modules/cases";
import recently from "./modules/recently";
import stores from "./modules/stores";
import storelocator from "./modules/storelocator";
import combinedbuy from "./modules/combinedbuy";
import landing from "./modules/landing";
import selectForDemo from "./modules/selectForDemo";
import feedback from "./modules/feedback";
import listingbanners from "./modules/listingbanners";
import modularkitchen from "./modules/modularkitchen";
import gifting from "./modules/gifting";
import designBuild from "./modules/designBuild";
import homeInterior from "./modules/homeInterior";
import modularWardrobe from "./modules/modularWardrobe";
import mattresses from "./modules/mattresses";
import exchange from "./modules/exchange";
import welcome from "./modules/welcome";
import bedlanding from "./modules/bedlanding";
import sofalanding from "./modules/sofalanding";
import reclinerlanding from "./modules/reclinerlanding";
import spaces from "./modules/spaces";
import yearendsale from "./modules/yearendsale";
import lackpackages from "./modules/lackpackages";
import blogs from "./modules/blogs";
import smartsters from "./modules/smartsters";

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    online: (v = true) => v,
    homepage: multireducer({
      announcement: homepage,
      menu: homepage,
      banners: homepage,
      categories: homepage,
      hashtags: homepage,
      products: homepage,
      offers: homepage,
      terms: homepage,
      cancellation: homepage,
      privacy: homepage,
      returnpolicy: homepage,
      dealoftheday: homepage,
      bestsellers: homepage,
      homepageData: homepage
    }),
    staticPages: multireducer({
      announcementpagedata: staticPages
    }),
    cart,
    products,
    wishlist,
    search,
    loadmore,
    userLogin,
    updatepassword,
    userconsent,
    profile,
    userSignUp,
    forgotpassword,
    productdetails,
    reviews,
    pincode,
    app,
    orders,
    tracking,
    coupon,
    trackorder,
    myaddress,
    paymentoptions,
    checkout,
    notifs,
    address,
    paymentstatus,
    category,
    analytics,
    services,
    recently,
    stores,
    storelocator,
    combinedbuy,
    mycases,
    cases,
    landing,
    selectForDemo,
    feedback,
    listingbanners,
    modularkitchen,
    gifting,
    designBuild,
    homeInterior,
    modularWardrobe,
    mattresses,
    exchange,
    welcome,
    bedlanding,
    sofalanding,
    spaces,
    reclinerlanding,
    yearendsale,
    lackpackages,
    blogs,
    smartsters,
    ...asyncReducers
  };
}
