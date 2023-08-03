import {
  PRODUCT_DETAIL,
  PRODUCT_DELIVERY_DETAILS,
  BOUGHT_TOGETHER,
  PRODUCT_FINANCE_OPTIONS
} from "../../helpers/apiUrls";
// import { PRODUCT_DETAIL, PRODUCT_DELIVERY_DETAILS, PRODUCT_FINANCE_OPTIONS } from '../../helpers/apiUrls';

const LOAD_PRODUCT_DESCRIPTION = "productdetails/LOAD_PRODUCT_DESCRIPTION";
const LOAD_PRODUCT_DESCRIPTION_SUCCESS =
  "productdetails/LOAD_PRODUCT_DESCRIPTION_SUCCESS";
const LOAD_PRODUCT_DESCRIPTION_FAIL =
  "productdetails/LOAD_PRODUCT_DESCRIPTION_FAIL";

const GET_DELIVERY_DETAILS = "productdetails/GET_DELIVERY_DETAILS";
const GET_DELIVERY_DETAILS_SUCCESS =
  "productdetails/GET_DELIVERY_DETAILS_SUCCESS";
const GET_DELIVERY_DETAILS_FAIL = "productdetails/GET_DELIVERY_DETAILS_FAIL";

const GET_FINANCE_OPTIONS = "productdetails/GET_FINANCE_OPTIONS";
const GET_FINANCE_OPTIONS_SUCCESS =
  "productdetails/GET_FINANCE_OPTIONS_SUCCESS";
const GET_FINANCE_OPTIONS_FAIL = "productdetails/GET_FINANCE_OPTIONS_FAIL";

const SET_PROUDUCT_POSITION = "products/SET_PROUDUCT_POSITION";

const PRODUCT_DETAILS_TRACK = "productdetails/PRODUCT_DETAILS_TRACK";

const PRODUCT_DETAILS_WE_TRACK = "productdetails/PRODUCT_DETAILS_WE_TRACK";

const initialState = {
  productDescription: {},
  currentsku: "",
  position: null,
  simpleSku: "",
  loaded: false,
  financeOptions: {},
  deliveryDateLoaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PRODUCT_DESCRIPTION:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_PRODUCT_DESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentsku: action.result.sku,
        productDescription: action.result,
        simpleSku:
          !action.result.error_message && Object.keys(action.result.simples)[0],
        deliveryDetails: null
      };
    case LOAD_PRODUCT_DESCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case GET_DELIVERY_DETAILS:
      return {
        ...state,
        deliveryDateLoading: true
      };
    case GET_DELIVERY_DETAILS_SUCCESS:
      return {
        ...state,
        deliveryDateLoading: false,
        deliveryDateLoaded: true,
        deliveryDetails: action.result
      };
    case GET_DELIVERY_DETAILS_FAIL:
      return {
        ...state,
        deliveryDateLoading: false,
        deliveryDateLoaded: false,
        error: action.error
      };
    case GET_FINANCE_OPTIONS:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case GET_FINANCE_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        financeOptions: action.result
      };
    case GET_FINANCE_OPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_PROUDUCT_POSITION:
      return {
        ...state,
        position: action.payLoad
      };
    default:
      return state;
  }
}

export const loadProductDescription = (sku, pincode) => ({
  types: [
    LOAD_PRODUCT_DESCRIPTION,
    LOAD_PRODUCT_DESCRIPTION_SUCCESS,
    LOAD_PRODUCT_DESCRIPTION_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${PRODUCT_DETAIL}/${sku}/${pincode}`);
      response.sku = sku;
      return response;
    } catch (error) {
      return error;
    }
  },
  sku
});

export const getDelieveryInfo = (simpleSku, pincode) => ({
  types: [
    GET_DELIVERY_DETAILS,
    GET_DELIVERY_DETAILS_SUCCESS,
    GET_DELIVERY_DETAILS_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const response = await client.get(
        `${PRODUCT_DELIVERY_DETAILS}/${simpleSku}/${pincode}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const getfinanceOptions = () => ({
  types: [
    GET_FINANCE_OPTIONS,
    GET_FINANCE_OPTIONS_SUCCESS,
    GET_FINANCE_OPTIONS_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const response = await client.get(PRODUCT_FINANCE_OPTIONS);
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const setProductPosition = payLoad => ({
  type: SET_PROUDUCT_POSITION,
  payLoad
});

export const gaTrack = () => ({
  type: PRODUCT_DETAILS_TRACK
});

export const weProductViewTrack = () => ({
  type: PRODUCT_DETAILS_WE_TRACK
});
