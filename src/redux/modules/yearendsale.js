import { YEAR_END } from 'helpers/apiUrls';

const LOAD = 'yearendsale/LOAD';
const LOAD_SUCCESS = 'yearendsale/LOAD_SUCCESS';
const LOAD_FAIL = 'yearendsale/LOAD_FAIL';

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

export const loadyearendsaleData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(YEAR_END)
});
