import {
  CATEGORY_MENU,
  BANNERS,
  BANNER_2,
  HOMEPAGE_TOP_SELLING,
  HOMEPAGE_CATEGORIES,
  HASHTAGS,
  RECENTLY_VEIWED,
  DEAL_OF_THE_DAY,
  BEST_SELLERS,
  STATIC_BLOCK,
  HOMEPAGE
} from "helpers/apiUrls";

const LOAD = "hompageCategories/LOAD";
const LOAD_SUCCESS = "hompageCategories/LOAD_SUCCESS";
const LOAD_FAIL = "hompageCategories/LOAD_FAIL";

const WE_BANNER_IMPRESSION = "hompageCategories/WE_BANNER_IMPRESSION";

const initialState = {
  loaded: false,
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const isLoaded = (globalState, key) =>
  globalState.homepage[key] && globalState.homepage[key].loaded;

export const loadCategoryMenu = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(CATEGORY_MENU)
});

export const loadDealOfTheDay = pincode => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(
      `tesla/static/homepagecoupons/deal_of_the_day?pincode=${pincode}`
    )
});

export const loadBestSellers = pincode => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`tesla/static/homepagecoupons/best_sellers?pincode=${pincode}`)
});

export const loadBanners = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(BANNERS)
});

export const loadAnnouncementBar = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`${STATIC_BLOCK}/text/desktop_homepage_announcement`)
});

export const loadCategories = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HOMEPAGE_CATEGORIES)
});

export const loadHashTags = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HASHTAGS)
});

export const loadTopSelling = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HOMEPAGE_TOP_SELLING)
});
export const loadOffers = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`${STATIC_BLOCK}/home_page_offerstrip_react`)
});

export const loadRecentlyViewed = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${RECENTLY_VEIWED}`)
});

export const loadStaticPage = API => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(API)
});

export const loadHomePage = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HOMEPAGE)
});

export const weBannerImpression = payLoad => ({
  type: WE_BANNER_IMPRESSION,
  payLoad
});
