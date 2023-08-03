import axios from 'axios';
import { SUGGESTIONS as SUGGESTIONS_API } from 'helpers/apiUrls';

const LOAD = 'search/LOAD';
const LOAD_SUCCESS = 'search/LOAD_SUCCESS';
const LOAD_FAIL = 'search/LOAD_FAIL';
const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
const CLEAR_SEARCH_QUERY = 'search/CLEAR_SEARCH_QUERY';
const SET_SEARCH_HISTORY = 'search/SET_SEARCH_HISTORY';
const STOP_LOADING = 'search/STOP_LOADING';

const { CancelToken } = axios;

const initialState = {
  loading: false,
  loaded: false,
  results: [],
  searchQuery: '',
  notFound: false,
  showResults: false,
  searchHistory: []
};

let cancel;
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
        results: action.result,
        notFound: false
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        loading: action.query.length >= 4,
        notFound: false,
        loaded: false,
        searchQuery: action.query
      };
    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        loading: false,
        loaded: true,
        searchQuery: '',
        results: [],
        notFound: false
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case SET_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: state.searchHistory.includes(action.payLoad)
          ? state.searchHistory
          : [...state.searchHistory, action.payLoad]
      };
    default:
      return state;
  }
}
export const stopLoading = () => ({
  type: STOP_LOADING
});

export const load = query => (dispatch, getState) => {
  const store = getState();
  const { search: { loading } } = store;
  if (loading) {
    dispatch(stopLoading());
    if (typeof cancel === 'function') cancel('cancelled previous search request');
  }
  return dispatch({
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: async ({ client }) => {
      try {
        const response = await client.get(`${SUGGESTIONS_API}/${query}`, {
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        });
        return response;
      } catch (error) {
        throw error;
      }
    }
  });
};

export const setSearchQuery = query => ({
  type: SET_SEARCH_QUERY,
  query
});

export const clearSearchQuery = () => ({
  type: CLEAR_SEARCH_QUERY
});

export const setSearchHistory = payLoad => ({
  type: SET_SEARCH_HISTORY,
  payLoad
});
