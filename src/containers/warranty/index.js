import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { loadWarranty } from "redux/modules/designBuild";

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadWarranty());
  }
};

const WarrantyPage = HomeTownLoader({
  loader: () =>
    import("./warrantyContainer" /* webpackChunkName: 'warrantyContainer' */)
});

export default provideHooks(hooks)(WarrantyPage);
