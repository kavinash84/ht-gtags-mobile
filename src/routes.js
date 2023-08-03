import { App, NotFound } from "containers";
import { routerActions } from "react-router-redux";
import { connectedReduxRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";

import { categoryRoutes, listingRoutes } from "helpers/Constants";

/* Category */
import Category from "containers/Category";

/* Home */
import Home from "containers/Home";
/* Stores */
import StoreLocator from "containers/StoreLocator";
import Stores from "containers/Stores";

/* auth */
import Login from "containers/Login";
import Signup from "containers/Signup";
import ForgotPassword from "containers/ForgotPassword";
import ResetPassword from "containers/ResetPassword";

/* products */
import Listing from "containers/Listing";
import ProductDetails from "containers/ProductDetails/";
import Cart from "containers/Cart";
import SearchList from "containers/SearchList/SearchList";

/* services */
import ModularKitchen from "containers/ModularKitchenMicro";
import PlanYourKitchen from "containers/PlanYourKitchen";
// import ModularKitchen from 'containers/ModularKitchen';
import DesignBuild from "containers/DesignAndBuild";
import ModularWardrobeContainer from "containers/ModularWardrobe";
import HomeInterior from "containers/HomeInterior";
import BulkOrder from "containers/BulkOrder";
import Brand from "containers/Brand";
import ContactUs from "containers/ContactUs";
import Feedback from "containers/Feedback";
import FeedbackMailer from "containers/FeedbackMailer";
import ServiceRequest from "containers/ServiceRequest";

/* user */
import Profile from "containers/Profile";
import MyOrder from "containers/MyOrder";
import MyCases from "containers/MyCases";
import Wishlist from "containers/Wishlist";
import TrackOrder from "containers/TrackOrder/TrackOrder";
import MyAddress from "containers/MyAddress";

import Order from "containers/Order";

/* checkout */
import DeliveryAddress from "containers/DeliveryAddress";
import PaymentOptions from "containers/PaymentOptions";
// import ReviewOrder from 'containers/ReviewOrder';
import PaymentSuccess from "containers/PaymentSuccess/";
import PaymentFailure from "containers/PaymentFailure/";
import PaymentPending from "containers/PaymentPending/";

// Thank you pages
import ThankyouDb from "./containers/ThankyouDb";
import ThankyouMk from "./containers/ThankyouMk";
import ThankYouEo from "./containers/ThankYouEo";
import ThankYouPage from "./containers/Campaigns/ThankYouPage";

/* static pages */
import ReturnPolicy from "containers/ReturnPolicy";
import PrivacyPolicy from "containers/PrivacyPolicy";
import FAQ from "containers/Faq/";
import Cancellation from "containers/Cancellation";
import Grievance from "containers/Grievance/";
import Terms from "containers/Terms";
import WhoWeAre from "containers/WhoWeAre";
import Promotions from "containers/Promotions";

// brand pageoffset
import Spaces from "./containers/Spaces";

// Landing Pages
import WeddingCampaign from "containers/WeddingCampaign";
import ComboOffer from "containers/ComboOffer";
import WelcomeHomeTown from "./containers/WelcomeHomeTown";
import WelcomeHomeTownOld from "./containers/WelcomeHomeTownOld";
import Mattresses from "./containers/Mattresses";
import BedLanding from "./containers/BedLanding";
import SofaLanding from "./containers/SofaLanding";
import ReclinerLanding from "./containers/ReclinerLanding";
import YearEndSale from "./containers/YearEndSale";

// campaign
import Announcement from "containers/Announcement";
import Campaigns from "containers/Campaigns";
import HtExclusive from "containers/HtExclusive";

import CorporateAdd from "containers/CorporateAdd/";

import Loader from "containers/LoaderNew";
import Consent from "containers/Consent";

import Gifting from "containers/Gifting";
import FlipBokContainer from "./containers/FlipBookContainer";
import Review from "./containers/Review";
import WriteReview from "./containers/WriteReview";
import PackageCatalog from "./containers/PackageCatalog";
import oneLacPackage from "./containers/oneLacPackage";
import VedioLandingPage from "./containers/VedioLandingPage";
import WarrantyPage from "./containers/warranty";
import ExchangeOffer from "./containers/Exchange-offer";
import BlogsContainer from "./containers/BlogsContainer";
import BlogContainer from "./containers/BlogContainer";
import Smartsters from "./containers/Smartsters";

const createRegex = data => data.join("|");

const locationHelper = locationHelperBuilder({});

const isAuthenticated = connectedReduxRedirect({
  redirectPath: "/login",
  authenticatedSelector: state => state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: "UserLoggedIn"
});

const isNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/profile",
  authenticatedSelector: state => !state.userLogin.isLoggedIn,
  redirectAction: routerActions.replace,
  wrapperDisplayName: "UserIsAuthenticated",
  allowRedirectBack: false
});
/* eslint-disable max-len */

