import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';
import { isLoaded as isSectionLoaded, loadOffers, loadHomePage } from 'redux/modules/homepage';
import { loadyearendsaleData } from 'redux/modules/yearendsale';
import {
  loadCategoryMenu,
  loadCategories
} from '../../redux/modules/homepage';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    await dispatch(loadyearendsaleData()).catch(error => console.log(error));

    if (!isSectionLoaded(getState(), 'menu')) {
      await wrapDispatch(dispatch, 'menu')(loadCategoryMenu()).catch(() => null);
    }
    if (!isSectionLoaded(getState(), 'categories')) {
      await wrapDispatch(dispatch, 'categories')(loadCategories()).catch(error => console.log(error));
    }
  },
  defer: ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      dispatch(loadStores()).catch(error => console.log(error));
    }

  }
};
const YearEndSale = HomeTownLoader({
  loader: () => import('./YearEndSale' /* webpackChunkName: 'YearEndSale' */)
});

export default provideHooks(hooks)(YearEndSale);