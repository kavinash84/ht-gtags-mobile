import HomeTownLoader from 'containers/Loader';

const OrderDetails = HomeTownLoader({
  loader: () => import('./OrderDetails' /* webpackChunkName: 'OrderDetails' */)
});

export default OrderDetails;
