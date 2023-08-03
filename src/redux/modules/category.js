import { CATEGORY_PAGE } from "helpers/apiUrls";

const LOAD = "categoryPage/LOAD";
const LOAD_SUCCESS = "categoryPage/LOAD_SUCCESS";
const LOAD_FAIL = "categoryPage/LOAD_FAIL";
const SET_CURRENT_CATEGORY = "categoryPage/SET_CURRENT_CATEGORY";

const VIEW_SUB_CATEGORY = "categoryPage/VIEW_SUB_CATEGORY";

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
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payLoad
      };
    default:
      return state;
  }
}

export const isLoaded = (globalState, category) =>
  globalState.category &&
  globalState.category.loaded &&
  globalState.category.currentCategory === category;

export const setCategory = payLoad => ({
  type: SET_CURRENT_CATEGORY,
  payLoad
});

export const loadCategory = id => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${CATEGORY_PAGE}/${id}`),
  id
});

export const viewSubCategory = payLoad => ({
  type: VIEW_SUB_CATEGORY,
  payLoad
});
