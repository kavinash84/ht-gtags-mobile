import { provideHooks } from "redial";
import HomeTownLoader from "../../containers/Loader";
import { loadExchangeOffer } from "../../redux/modules/designBuild";

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadExchangeOffer());
  }
};

const ExchangeOffer = HomeTownLoader({
  loader: () =>
    import("./exhangeOfferContainer" /* webpackChunkName: 'ExchangeOffer' */)
});

export default provideHooks(hooks)(ExchangeOffer);
