import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import Div from 'hometown-components/lib/Div';
import ReloadNotification from 'components/ReloadNotification';
import MainSlider from 'components/MainSlider';
import SeoContent from 'components/SeoContent';
import Button from 'hometown-components/lib/Buttons';
import Theme from 'hometown-components/lib/Theme';
// import MainSlider2 from "components/MainSlider2";
// import MainSlider3 from "components/MainSlider3";
// import SlickSlider from "components/SlickSlider";
import TextCarousel from 'components/TextCarousel';

import { Shimmer, BackgroundMasker } from 'hometown-components/lib/Shimmer';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
// import Usp from 'components/Usp';
// import ProductSlider from 'components/Carousel/ProductSlider';
// import OfferBanner from 'components/Home/OfferBanner';
import NewUnboxRecentlyViewed from 'components/NewUnboxWidges/recentlyViewed';
import { getCities, getMiddleBannerData, getAnnouncement } from 'selectors/homepage';
import StoresCarousel from 'components/Stores';
import SignupModal from 'containers/Signup/SignupForm';
import ResponsiveModal from 'components/Modal';

import HomeComp from 'components/Home';

const PlaceHolderShimmer = () => (
  <Div mb="1rem">
    <Shimmer height="168px">
      <BackgroundMasker width="20%" height="25px" left="0" />
      <BackgroundMasker width="20%" height="25px" right="0" />
      <BackgroundMasker width="100%" height="10px" left="0" top="25px" />
      <BackgroundMasker width="15px" height="153px" left="0" top="35px" />
      <BackgroundMasker width="15px" height="153px" left="calc(15px + 153px)" top="35px" />
      <BackgroundMasker width="15px" height="153px" left="calc(15px + 153px + 15px + 153px)" top="35px" />
    </Shimmer>
  </Div>
);

