import {
  PAYMENT_STATUS as PAYMENT_STATUS_API,
  TRACK_UNBXD_ANALYTICS as UNBXD_ANALYTICS_API
} from "helpers/apiUrls";

const LOAD = "paymentstatus/LOAD";
const LOAD_SUCCESS = "paymentstatus/LOAD_SUCCESS";
const LOAD_FAIL = "paymentstatus/LOAD_FAIL";
const UNBXD_LOAD = "paymentstatus/UNBXD_LOAD";
const UNBXD_LOAD_SUCCESS = "paymentstatus/UNBXD_LOAD_SUCCESS";
const UNBXD_LOAD_FAIL = "paymentstatus/UNBXD_LOAD_FAIL";

const WE_PAYMENT_FAILURE = "paymentstatus/WE_PAYMENT_FAILURE";

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  unbxdTrack: null
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
        data: action.result,
        error: (action.result && action.result.error_message) || ""
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error
      };
    case UNBXD_LOAD_SUCCESS:
      return {
        ...state,
        unbxdTrack: action.result
      };
    case UNBXD_LOAD_FAIL: {
      return {
        ...state,
        unbxdTrack: action.error
      };
    }
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.paymentstatus && globalState.paymentstatus.loaded;
}

export const load = sessionId => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${PAYMENT_STATUS_API}/${sessionId}`);
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const logAnalytics = postData => ({
  types: [UNBXD_LOAD, UNBXD_LOAD_SUCCESS, UNBXD_LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.post(`${UNBXD_ANALYTICS_API}`, postData);
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const wePaymentFailure = () => ({
  type: WE_PAYMENT_FAILURE
});
