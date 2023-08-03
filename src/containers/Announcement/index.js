import { provideHooks } from 'redial';
import { wrapDispatch } from 'multireducer';
import HomeTownLoader from 'containers/Loader';
import { loadAnnouncementPage, isLoaded as isSectionLoaded } from 'redux/modules/static';

const hooks = {
  fetch: ({ store: { dispatch, getState } }) => {
    if (!isSectionLoaded(getState(), 'announcementpagedata')) {
      wrapDispatch(dispatch, 'announcementpagedata')(loadAnnouncementPage()).catch(error => console.log(error));
    }
  }
};

const Announcement = HomeTownLoader({
  loader: () => import('./Announcement' /* webpackChunkName: 'Home' */)
});

export default provideHooks(hooks)(Announcement);
