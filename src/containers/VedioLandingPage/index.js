import HomeTownLoader from "containers/Loader";

const VedioLandingPage = HomeTownLoader({
  loader: () =>
    import(
      "./VedioLandingPageContainer" /* webpackChunkName: 'FlipBookContainer' */
    )
});

export default VedioLandingPage;
