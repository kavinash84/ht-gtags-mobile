import { USER_CONSENT_API } from 'helpers/apiUrls';

const POST_CONSENT = 'userConsent/POST_CONSENT';
const POST_CONSENT_SUCCESS = 'userConsent/POST_CONSENT_SUCCESS';
const POST_CONSENT_FAIL = 'userConsent/POST_CONSENT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case POST_CONSENT:
      return {
        ...state,
        loading: true
      };
    case POST_CONSENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        successMessage: action.result.message,
        error: '',
        errorMessage: ''
      };
    case POST_CONSENT_FAIL:
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

export const postConsent = (mobile, accepted) => ({
  types: [POST_CONSENT, POST_CONSENT_SUCCESS, POST_CONSENT_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const postData = {
        mobile: mobile,
        accepted: accepted
      };
      const response = await client.post(USER_CONSENT_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
