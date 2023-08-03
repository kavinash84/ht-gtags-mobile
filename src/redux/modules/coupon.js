import { COUPON as COUPON_API } from "helpers/apiUrls";
import { loadCartAfterCouponApplied } from "redux/modules/cart";
import { formatToArray, formatCartSummary } from "helpers/cartFormateres";

const LOAD_COUPONS = "coupon/LOAD_COUPONS";
const LOAD_COUPONS_SUCCESS = "coupon/LOAD_COUPONS_SUCCESS";
const LOAD_COUPONS_FAIL = "coupon/LOAD_COUPONS_FAIL";

const APPLY_COUPON = "coupon/APPLY_COUPON";
const APPLY_COUPON_SUCCESS = "coupon/APPLY_COUPON_SUCCESS";
const APPLY_COUPON_FAIL = "coupon/APPLY_COUPON_FAIL";

const REMOVE_COUPON = "coupon/REMOVE_COUPON";
const REMOVE_COUPON_SUCCESS = "coupon/REMOVE_COUPON_SUCCESS";
const REMOVE_COUPON_FAIL = "coupon/REMOVE_COUPON_FAIL";

const APPLY_COUPON_FAIL_WE = "coupon/APPLY_COUPON_FAIL_WE";

const initialState = {
  loaded: false,
  loading: false,
  data: {},
  error: false,
  errorMessage: {},
  applied: false,
  appliedCoupon: null,
  summary: {},
  coupons: [],
  unapplicablecoupons: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_COUPONS:
      return {
        ...state,
        loading: true,
        error: false
      };
    case LOAD_COUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        coupons: action.result.cart_coupons,
        unapplicablecoupons: action.result.all_coupons
      };
    case LOAD_COUPONS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        errorMessage: action.error
      };
    case APPLY_COUPON:
      return {
        ...state,
        loading: true,
        error: false,
        applied: false,
        appliedCoupon: null
      };
    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        data: {
          ...action.result,
          cart:
            action.result && "cartItems" in action.result
              ? formatToArray(action.result.cartItems)
              : []
        },
        summary: [
          ...state.summary,
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {}
        ],
        applied: true,
        appliedCoupon: action.result.summary.couponCode
      };
    case APPLY_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        applied: false,
        errorMessage: action.error
      };
    case REMOVE_COUPON:
      return {
        ...state,
        loading: true,
        error: false
      };
    case REMOVE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        data: {
          ...action.result,
          cart:
            action.result && "cartItems" in action.result
              ? formatToArray(action.result.cartItems)
              : []
        },
        summary: [
          ...state.summary,
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {}
        ],
        applied: false,
        appliedCoupon: null
      };
    case REMOVE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        applied: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

export const triggerCouponFailToWE = payload => ({
  type: APPLY_COUPON_FAIL_WE,
  payload
});

export const applyCoupon = (coupon, sessionId, pincode) => dispatch =>
  dispatch({
    types: [APPLY_COUPON, APPLY_COUPON_SUCCESS, APPLY_COUPON_FAIL],
    promise: async ({ client }) => {
      try {
        const postData = { coupon: coupon.toUpperCase() };
        const response = await client.post(COUPON_API, postData);
        // dispatch(updateCartSummary(response.summary));
        dispatch(loadCartAfterCouponApplied(response));
        return response;
      } catch (error) {
        dispatch(triggerCouponFailToWE(coupon));
        throw error;
      }
    }
  });

export const removeCoupon = (coupon, sessionId, pincode) => dispatch =>
  dispatch({
    types: [REMOVE_COUPON, REMOVE_COUPON_SUCCESS, REMOVE_COUPON_FAIL],
    promise: async ({ client }) => {
      try {
        const postData = { coupon };
        const response = await client.delete(COUPON_API, { data: postData });
        // dispatch(updateCartSummary(response.summary));
        dispatch(loadCartAfterCouponApplied(response));
        return response;
      } catch (error) {
        throw error;
      }
    }
  });

export const loadCoupons = (sessionId, pincode = "110004") => ({
  types: [LOAD_COUPONS, LOAD_COUPONS_SUCCESS, LOAD_COUPONS_FAIL],
  promise: ({ client }) => client.get(`${COUPON_API}s`)
});
