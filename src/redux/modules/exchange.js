import { WELCOME_EXCHANGE } from 'helpers/apiUrls';

const LOAD = 'exchange/LOAD';
const LOAD_SUCCESS = 'exchange/LOAD_SUCCESS';
const LOAD_FAIL = 'exchange/LOAD_FAIL';

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
        data:action.result
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

export const loadWelcomeExchangeData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(WELCOME_EXCHANGE)
});
