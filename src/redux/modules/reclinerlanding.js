import { RECLINER_LANDING } from 'helpers/apiUrls';

const LOAD = 'reclinerlanding/LOAD';
const LOAD_SUCCESS = 'reclinerlanding/LOAD_SUCCESS';
const LOAD_FAIL = 'reclinerlanding/LOAD_FAIL';

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
    default:
      return state;
  }
}

export const loadreclinerlandingData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(RECLINER_LANDING)
});
