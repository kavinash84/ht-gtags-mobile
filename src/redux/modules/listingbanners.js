import { LISTING_BANNER as API } from 'helpers/apiUrls';
import { BANNER_2 } from 'helpers/apiUrls';

const LOAD = 'listingbanner/LOAD';
const LOAD_SUCCESS = 'listingbanner/LOAD_SUCCESS';
const LOAD_FAIL = 'listingbanner/LOAD_FAIL';

const LOAD_BANNER2 = 'hompageCategories/LOAD_BANNER2';
const LOAD_BANNER2_SUCCESS = 'hompageCategories/LOAD_BANNER2_SUCCESS';
const LOAD_BANNER2_FAIL = 'hompageCategories/LOAD_BANNER2_FAIL';

const initialState = {
  loaded: false,
  data: {},
  data2: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        error: action.error
      };
    case LOAD_BANNER2:
      return {
        ...state,
        loading: true
      };
    case LOAD_BANNER2_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data2: action.result
      };
    case LOAD_BANNER2_FAIL:
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

export const isLoaded = globalState => globalState.listingbanner && globalState.listingbanner.loaded;

export const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(API)
});

export const loadBanner2 = () => ({
  types: [LOAD_BANNER2, LOAD_BANNER2_SUCCESS, LOAD_BANNER2_FAIL],
  promise: ({ client }) => client.get(BANNER_2)
});
