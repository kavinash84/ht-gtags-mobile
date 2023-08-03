import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import { PINCODE } from "helpers/Constants";
import { encodeCategory } from "utils/helper";
import { resetLoadMore } from "redux/modules/loadmore";
import { getMattressesData } from "redux/modules/mattresses";
// import { setCurrentPage, resetPagination } from 'redux/modules/pagination';
import {
  // isLoaded as isInitialListLoaded,
  setCategoryQuery,
  clearPreviousList,
  clearPreviousSort,
  loadUrlQuery,
  applyFilter,
  setFilter,
  setCategory,
  setsearchQuery,
  gaTrack as listingLoadTrack,
  setReloadListing
} from "redux/modules/products";
import {
  load as loadListingBanners,
  isLoaded as isListingBannerLoaded
} from "redux/modules/listingbanners";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params, location }) => {
    const {
      pincode: { selectedPincode },
      app: { city }
      // products: {
      //   // filter: prevFilter, category, searchquery: prevSearchQuery, reloadListing
      // }
    } = getState();
    let query;
    let filters;
    let loadResults;
    const pincode = selectedPincode === "" ? PINCODE : selectedPincode;
    // const { search } = location;
    const urlCategoryArr = location.pathname.split("/");
    const urlCategory = urlCategoryArr[`${urlCategoryArr.length - 1}`]
      ? urlCategoryArr[`${urlCategoryArr.length - 1}`]
      : urlCategoryArr[`${urlCategoryArr.length - 2}`];
    // const getPage = search.split('page=')[1];
    // const currentPage = getPage || 1;
    let searchquery;
    if (location.pathname === "/search") {
      /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
      [, searchquery] = location.search.split("q=");
      if (searchquery) {
        [searchquery] = searchquery.split("filters=");
        [searchquery] = searchquery.split("&");
      }
      query = encodeCategory({ category: "search" });
      [, filters] = location.search.split("filters=");
      loadResults = applyFilter({
        searchquery,
        query,
        pincode,
        filters,
        city
      });
    } else {
      query = encodeCategory(params);
      [, filters] = location.search.split("filters=");
      loadResults = applyFilter({
        query,
        pincode,
        filters,
        city
      });
    }
    // if (currentPage === 1) await dispatch(resetPagination());
    // let searchquery = '';
    // if (location.pathname === '/catalog/all-products') {
    //   const hashQuery = location.search.split('?').join('');
    //   query = encodeCategory(params);
    //   loadResults = loadUrlQuery(encodeCategory(params), hashQuery, pincode);
    // } else if (location.pathname === '/search') {
    //   [, searchquery] = location.search.split('q=');
    //   if (searchquery) {
    //     [searchquery] = searchquery.split('filters=');
    //     [searchquery] = searchquery.split('&');
    //   }
    //   query = encodeCategory({ category: 'search' });
    //   [, filters] = location.search.split('filters=');
    //   if (!filters) {
    //     filters = '';
    //   }
    //   loadResults = applyFilter({
    //     searchquery,
    //     query,
    //     pincode,
    //     filters,
    //     city
    //   });
    // } else {
    //   query = encodeCategory(params);
    //   [, filters] = location.search.split('filters=');
    //   if (!filters) {
    //     filters = '';
    //   }
    //   loadResults = applyFilter({
    //     query,
    //     pincode,
    //     filters,
    //     city
    //   });
    // }
    // if (
    //   !isInitialListLoaded(getState(), query) ||
    //   ((filters && filters !== prevFilter && !getPage) || category !== query) ||
    //   prevFilter === 'clearAll' ||
    //   prevSearchQuery !== searchquery ||
    //   reloadListing
    // ) {
    // await dispatch(getOfferStrip(urlCategory));
    await dispatch(clearPreviousList());
    // await dispatch(setCurrentPage(currentPage));
    await dispatch(resetLoadMore());
    await dispatch(clearPreviousSort());
    await dispatch(setFilter(""));
    // }
    // if (
    //   location.search.split('redirect').length > 1 ||
    //   (category.length > 0 &&
    //     category === query &&
    //     filters === prevFilter &&
    //     prevSearchQuery === searchquery &&
    //     !reloadListing)
    // ) {
    //   return;
    // }
    if (location.pathname !== "/search") {
      await dispatch(loadResults).catch(() => null);
    } else {
      await dispatch(setReloadListing(true));
    }
    await dispatch(setCategoryQuery(query, pincode));
    await dispatch(setCategory(query));
    await dispatch(setFilter(filters));
    await dispatch(setsearchQuery(searchquery));
    // dispatch(setReloadListing(false));
    await dispatch(getMattressesData());

    if (!isListingBannerLoaded(getState())) {
      await dispatch(loadListingBanners()).catch(error => console.log(error));
    }
  },
  done: ({ store: { dispatch } }) => dispatch(listingLoadTrack())
};

const Listing = HomeTownLoader({
  loader: () => import("./Listing" /* webpackChunkName: 'Listing' */)
});

export default provideHooks(hooks)(Listing);
