import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Helmet from "react-helmet";
import Div from "hometown-components/lib/Div";
import Button from "hometown-components/lib/Buttons";
import Theme from "hometown-components/lib/Theme";
import ListingContainer from "components/Listing";
import BestOfferBanners from "components/Listing/BestOfferBanners";
import { connect } from "react-redux";
import Menu from "components/MenuWithoutSearch";
import SeoContent from "components/SeoContent";
import Footer from "components/Footer";

import { getSKUList } from "selectors/wishlist";
import { getCartListSKU } from "selectors/cart";
import { storesList as getStaticData } from "selectors/homepage";
import { setReloadListing } from "redux/modules/products";
import {
  getProducts,
  getCategoryName,
  getProductCount,
  getFilters,
  getSEOInfo,
  getCMSJson,
  getl4
} from "selectors/products";
import { redirectionHelper } from "utils/helper";
import { SITE_URL, DESKTOP_SITE_URL } from "helpers/Constants";
import CANONICALS from "data/canonical";
import NewUnboxBestSeller from "components/NewUnboxWidges/bestSeller";

// import { isLandingPage } from "../../redux/modules/app";

// const btnStyle = {
//   backgroundColor: 'transparent',
//   padding: '0px',
//   margin: '0px',
//   outline: 'none',
//   border: 'none'
// };

const styles = require("./index.scss");

const getFaqs = faqs => {
  const seoFaq = JSON.parse(faqs).map(faq => {
    const ques = Object.values(faq)[0];
    if (faq) {
      return {
        "@type": "Question",
        name: ques,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.ans
        }
      };
    }
    return "";
  });
  return JSON.stringify(seoFaq);
};

