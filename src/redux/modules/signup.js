import cookie from 'js-cookie';
import { SIGNUP as SIGNUP_API } from 'helpers/apiUrls';
import { SIGNUP_OTP as SIGNUP_OTP_API } from 'helpers/apiUrls';
import { RESEND_SIGNUP_OTP as RESEND_SIGNUP_OTP_API } from 'helpers/apiUrls';

const SIGNUP = 'signUp/SIGNUP';
const SIGNUP_SUCCESS = 'signUp/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'signUp/SIGNUP_FAIL';

const GET_OTP_SIGNUP = 'signUp/GET_OTP_SIGNUP';
const GET_OTP_SUCCESS_SIGNUP = 'signUp/GET_OTP_SUCCESS_SIGNUP';
const GET_OTP_FAIL_SIGNUP = 'signUp/GET_OTP_FAIL_SIGNUP';

const initialState = {
  loaded: false,
  isLoggedIn: false,
  error: false,
  errorMessage: null,
  response: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        loading: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        signUpSuccess: false,
        response: action.result,
        accessToken: action.result.token.access_token,
        refreshToken: action.result.token.refresh_token,
        errorMessage: null
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

const setToken = ({ client }) => response => {
  cookie.set('Authorization', `Bearer ${response.token.access_token}`, { expires: 8 / 24 });
  client.setJwtToken(response.token.access_token);
};

export function isLoaded(globalState) {
  return globalState.signup && globalState.signup.loaded;
}

export const signUp = (data, session) => ({
  types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        full_name: data.name,
        email: data.email,
        mobile: data.phone,
        password: data.password,
        dob: data.dob,
        gender: data.gender,
        city: data.city,
        session_id: session
      };
      if (data.otp) {
        postData['CreateWallet'] = true;
        postData['otp'] = data.otp;
      }
      const response = await client.post(SIGNUP_API, postData);
      await setToken({ client })(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const getOtpfromSignUp = mobile => ({
  types: [GET_OTP_SIGNUP, GET_OTP_SUCCESS_SIGNUP, GET_OTP_FAIL_SIGNUP],
  promise: async ({ client }) => {
    try {
      const postData = {
        mobile
      };
      await client.post(SIGNUP_OTP_API, postData);
    } catch (err) {
      throw err;
    }
  }
});

export const resendOtpfromSignUp = mobile => ({
  types: [GET_OTP_SIGNUP, GET_OTP_SUCCESS_SIGNUP, GET_OTP_FAIL_SIGNUP],
  promise: async ({ client }) => {
    try {
      const postData = {
        mobile
      };
      await client.post(RESEND_SIGNUP_OTP_API, postData);
    } catch (err) {
      throw err;
    }
  }
});
