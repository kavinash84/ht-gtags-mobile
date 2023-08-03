import { provideHooks } from "redial";
import HomeTownLoader from "containers/Loader";
import { loadCategory, setCategory, isLoaded } from "redux/modules/category";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const { category } = params;
    if (!isLoaded(getState(), category)) {
      await dispatch(loadCategory(category)).catch(error => console.log(error));
    }
    if (category === "tableware-kitchenware") {
      await dispatch(loadCategory(category)).catch(error => console.log(error));
    }
    await dispatch(setCategory(category));
  }
  // defer: ({ store: { dispatch, getState }, params }) => {
  // const { category } = params;
  // if (!isLoaded(getState(), category)) {
  //   dispatch(loadCategory(category)).catch(error => console.log(error));
  // }
  // if (category === "tableware-kitchenware") {
  //   dispatch(loadCategory(category)).catch(error => console.log(error));
  // }
  // dispatch(setCategory(category));
  // }
};

const Category = HomeTownLoader({
  loader: () => import("./Category" /* webpackChunkName: 'Category' */)
});

export default provideHooks(hooks)(Category);
