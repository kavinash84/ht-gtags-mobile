import { MODULAR_WARDROBE } from 'helpers/apiUrls';
import MWData from '../../components/ModularWardrobe/MWData';

const LOAD = 'modularWardrobe/LOAD';
const LOAD_SUCCESS = 'modularWardrobe/LOAD_SUCCESS';
const LOAD_FAIL = 'modularWardrobe/LOAD_FAIL';

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

export const loadModularWardrobeData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(MODULAR_WARDROBE)
});
