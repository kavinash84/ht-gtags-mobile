import HomeTownLoader from 'containers/Loader';

const Consent = HomeTownLoader({
  loader: () => import('./Consent' /* webpackChunkName: 'Faq' */)
});

export default Consent;
