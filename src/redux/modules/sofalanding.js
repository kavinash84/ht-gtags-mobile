import { SOFA_LANDING } from 'helpers/apiUrls';

const LOAD = 'sofalanding/LOAD';
const LOAD_SUCCESS = 'sofalanding/LOAD_SUCCESS';
const LOAD_FAIL = 'sofalanding/LOAD_FAIL';

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

export const loadSofaLandingData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(SOFA_LANDING)
});
