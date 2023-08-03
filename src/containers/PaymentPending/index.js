import HomeTownLoader from 'containers/Loader';

const PaymentPending = HomeTownLoader({
  loader: () => import('./PaymentPending' /* webpackChunkName: 'PaymentPending' */)
});

export default PaymentPending;
