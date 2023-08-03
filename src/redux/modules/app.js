import { PINCODE } from 'helpers/Constants';

const LOAD = 'app/LOAD';
const LOAD_SUCCESS = 'app/LOAD_SUCCESS';
const LOAD_FAIL = 'app/LOAD_FAIL';
const SET_CITY = 'app/SET_CITY';
const SET_ORDER_ID = 'app/SET_ORDER_ID';
const PAYMENT_LOADED = 'app/PAYMENT_LOADED';
const EMI_PAYMENT_TYPE = 'app/EMI_PAYMENT_TYPE';

// const IS_LANDING_PAGE = "app/IS_LANDING_PAGE";

const initialState = {
  loaded: false,
  sessionId: '',
  city: '',
  orderId: '',
  walletType: {},
  paymentLoaded: false,
  // isPLPLanding: false,
  emiPaymentType: ''
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
        sessionId: action.result.session,
        city: action.result.pincode_details && action.result.pincode_details[0].city
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_CITY:
      return {
        ...state,
        city: action.query.city
      };
    case SET_ORDER_ID:
      return {
        ...state,
        orderId: action.id,
        customerId: action.customerId,
        walletType: action.walletType
      };
    case PAYMENT_LOADED:
      return {
        ...state,
        paymentLoaded: action.status
      };
    case EMI_PAYMENT_TYPE:
      return {
        ...state,
        emiPaymentType: action.name
      };
    // case IS_LANDING_PAGE:
    //   return {
    //     ...state,
    //     isPLPLanding: action.status
    //   };
    default:
      return state;
  }
}

const setAppAuth = ({ client }) => async response => {
  const { session } = response;
  await client.setSessionId(session);
};

export const isLoaded = globalState => globalState.app && globalState.app.loaded;

export const generateSession = (pincode = PINCODE) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = { session: await generateSessionId(26) };
      await setAppAuth({ client })(response);
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const generateSessionId = async length => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
};

export const setCity = query => ({
  type: SET_CITY,
  query
});

export const setOrderId = (id, customerId, walletType) => ({
  type: SET_ORDER_ID,
  id,
  customerId,
  walletType
});

export const paymentLoaded = status => ({
  type: PAYMENT_LOADED,
  status
});

export const setEmiPaymentType = name => ({
  type: EMI_PAYMENT_TYPE,
  name
});

// export const isLandingPage = status => ({
//   type: IS_LANDING_PAGE,
//   status
// });