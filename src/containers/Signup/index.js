import HomeTownLoader from 'containers/Loader';

const Signup = HomeTownLoader({
  loader: () => import('./Signup' /* webpackChunkName: 'Signup' */)
});

export default Signup;
