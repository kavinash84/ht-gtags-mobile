import { BED_LANDING } from 'helpers/apiUrls';

const LOAD = 'bedlanding/LOAD';
const LOAD_SUCCESS = 'bedlanding/LOAD_SUCCESS';
const LOAD_FAIL = 'bedlanding/LOAD_FAIL';

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

export const loadBedLandingData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(BED_LANDING)
});
