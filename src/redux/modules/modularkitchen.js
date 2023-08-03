import { MODULAR_KITCHEN } from 'helpers/apiUrls';

const LOAD = 'modularKitchen/LOAD';
const LOAD_SUCCESS = 'modularKitchen/LOAD_SUCCESS';
const LOAD_FAIL = 'modularKitchen/LOAD_FAIL';

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

export const loadModKitchenData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(MODULAR_KITCHEN)
});
