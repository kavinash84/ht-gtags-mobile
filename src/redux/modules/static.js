import { STATIC_BLOCK } from 'helpers/apiUrls';

const LOAD = 'staticPage/LOAD';
const LOAD_SUCCESS = 'staticPage/LOAD_SUCCESS';
const LOAD_FAIL = 'staticPage/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: {
    items: {
      text: ''
    }
  }
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

export const isLoaded = (globalState, key) => globalState.staticPages[key] && globalState.staticPages[key].loaded;

export const loadAnnouncementPage = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${STATIC_BLOCK}/text/desktop_announcement_page`)
});