@connect(
  ({
    homepage: { categories, banners, products, offers, announcement, dealoftheday, bestsellers, homepageData },
    homepage,
    stores
  }) => ({
    banners: banners.data,
    homepageCategories: categories.data,
    homepageProducts: products.data,
    middleBanner: getMiddleBannerData(offers),
    announcementBar: getAnnouncement(announcement),
    cities: getCities(stores),
    dealoftheday: dealoftheday.data,
    bestsellers: bestsellers.data,
    homepageData: homepageData.data.items.text,
    seoInfo: homepageData.data.items.seo_text
  })
)
export default class Home extends Component {
  state = {
    // showRibbon: true,
    openSignup: false,
    showmore: true
  };

  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  componentDidMount() {
    const { isLoggedIn, announcementBar } = this.props;
    if (!isLoggedIn && !(cookie.get('PROMO_SIGNUP') === 'AVOID')) {
      this.signupmodalreference = setTimeout(() => this.handleModal(), 10000);
    }
    // if (announcementBar) {
    //   const announcement = document.getElementById('announcement-bar');
    //   announcement.innerHTML = announcementBar;
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn && nextProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({
        openSignup: !this.state.openSignup
      });
    }
  }

  handleModal = () => {
    this.setState({ openSignup: !this.state.openSignup }, () => {
      if (!this.state.openSignup) {
        cookie.set('PROMO_SIGNUP', 'AVOID', { expires: 2 });
      }
    });
  };

  render() {
    const {
      homepageCategories,
      banners,
      homepageProducts,
      recentlyviewed,
      cities,
      middleBanner,
      dealoftheday,
      bestsellers,
      homepageData,
      seoInfo
    } = this.props;
    const {
      marquee,
      strip,
      shopByCategories,
      shopByRooms,
      bestSeat,
      styleYourHome,
      gifting,
      togetherInMoment,
      TheWayWeAreEntertainingNow,
      wfhAreBack,
      trendsWeLove1,
      trendsWeLove2,
      forYourMasterSuite,
      ourBeddingFavourites,
      forBetterSleep,
      shopOurNewArrivalFurniture,
      customiseYourHome,
      designAndBuild,
      getTheLook,
      getTheLook2,
      homePageBanners,
      midbanner,
      easyFinance,
      secondmainbanner
    } = homepageData;
    const { showmore } = this.state;
    const styles = require('./Home.scss');
    return (
      /* eslint-disable max-len */
      <div className={styles.home}>
        <Helmet title="Online Furniture Stores: Buy Home Decor, Furnishing, Tableware & Kitchenware Online at HomeTown">
          <meta
            name="description"
            content="Buy premium quality home furniture at HomeTown, India's largest online furniture store. Give your house a makeover with variety of home decor, furnishing & kitchenware items. Shop now!"
          />
          <meta name="keywords" content="furniture, home-decor" />
          <meta name="robots" content="index, follow" />
          <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "https://www.hometown.in/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.hometown.in/search/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}
          </script>
          <script type="application/ld+json">
            {`{
              "@context": "http://schema.org",
              "@type": "Organization",
              "name": "HomeTown",
              "image": "https://cdn.shopify.com/s/files/1/1231/6442/files/CW_logo-03_1_240x.png?v=1624623636",
              "@id": "support@cottonworld.net",
              "url": "https://www.hometown.in/",
              "telephone": "1800-210-0004",
              "address": {
              "@type": "PostalAddress",
              "streetAddress": "Praxis Home Retail Limited (“PHRL”), (f/k/a Praxis Home Retail Private Limited), iThink Techno Campus,Jolly Board Tower D, Ground Floor",
              "addressLocality": "Kanjurmarg (East), Mumbai",
              "postalCode": "400042",
              "addressCountry": "IN"
              },
              "sameAs": [
              "https://twitter.com/HomeTownLive",
              "https://www.facebook.com/hometown",
              "https://www.instagram.com/hometownlive/",
              "https://in.pinterest.com/hometownblog/"
              ]
            }`}
          </script>
          <script type="application/ld+json">
            {`{
      "@context":"http://schema.org",
      "@type":"ItemList",
      "itemListElement":[
                                 {
         "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Online Exclusive",
          "description": "Get Best Furniture Deals online on items for Sale at Upto 60% Off. Choose from a wide range of best deal furniture and best furniture deals online on wide range of products on HomeTown in India at the best prices ✔Fast Shipping, ✔High Quality ✔0% EMI ✔Free Assembly",
          "url":"https://www.hometown.in/hot-deals"
        },
{
         "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Home Packages",
          "description": "Get Best Deals on Customized Home Furniture Packages Online. Select from ⭐Full Home ⭐Living and Dining Room ⭐Bedroom Furniture Packages Basis Your Need & Budget At Best Prices From HomeTown.",
          "url":"https://www.hometown.in/packages"
        },
{
         "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Furniture",
          "description": "Furniture: Buy Wooden Furniture Online at upto 60% OFF. Explore wide range of furniture designs for ⭐Latest Bedroom Furniture ⭐Living Room Furniture & more at HomeTown ✔Free Installation ✔Easy EMI ✔Free Shipping",
          "url":"https://www.hometown.in/furniture"
        },
       {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Home Decor",
          "description": "Home Decor: Buy Home Decoration items & Accessories Online in India. Choose from a wide range of ✯Paintings ✯Photo Frames ✯Clocks ✯Indoor Plants ✯Wall Hangings ✯Lamps & more at HomeTown. ✔Exclusive Designs ✔Easy Finance ✔Free Assembly",
          "url":"https://www.hometown.in/home-decor"
        },
       {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Home Furnishing",
          "description": "Furnishings: Grab the Best Deal on Home Furnishing Items Online @ Upto 50% OFF. Shop from a wide range of ⭐Curtains ⭐Mats ⭐Blankets ⭐Pillows ⭐Bathroom Accessories from HomeTown ✔Free Shipping ✔Easy EMI",
          "url":"https://www.hometown.in/home-furnishings"
        },
            {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Tableware & Kitchenware",
          "description": "Kitchen Items: Buy Tableware and Kitchenware products online @ upto 50% OFF. Choose from ⭐Dinner Sets ⭐Crockery ⭐Induction Cooktops ⭐Kitchen Appliances & more online at best prices from HomeTown. ✔Easy Returns ✔Easy EMI",
          "url":"https://www.hometown.in/tableware-kitchenware"
        },
            {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Modular Kitchen",
          "description": "HomeTown provides personalised modular kitchen design services for small modular kitchen, L Shaped, U Shaped & more. Shop from a wide range of latest modular kitchen design at best price.",
          "url":"https://www.hometown.in/modular-kitchens"
        }
      ]
    }`}
          </script>
        </Helmet>
        <div className="wrapper">
          <Menu addToHomeBtn />

          <TextCarousel data={marquee} />

          <MainSlider data={banners} mb="30px" />

          {/* <MainSlider3 mb="30px" /> */}

          <HomeComp
            bestsellers={bestsellers}
            strip={strip}
            dealoftheday={dealoftheday}
            shopByCategories={shopByCategories}
            shopByRooms={shopByRooms}
            bestSeat={bestSeat}
            styleYourHome={styleYourHome}
            gifting={gifting}
            togetherInMoment={togetherInMoment}
            TheWayWeAreEntertainingNow={TheWayWeAreEntertainingNow}
            wfhAreBack={wfhAreBack}
            trendsWeLove1={trendsWeLove1}
            trendsWeLove2={trendsWeLove2}
            forYourMasterSuite={forYourMasterSuite}
            ourBeddingFavourites={ourBeddingFavourites}
            forBetterSleep={forBetterSleep}
            shopOurNewArrivalFurniture={shopOurNewArrivalFurniture}
            customiseYourHome={customiseYourHome}
            designAndBuild={designAndBuild}
            getTheLook={getTheLook}
            getTheLook2={getTheLook2}
            homePageBanners={homePageBanners}
            midbanner={midbanner}
            easyFinance={easyFinance}
            secondmainbanner={secondmainbanner}
          />

          <LazyLoad height={168} once>
            <NewUnboxRecentlyViewed
              pageInfo={{
                pageType: 'HOME',
                productIds: ['']
              }}
            />
          </LazyLoad>

          <LazyLoad placeholder={<PlaceHolderShimmer />} height={350}>
            <StoresCarousel cities={cities} />
          </LazyLoad>
        </div>

        {seoInfo && (
          <SeoContent>
            <div dangerouslySetInnerHTML={{ __html: seoInfo }} className={showmore ? 'showLessSeo' : 'showMoreSeo'} />
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
              {showmore ? 'Show More...' : 'Show Less'}
            </Button>
          </SeoContent>
        )}
        <Footer />
        <ReloadNotification />
        {/* <ResponsiveModal
          classNames={{ modal: 'addToHomeModal', overlay: 'addToHomeModalOverlay', closeButton: 'closeAth' }}
          onCloseModal={this.handleModal}
          open={this.state.open}
        >
          <AddToHomescreen onclick={this.handleModal} />
        </ResponsiveModal> */}
        <ResponsiveModal
          // classNames={{ modal: 'signupModal' }}
          onCloseModal={this.handleModal}
          open={this.state.openSignup}
        >
          <SignupModal />
        </ResponsiveModal>
      </div>
    );
  }
}

Home.defaultProps = {
  banners: [],
  homepageCategories: [],
  homepageProducts: [],
  recentlyviewed: [],
  cities: [],
  middleBanner: {},
  announcementBar: '',
  dealoftheday: {}
};

Home.propTypes = {
  banners: PropTypes.array,
  homepageProducts: PropTypes.array,
  homepageCategories: PropTypes.array,
  recentlyviewed: PropTypes.array,
  cities: PropTypes.array,
  middleBanner: PropTypes.object,
  announcementBar: PropTypes.string,
  dealoftheday: PropTypes.object
};