@connect(state => ({
  loading: state.products.loading,
  // isPLPLanding: state.app.isPLPLanding,
  loaded: state.products.loaded,
  category: state.products.query,
  filters: getFilters(state),
  wishListedSKUs: getSKUList(state.wishlist),
  wishListData: state.wishlist.data,
  products: getProducts(state),
  categoryName: getCategoryName(state),
  productCount: getProductCount(state),
  pincode: state.pincode.selectedPincode,
  categoryquery: state.products.category,
  isLoggedIn: state.userLogin.isLoggedIn,
  metadata: state.products.list,
  sortBy: state.products.filters.sortBy,
  // togglefilter: state.products.togglefilter,
  // filterLoading: state.products.filterLoading,
  seoInfo: getSEOInfo(state),
  cmsJson: getCMSJson(state),
  breadCrumbs: state.products.categoryDetails,
  currentPage: state.loadmore.page,
  categoryBar: getl4(state),
  selectedPincode: state.pincode.selectedPincode,
  sessionId: state.app.sessionId,
  cartSKUs: getCartListSKU(state.cart),
  reloadListing: state.products.reloadListing,
  bannerData: getStaticData(state.listingbanners)
}))
@withRouter
export default class Listing extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static propTypes = {
    history: PropTypes.object.isRequired,
    pincode: PropTypes.string,
    seoInfo: PropTypes.object,
    currentPage: PropTypes.number,
    breadCrumbs: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    products: PropTypes.array,
    categoryName: PropTypes.string,
    category: PropTypes.string,
    productCount: PropTypes.string,
    wishListedSKUs: PropTypes.array,
    wishListData: PropTypes.array,
    isLoggedIn: PropTypes.bool,
    filters: PropTypes.array,
    metadata: PropTypes.array,
    sortBy: PropTypes.string,
    categoryBar: PropTypes.array,
    // filterLoading: PropTypes.bool.isRequired,
    selectedPincode: PropTypes.string,
    sessionId: PropTypes.string.isRequired,
    cartSKUs: PropTypes.array,
    reloadListing: PropTypes.bool,
    bannerData: PropTypes.object,
    categoryquery: PropTypes.string.isRequired,
    togglefilter: PropTypes.any.isRequired
    // filterLoading: PropTypes.bool.isRequired
  };
  static defaultProps = {
    pincode: "",
    seoInfo: {},
    currentPage: 1,
    categoryBar: [],
    // categoryquery: '',
    breadCrumbs: [],
    // loading: false,
    // loaded: true,
    products: [],
    categoryName: "",
    category: "",
    productCount: "0",
    wishListedSKUs: [],
    wishListData: [],
    filters: [],
    metadata: null,
    isLoggedIn: false,
    sortBy: "",
    selectedPincode: "",
    cartSKUs: [],
    reloadListing: false,
    bannerData: {}
  };

  constructor(props) {
    super(props);
    this.listingRef = React.createRef();
  }
  state = {
    showmore: true,
    recsObj: { pageType: "CATEGORY" }
  };

  componentDidUpdate() {
    const { reloadListing } = this.props;
    if (reloadListing && window && window.renderListing) {
      window.renderListing(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pincode !== this.props.pincode) {
      const { dispatch } = this.context.store;
      const { history } = this.props;
      const {
        location: { search, pathname }
      } = history;
      dispatch(setReloadListing(false));
      history.push(`${pathname}${search}`);
    }
  }

  // scrollDown = () => {
  //   this.listingRef.current.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start'
  //   });
  // };

  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  componentDidMount() {
    const obj = {
      pageType: "CATEGORY"
    };

    if (window && window.unbxd_category && window.unbxd_category) {
      const arr = window.unbxd_category.split(">");
      if (arr.length) {
        arr.map((item, i) => {
          obj[`catlevel${i + 1}Name`] = item;
        });
      }
    }
    this.setState({ recsObj: obj });
  }

  // componentWillUnmount() {
  //   const { dispatch } = this.context.store;
  //   dispatch(isLandingPage(false));
  // }

  scrollDown = () => {
    if (this.props.history.location.pathname === "/hot-deals") {
      this.listingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  render() {
    // const { history, seoInfo, currentPage } = this.props;
    const {
      // loading,
      // loaded,
      products,
      pincode,
      categoryName,
      productCount,
      isLoggedIn,
      history,
      category,
      filters,
      metadata,
      sortBy,
      // togglefilter,
      // filterLoading,
      seoInfo,
      cmsJson,
      wishListedSKUs,
      wishListData,
      breadCrumbs,
      currentPage,
      categoryBar,
      selectedPincode,
      sessionId,
      cartSKUs,
      reloadListing,
      bannerData
    } = this.props;
    let page;
    const {
      location: { search, pathname }
    } = history;
    if (search !== "") {
      [, page] = search.replace("?", "").split("page=");
    } else page = currentPage;
    const previousPage = !page || Number(page) === 1 ? "" : `?page=${page - 1}`;
    // const showBestOffers = listingBestOffersPath.some(arr => arr === pathname);
    // let banners = [];
    // if (showBestOffers) banners = listingBestOffers[0][pathname].images;
    const { showmore, currentPath, recsObj } = this.state;

    return (
      <div>
        <Helmet>
          <title>{seoInfo && seoInfo.page_title}</title>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
          {cmsJson && cmsJson.length ? (
            <script type="application/ld+json">
              {`
              {
                "@context" : "http://schema.org",
                "@type" : "FAQPage",
                "mainEntity": ${getFaqs(cmsJson)}
              }
            `}
            </script>
          ) : (
            ""
          )}
          {CANONICALS[redirectionHelper(pathname)] && (
            <link
              rel="canonical"
              href={`${DESKTOP_SITE_URL}${CANONICALS[redirectionHelper(pathname)]
                }`}
            />
          )}
          {previousPage !== "" && Number(page) !== 2 && (
            <link rel="prev" href={`${SITE_URL}${pathname}${previousPage}`} />
          )}
          {Number(page) === 2 && (
            <link rel="prev" href={`${SITE_URL}${pathname}`} />
          )}
          {/* productCount / 32 / Number(page) > 1 && <link rel="next" href={`${SITE_URL}${pathname}${NextPage}`} /> */}

          {/* <!-- Meta Pixel Code --> */}
          <script>
            {` !function(f,b,e,v,n,t,s)
               {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
               n.callMethod.apply(n,arguments):n.queue.push(arguments)};
               if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
               n.queue=[];t=b.createElement(e);t.async=!0;
               t.src=v;s=b.getElementsByTagName(e)[0];
               s.parentNode.insertBefore(t,s)}(window, document,'script',
               'https://connect.facebook.net/en_US/fbevents.js');
               fbq('init', '1024172491523922');
               fbq('track', 'ViewContent'); 
            `}
          </script>
          {/* <!-- End Meta Pixel Code --> */}

          {/* Google tag (gtag.js)  */}
          {window.unbxd_category === 'Kids' ? (
            <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10998814704"></script>
          ) : null}

          {window.unbxd_category === 'Kids' ? (
            <script>
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
  
              gtag('config', 'AW-10998814704');
              `}
            </script>
          ) : null}

          {/* <!-- End Google tag --> */}

          {/* Meta Pixel Code  */}

          {window.unbxd_category === 'Kids' ? (
            <script>
              {`
          !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
     n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
     'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '645559940467490');
  fbq('track', 'PageView');
   `}
            </script>
          ) : null}



          {window.unbxd_category === 'Kids' ? (
            <noscript>{`<img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=645559940467490&ev=PageView&noscript=1"
            />
            `}</noscript>
          ) : null

          }
          {/* End Meta Pixel Code */}

        </Helmet>
        <Menu backBtn={false} search />
        <Div height="30px" />

        {/* eslint-disable react/no-danger */}
        <div ref={this.listingRef}>
          <ListingContainer
            wishList={wishListedSKUs}
            wishListData={wishListData}
            products={products}
            categoryName={categoryName}
            productCount={productCount}
            category={category}
            filters={filters}
            sortBy={sortBy}
            history={history}
            pincode={pincode}
            isLoggedIn={isLoggedIn}
            metaResults={metadata}
            breadCrumbs={breadCrumbs}
            categoryBar={categoryBar}
            selectedPincode={selectedPincode}
            sessionId={sessionId}
            cartSKUs={cartSKUs}
            reloadListing={reloadListing}
            setReloadListing={setReloadListing}
            bannerData={bannerData}
          />
        </div>

        {recsObj.catlevel1Name ? (
          <NewUnboxBestSeller pageInfo={recsObj} />
        ) : null}
        {seoInfo && seoInfo.seo_text && (
          <SeoContent pt="0">
            {/* Toggle showLessSeo and showMoreSeo className */}
            <div className={styles.new_seo_container}>
              <div
                dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }}
                className={showmore ? "showLessSeo" : "showMoreSeo"}
              />
            </div>
            <Button
              pl="0"
              pr="0"
              mb="0"
              size="block"
              ta="left"
              color={Theme.colors.primary}
              btnType="link"
              fontSize="0.875rem"
              className="seoMoreBtn"
              onClick={this.handleShowMore}
            >
              {showmore ? "Show More..." : "Show Less"}
            </Button>
          </SeoContent>
        )}
        <Footer />
      </div>
    );
  }
}