const routes = [
  {
    component: App,
    routes: [
      { path: "/", exact: true, component: Home },
      { path: "/login", exact: true, component: isNotAuthenticated(Login) },
      { path: "/signup", exact: true, component: isNotAuthenticated(Signup) },
      {
        path: "/forgot-password/verify/reset/:hash",
        exact: true,
        component: ResetPassword
      },
      {
        path: "/forgot-password",
        exact: true,
        component: isNotAuthenticated(ForgotPassword)
      },
      { path: "/wishlist", exact: true, component: isAuthenticated(Wishlist) },
      { path: "/checkout/cart", exact: true, component: Cart },
      { path: "/my-orders", exact: true, component: isAuthenticated(MyOrder) },
      { path: "/my-cases", exact: true, component: isAuthenticated(MyCases) },
      {
        path: "/my-address",
        exact: true,
        component: isAuthenticated(MyAddress)
      },
      { path: "/profile", exact: true, component: isAuthenticated(Profile) },
      { path: "/promotions", exact: true, component: Promotions },
      {
        path: "/:productname?/sku/:skuId",
        exact: true,
        component: ProductDetails
      },
      {
        path: "/checkout/delivery-address",
        exact: true,
        component: DeliveryAddress
      },
      {
        path: "/checkout/payment-options",
        exact: true,
        component: PaymentOptions
      },
      {
        path: "/payment-details",
        exact: true,
        component: Order
      },
      // { path: '/checkout/review-order', exact: true, component: ReviewOrder },
      { path: "/track-order/:orderno?", exact: true, component: TrackOrder },
      { path: "/contact-us", exact: true, component: ContactUs },
      { path: "/corporate-address", exact: true, component: CorporateAdd },
      { path: "/feedback", exact: true, component: Feedback },
      { path: "/feedback-mailer/:id", exact: true, component: FeedbackMailer },
      { path: "/service-request", exact: true, component: ServiceRequest },
      { path: "/grievance", exact: true, component: Grievance },
      { path: "/return-policy", exact: true, component: ReturnPolicy },
      { path: "/store-locator", exact: true, component: StoreLocator },
      { path: "/privacy-policy", exact: true, component: PrivacyPolicy },
      { path: "/cancellation", exact: true, component: Cancellation },
      { path: "/terms-and-conditions", exact: true, component: Terms },
      { path: "/faq", exact: true, component: FAQ },
      { path: "/who-we-are", exact: true, component: WhoWeAre },
      { path: "/store/:city/:storeName", exact: true, component: Stores },
      { path: "/modular-kitchens", exact: true, component: ModularKitchen },
      { path: "/exchange-offers", exact: true, component: ExchangeOffer },
      { path: "/plan-your-kitchen", exact: true, component: PlanYourKitchen },
      { path: "/design-build", exact: true, component: DesignBuild },
      {
        path: "/modular-wardrobe",
        exact: true,
        component: ModularWardrobeContainer
      },
      { path: "/home-interior", exact: true, component: HomeInterior },
      {
        path: "/modular-wardrobe",
        exact: true,
        component: ModularWardrobeContainer
      },
      { path: "/payment-success", exact: true, component: PaymentSuccess },
      {
        path: "/payment-failed/:orderId?",
        exact: true,
        component: PaymentFailure
      },
      {
        path: "/payment-pending/",
        exact: true,
        component: PaymentPending
      },
      { path: "/loader", exact: true, component: Loader },
      { path: "/bulk-order", exact: true, component: BulkOrder },
      { path: "/brand/laura-ashley", exact: true, component: Brand },
      { path: "/brand/ht-exclusive", exact: true, component: HtExclusive },
      { path: "/wedding-campaign", exact: true, component: WeddingCampaign },
      { path: "/combo-offer", exact: true, component: ComboOffer },
      { path: "/announcement", exact: true, component: Announcement },
      { path: "/offer/:type", exact: true, component: Campaigns },
      { path: "/flipBook", exact: true, component: FlipBokContainer },
      { path: "/make-space-for-new", exact: true, component: VedioLandingPage },
      { path: "/reviews", exact: true, component: Review },
      { path: "/writeReview", exact: true, component: WriteReview },
      {
        path: "/new-search",
        exact: true,
        component: SearchList
      },
      { path: "/user-consent", exact: true, component: Consent },
      { path: "/search", exact: false, component: Listing },
      {
        path: `/:category(${createRegex(categoryRoutes)})`,
        exact: true,
        component: Category
      },
      {
        path: `/:category(${createRegex(
          listingRoutes
        )})/:subcategory1?/:subcategory2?/:subcategory3?/:subcategory4?/:subcategory5?`,
        exact: true,
        component: Listing
      },
      { path: "/welcome-to-hometown", exact: true, component: WelcomeHomeTown },
      {
        path: "/welcome-to-hometown-exchange",
        exact: true,
        component: WelcomeHomeTownOld
      },
      { path: "/mattresses", exact: true, component: Mattresses },
      { path: "/gifting", exact: true, component: Gifting },
      { path: "/bed-landing", exact: true, component: BedLanding },
      { path: "/sofa-landing", exact: true, component: SofaLanding },
      { path: "/recliner-landing", exact: true, component: ReclinerLanding },
      { path: "/mynm-sale", exact: true, component: YearEndSale },
      { path: "/spaces", exact: true, component: Spaces },
      { path: "/packages", exact: true, component: oneLacPackage },
      { path: "/warranty", exact: true, component: WarrantyPage },
      {
        path: "/package-catalog/:packageid",
        exact: true,
        component: PackageCatalog
      },
      { path: "/blog", exact: true, component: BlogsContainer },
      { path: "/blog/:key", exact: true, component: BlogContainer },
      { path: "/smartsters", exact: true, component: Smartsters },
      { path: "/thankyou-db", exact: true, component: ThankyouDb },
      { path: "/thankyou-mk", exact: true, component: ThankyouMk },
      { path: "/thank-you-eo", exact: true, component: ThankYouEo },
      { path: "/thank-you", exact: true, component: ThankYouPage },
      { component: NotFound }
    ]
  }
];

export default routes;
