import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { getFeedbackForm } from 'redux/modules/feedback';

// const Feedback = HomeTownLoader({
//   loader: () => import('./Feedback' /* webpackChunkName: 'Feedback' */)
// });

// export default Feedback;

const hooks = {
  fetch: async ({ store: { dispatch }, params: { id } }) => {
    await dispatch(getFeedbackForm(id)).catch(error => console.log(error));
  }
};

const Feedback = HomeTownLoader({
  loader: () => import('./Feedback' /* webpackChunkName: 'Feedback' */)
});

// export default Feedback;
export default provideHooks(hooks)(Feedback);
