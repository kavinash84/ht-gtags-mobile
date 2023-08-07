/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable max-len */
import React, { Component } from 'react';
// import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { BASE_IMAGE_URL } from "helpers/Constants";

/**
 * Components
 */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Card from 'hometown-components-dev/lib/CardHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';

/**
 * Page Components
 */
// import Title from 'newComponents/Title';
import Footer from 'newComponents/Footer';
import MainSlider from 'newComponents/MainSliderHome';
import CategoryCarouselLook from 'newComponents/CategoryCarouselLook';
import CategoryCarousel from 'newComponents/CategoryCarouselHome';
import CategoryCarouselDeals from 'newComponents/CategoryCarouselDeals';
// import Usp from 'newComponents/Usp';
import ShopByCategories from 'newComponents/ShopByCategories';
import StyleYourHome from 'newComponents/StyleYourHome';
import Menu from 'newComponents/Menu';
import UnbxdRecentlyViewed from 'components/UnbxdRecentlyViewed/UnbxdRecentlyViewed';

/**
 * selectors / Modules
 */
import { getCities, getMiddleBannerData } from 'selectors/homepage';

const arrowForward = require('../../../static/new/newForwardArrow.svg');


const banner01 = require('../../../static/new/Banner01.png');
const banner02 = require('../../../static/new/Banner02.png');
const banner03 = require('../../../static/new/Banner03.png');
const FathersDayGift = require('../../../static/banners/FathersDayGift.png');
const TogetherInTheMomemt = require('../../../static/banners/TogetherInTheMoment.png');
const TheWayWeAreEntertainingNow = require('../../../static/banners/TheWayWeAreEntertainingNow.png');
const MidBanner = require('../../../static/banners/MidBanner.png');
const WorkFromHome = require('../../../static/banners/WorkFromHome.png');
const TrendsWeLove = require('../../../static/banners/TrendsWeLove.png');
const NewArrival = require('../../../static/banners/NewArrival.png');
const DesignBuild = require('../../../static/banners/Design_Build.png');
const ModularKitchen = require('../../../static/banners/Mod_Kitchen.png');
const EasyEmi01 = require('../../../static/EasyEmi/EasyEmi1.png');
const EasyEmi02 = require('../../../static/EasyEmi/EasyEmi2.png');
const GetTheLook01 = require('../../../static/getTheLook/GetTheLook01.png');
const GetTheLook02 = require('../../../static/getTheLook/GetTheLook02.png');
const GetTheLook03 = require('../../../static/getTheLook/GetTheLook03.png');
const GetTheLook04 = require('../../../static/getTheLook/GetTheLook04.png');
const GetTheLook05 = require('../../../static/getTheLook/GetTheLook05.png');
const GetTheLook06 = require('../../../static/getTheLook/GetTheLook06.png');


const customDropdownStyles = {
  container: provided => ({
    ...provided,
    width: '100%'
  }),
  control: provided => ({
    ...provided,
    height: 48,
    borderRadius: 0,
    border: 'none',
    backgroundColor: 'rgba(255,255,255, 0.8)'
  }),
  placeholder: provided => ({
    ...provided,
    color: '#4a4949'
  }),
  indicatorsContainer: provided => ({
    ...provided,
    path: {
      fill: '#4a4949'
    }
  })
};

// const PlaceHolderShimmer = () => (
//   <Box mb="1rem">
//     <Box height="168px">
//       <Image width="20%" height="25px" left="0" />
//       <Image width="20%" height="25px" right="0" />
//       <Image width="100%" height="10px" left="0" top="25px" />
//       <Image width="15px" height="153px" left="0" top="35px" />
//       <Image width="15px" height="153px" left="calc(15px + 153px)" top="35px" />
//       <Image width="15px" height="153px" left="calc(15px + 153px + 15px + 153px)" top="35px" />
//     </Box>
//   </Box>
// );

@connect(({
  homepage: {
    categories,
    banners,
    products,
    offers,
    bestsellers,
    dealoftheday, // shopbyroom, // shopbycategory,
    hostandtoast1,
    hostandtoast2,
    styleyourhome,
    staticbanners
  },
  recently,
  stores,
  userLogin
}) => ({
  // instafeeds
  banners: banners.data,
  staticbanners: staticbanners.data,
  homepageCategories: categories.data,
  homepageProducts: products.data,
  bestsellers: bestsellers.data,
  hostandtoast1: hostandtoast1.data,
  hostandtoast2: hostandtoast2.data,
  styleyourhome: styleyourhome.data,
  dealoftheday: dealoftheday.data,
  // shopbycategory: shopbycategory.data.items.text.shop_by_category,
  // shopbyroom: shopbyroom.data.items.text.shop_by_room,
  middleBanner: getMiddleBannerData(offers),
  recentlyviewed: recently.data,
  // hashtags: hashtags.data,
  cities: getCities(stores),
  isLoggedIn: userLogin.isLoggedIn
  // instafeeds: instafeeds.data,
}))
export default class Home extends Component {
  state = {
    open: true,
    selectedCity: '',
    citySelectError: false,
    cityErrorMessage: 'Please select your nearest city',
    getTheLook1: [
      {
        image: GetTheLook01,
        name: 'Paddington Plus Fabric Three Sofa in Beige Color By HomeTown',
        link: '/paddington-plus-fabric-three-sofa-in-beige-color-by-hometown/sku/HO340FU19UBOHTFUR'
      },
      {
        image: GetTheLook04,
        name: 'Shine Plywood Sofa Cum bed in Brown Color by HomeTown',
        link: '/shine-plywood-sofa-cum-bed-in-brown-color-by-hometown/sku/HO340SO96BEDHTFUR'
      },
      {
        image: GetTheLook05,
        name: 'Morpheus Fabric Two Seater Recliner With Console in Grey Color by HomeTown',
        link: '/morpheus-fabric-two-seater-recliner-with-console-in-grey-color-by-hometown/sku/HO340FU67PSEHTFUR'
      }
    ],
    getTheLook2: [
      {
        image: GetTheLook06,
        name: 'Bolton Engineered Wood Three Door wardrobe in Wenge Colour by HomeTown',
        link: '/bolton-engineered-wood-three-door-wardrobe-in-wenge-colour-by-hometown/sku/HO340WA78EHPHTFUR'
      },
      {
        image: GetTheLook02,
        name: 'Relaxo Engineered Wood Box Storage Queen Size Bed in Wenge Colour by Vickys.',
        link: '/relaxo-engineered-wood-box-storage-queen-size-bed-in-wenge-colour-by-vickys/sku/HO340FU05SHYHTFUR'
      },
      {
        image: GetTheLook03,
        name: 'Swirl Engineered Wood Bedside Table in Multi Color by HomeTown.',
        link: '/swirl-engineered-wood-bedside-table-in-multi-color-colour-by-hometown/sku/HO340SG05FPEHTFUR'
      }
    ],

    shopByRoom: [
      {
        image: `${BASE_IMAGE_URL}/media/cms/extras/ShopByRoom01.png`,
        name: 'Living Room',
        description:
          'From classic neutrals to chic modern, our living room furniture collection has something for everyone home. Shop sofas, recliners, coffee tables, end tables, media units, ottomans and much more',
        link: '/furniture/living-room-furniture'
      },
      {
        image: `${BASE_IMAGE_URL}/media/cms/extras/ShopByRoom02.png`,
        name: 'Dining',
        description:
          'Casual get-togethers or intimate soirees, our dining room furniture collection has the perfect pieces to make every moment into a memorable one. Shop dining room sets, dining chairs, bar stools, sideboards or serving trolleys',
        link: '/furniture/dining-kitchen-furniture'
      },
      {
        image: `${BASE_IMAGE_URL}/media/cms/extras/ShopByRoom03.png`,
        name: 'Bedroom',
        description:
          'Grand master suites to cosy sleep rooms, our bedroom furniture collection in classic, contemporary or modern designs make for a perfect sleep haven. Shop beds, wardrobes, dressers, nights stand and much more.',
        link: '/furniture/bedroom-furniture'
      },
      {
        image: `${BASE_IMAGE_URL}/media/cms/extras/ShopByRoom04.png`,
        name: 'Kids room',
        description:
          'Girl bedrooms or boy bedrooms, ourkids furniture range is perfect to fuel their imagination and compliment their personalities. Shop bunked beds, themed bedroom sets, study desk, book shelves and much more',
        link: '/furniture/kids-furniture'
      },
      {
        image: `${BASE_IMAGE_URL}/media/cms/extras/ShopByRoom05.png`,
        name: 'Home Office',
        description:
          "Formal study or cozy work area, create a space you'll love to work in. Shop study table, office chairs, filling storage cabinets and book shelves",
        link: '/furniture/study-office-furniture'
      }
    ]
  };

  handleModal = () => {
    this.setState({
      open: !this.state.open
    });
  };
  mapHandler = e => {
    e.preventDefault();
    const { selectedCity } = this.state;
    if (selectedCity) {
      this.props.history.push({
        pathname: '/store-locator',
        state: { city: selectedCity }
      });
    } else {
      this.setState({
        citySelectError: true
      });
    }
  };

  getProduct = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  render() {
    const {
      // homepageCategories,
      banners,
      cities,
      dealoftheday,
      bestsellers,
      shopbycategory,
      shopbyroom,
      // isLoggedIn,
      hostandtoast1,
      hostandtoast2,
      styleyourhome,
      staticbanners
      // instafeeds
    } = this.props;
    const citiesList = cities.map(item => ({ value: item, label: item }));
    const {
      citySelectError, cityErrorMessage, getTheLook1, getTheLook2, shopByRoom
    } = this.state;

    return (
      /* eslint-disable max-len */
      <Wrapper sx={{ overflowX: 'hidden' }}>
        {/* <Helmet title="Online Furniture Shopping, Buy Decor Items in India - HomeTown.in"> */}
        {/* <meta
            name="description"
            content="HomeTown - Shop online for Furniture, Home Decor, Furnishings, Kitchenware, Dining Products at best prices from HomeTown.in. Get best furniture and home decor products ☆Upto 40% Off, ☆Fast Shipping, ☆High Quality, ☆Premium, ☆Luxury furniture to beautify your ☆bedroom, ☆kitchen, ☆dining room, ☆living and ☆outdoor space ☆Original ☆0% EMI ☆Free Assembly ☆Safe Shipping."
          />
          <meta name="keywords" content="furniture, home-decor" />
          <meta name="robots" content="index, follow" /> */}
        {/* <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "https://m.hometown.in/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.hometown.in/search/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}
          </script> */}
        {/* </Helmet> */}
        <Menu />
        <Body mt={120}>
          <marquee width="100%" direction="left" style={{ padding: '20px', backgroundColor: '#FAF4F2' }}>
            <p style={{ borderLeft: '2px solid #F47020', paddingLeft: '10px', fontSize: '14px' }}>
              Free delivery above Rs.499
            </p>
          </marquee>

          <MainSlider data={banners} />

          {/* USP Section
          <Usp /> */}

          {/* Shop By Category */}
          <ShopByCategories />

          {/* New shop by room section */}

          {/* <Box my={20}>
            <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
              <CategoryCarousel
                categoryName="Shop by Rooms"
                subTitle="Living Room"
                // data={shopbyroom.values}         // To be made dynamic after api is ready
                description="From classic neutrals to chick modern, our living room furniture collection has something for everyone home. Shop sofas, recliners, coffee tables, end tables, media units, ottomans and much more"
                colSize="45%"
                link="/furniture/living-room-furniture"
              />
            </LazyLoad>
          </Box> */}
          <Box mt={20} mb={15}>
            <CategoryCarousel 
              categoryName="Shop By Rooms"
              // subTitle="Living Room"
              data={shopByRoom} // To be made dynamic after api is ready
              // description="From classic neutrals to chick modern, our living room furniture collection has something for everyone home. Shop sofas, recliners, coffee tables, end tables, media units, ottomans and much more"
              colSize="45%"
              // link="/furniture/living-room-furniture"
            />
          </Box>

          {/* deals of the day - Pasha */}

          {/* {dealoftheday && (
            <Box px={0} mt={30} mb={15}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <CategoryCarouselDeals
                  categoryName="Deals of the day"
                  colSize="45%"
                  // name="Bolton Engineered Wood King bed with Box storage in Wenge Colour by HomeTown"
                  // image={banner2}
                  // offerPrice="₹50"
                  // maxPrice="₹100"
                  // discount="₹50"
                  // coupon="New50"
                  // coupon="Ends Today"
                  // token="NEW15"
                  // button="SHOP NOW →"
                  id={1}
                  data={dealoftheday}
                />
              </LazyLoad>
            </Box>
          )} */}
          {dealoftheday && dealoftheday.length ? (
            <Box px={0}>
              <CategoryCarouselDeals categoryName="Deals Of The Day" colSize="45%" id={1} data={dealoftheday} />
            </Box>
          ) : null}

          {/* Best seats in the house */}
          <Box>
            <Heading mb={20} fontSize="22px" textAlign="center">
              Best Seat In the House
            </Heading>
            <Link to="/furniture/living-room-furniture/sofas"
             onClick={() => {
          window.dataLayer.push({
            event: 'pt_global_click_link_banner_click',
            pagetype: '',
            source_page_url: window.location.href,
            previous_page_url: '',
            destination_page_url: url,
            login_status: '',
            user_id: '',
            page_url: window.location.href,
            banner_id: '',
            click_text: ''
          })
     
            }}
            >
              <h5 style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bolder' }}>
                SHOP SOFAS AND RECLINERS{' '}
                <img
                  style={{
                    display: 'inline',
                    marginLeft: '-8px',
                    height: '10px',
                    width: '40px'
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </h5>
              <Image mt={20} src={banner01} />
            </Link>

            {/* Get the look - Pasha */}
            {/* <Box p={30}>
              <Heading mb={20}>Get the Look</Heading>
              <Box>
                <Link to="/">
                  <Image src={GetTheLook01} alt={GetTheLook01} />
                  <Text mt={10} color="#323F38" fontSize="0.9rem" lineHeight="1.2rem">Tiago Engineered Wood King bed without storage in Wenge Colour</Text>
                </Link>
              </Box>
            </Box> */}
            <Box px={20} pt={30} mb={15} pb={15} bg="#F9F9F9">
              {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
              <CategoryCarouselLook categoryName="Get the Look" colSize="45%" id={1} data={getTheLook1} />
              {/* </LazyLoad> */}
            </Box>
          </Box>

          {/* Style your home */}
          <StyleYourHome />

          {/* Shop homeware */}

          <Box mb={20}>
            <Heading textAlign="center" fontSize={22} mb={15}>
              Shop Homeware
            </Heading>
            <div
              style={{
                width: '30px',
                borderTop: '2px solid #222222',
                margin: 'auto',
                marginBottom: '10px'
              }}
            />
            <Box my={25}>
              <Link to="/home-decor/garden/plants">
                <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ShopHomeware01.png`} alt="ShopHomeware01" />
              </Link>
            </Box>
            <Box mb={25}>
              <Link to="/home-decor/fountains">
                <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ShopHomeware02.png`} alt="ShopHomeware02" />
              </Link>
            </Box>
            <Box mb={25}>
              <Link to="/tableware-kitchenware/serveware">
                <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ShopHomeware03.png`} alt="ShopHomeware03" />
              </Link>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/cookware">
                <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ShopHomeware04.png`} alt="ShopHomeware04" />
              </Link>
            </Box>
          </Box>

          {/* Fathers day gift */}

          <Box>
            <Heading mb={10} textAlign="center" fontSize={22}>
              Fathers Day Gift
            </Heading>
            <Link to="/furniture/accent-furniture/coat-hangers">
              <h5 style={{ textAlign: 'center', fontSize: '12px' }}>
                SHOP GIFTING
                <img
                  style={{
                    display: 'inline',
                    marginLeft: '-6px',
                    height: '10px',
                    width: '40px'
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </h5>
              <Image mt={10} width={1} src={FathersDayGift} alt={FathersDayGift} />
            </Link>
          </Box>

          {/* Together in the momemt */}

          <Box mt={30}>
            <Heading mb={15} textAlign="center" fontSize={22}>
              Together In The Moment
            </Heading>
            <Link to="/furniture/dining-kitchen-furniture/dining-sets">
              <h5 style={{ textAlign: 'center', fontSize: '12px' }}>
                SHOP DINING SETS
                <img
                  style={{
                    display: 'inline',
                    marginLeft: '-6px',
                    height: '10px',
                    width: '40px'
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </h5>
              <Image mt={20} src={TogetherInTheMomemt} alt={TogetherInTheMomemt} />
            </Link>
          </Box>

          {/* The way we are entertaining now */}

          <Box mt={0} px={25} py={30} bg="#FAF4F2">
            <Heading mb={15} px={40} sx={{ lineHeight: '1.8rem' }} textAlign="center" fontSize={22}>
              The Way We're Entertaining Now
            </Heading>
            <Link to="/tableware">
              <h5 style={{ textAlign: 'center', fontSize: '12px' }}>
                SHOP TABLEWARE
                <img
                  style={{
                    display: 'inline',
                    marginLeft: '-6px',
                    height: '10px',
                    width: '40px'
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </h5>
              <Image mt={20} src={TheWayWeAreEntertainingNow} alt={TheWayWeAreEntertainingNow} />
            </Link>
            <Text mt={20} textAlign="center" color="#545454" fontSize="14px" lineHeight="1.2rem">
              Set the table with plates, bowls, mugs and cutlery in classic styles, fine designs and bold colours
            </Text>
          </Box>

          {/* Mid banner */}

          <Box my={30}>
            <Link to="/furniture">
              <Image src={MidBanner} width="100%" alt={MidBanner} sx={{ display: 'block' }} />
            </Link>
          </Box>

          {/* WFH favorites */}

          <Box my={30}>
            <Link to="/furniture/study-office-furniture">
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    backgroundImage: 'linear-gradient(to bottom, white, transparent) !important',
                    top: '0px',
                    position: 'absolute'
                  }}
                  width={1}
                >
                  <Heading fontSize={22} textAlign="center" mb={10}>
                    Wfh Favourites Are Back
                  </Heading>
                  <Text fontSize={14} textAlign="center">
                    Desks and Chairs are ready to ship.
                  </Text>
                </Box>
                <Image src={WorkFromHome} width="100%" alt={WorkFromHome} />
                <h6
                  style={{
                    position: 'absolute',
                    bottom: '30px',
                    textAlign: 'center',
                    fontSize: '12px',
                    width: '100%'
                  }}
                >
                  SHOP NOW{' '}
                  <img
                    style={{
                      display: 'inline',
                      marginLeft: '-6px',
                      height: '10px',
                      width: '40px'
                    }}
                    src={arrowForward}
                    alt="Arrow"
                  />
                </h6>
              </Box>
            </Link>
          </Box>

          {/* trends we love */}
          <Box p={30}>
            <Heading fontSize={22}>trends we love</Heading>
            <Link to="/home-decor">
              <Image src={TrendsWeLove} alt={TrendsWeLove} />
            </Link>
          </Box>

          {/* For you master suite */}

          <Box bg="#F2F2F2" py={30}>
            <Heading mb={20} fontSize={22} textAlign="center">
              For Your Master Suite
            </Heading>
            <Link to="/furniture/bedroom-furniture">
              <h5 style={{ textAlign: 'center', fontSize: '12px' }}>
                SHOP BEDROOMS
                <img
                  style={{
                    display: 'inline',
                    marginLeft: '-6px',
                    height: '10px',
                    width: '40px'
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </h5>
              <Image mt={20} src={banner02} />
            </Link>

            {/* Get the look - Pasha */}

            {/* <Box p={30}>
              <Heading mb={20}>Get the Look</Heading>
              <Box>
                <Link to="/">
                  <Image src={GetTheLook01} alt={GetTheLook01} />
                  <Text mt={10} color="#323F38" fontSize="0.9rem" lineHeight="1.2rem">Tiago Engineered Wood King bed without storage in Wenge Colour</Text>
                </Link>
              </Box>
            </Box> */}
            <Box px={20} mt={30} mb={15}>
              {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
              <CategoryCarouselLook categoryName="Get the Look" colSize="45%" id={1} data={getTheLook2} />
              {/* </LazyLoad> */}
            </Box>
            {/* <Box px={20} mt={30} mb={15}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <CategoryCarouselLook categoryName="Get the Look" colSize="45%" id={1} data={getTheLook2} />
              </LazyLoad>
            </Box> */}
          </Box>

          {/* Our fav summer sheets */}

          <Box py={30}>
            <Heading mb={15} fontSize={22} textAlign="center">
              Our Favorite Summer Sheets
            </Heading>
            <Link to="/home-furnishings/bedding">
              <h5 style={{ textAlign: 'center', fontSize: '12px' }}>
                SHOP BEDDING
                <img
                  style={{
                    display: 'inline',
                    marginLeft: '-6px',
                    height: '10px',
                    width: '40px'
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </h5>
              <Image mt={20} src={banner03} />
            </Link>
            <Text px={35} mt={20} textAlign="center" color="#898989" fontSize={15} lineHeight="1.2rem">
              Bring plush style and comfort to your bedroom with our wide range of bedsheets, comforters, duvets
            </Text>
          </Box>

          {/* For a better sleep */}

          <Box px={30}>
            <Heading
              pt={40}
              textAlign="center"
              sx={{ backgroundImage: 'linear-gradient(to bottom, #F5F5F5, transparent) !important' }}
              fontSize={24}
              mb={15}
            >
              For A Better Sleep
            </Heading>
            <div
              style={{
                width: '30px',
                borderTop: '2px solid #222222',
                margin: 'auto',
                marginBottom: '20px'
              }}
            />
            <Link to="/furniture/bedroom-furniture">
              <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ForABetterSleep.png`} alt="ForABetterSleep" />
            </Link>
            <Box mt={30}>
              <Row justifyContent="space-between" pb={5}>
                <Col variant="col-6">
                  <Link to="/furniture/mattresses">
                    <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ForABetterSleep01.png`} alt="ForABetterSleep01" />
                  </Link>
                </Col>
                <Col variant="col-6">
                  <Link to="/home-furnishings/pillows">
                    <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ForABetterSleep02.png`} alt="ForABetterSleep02" />
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col variant="col-6">
                  <Link to="/home-furnishings/bedding/comforters">
                    <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ForABetterSleep03.png`} alt="ForABetterSleep03" />
                  </Link>
                </Col>
                <Col variant="col-6">
                  <Link to="/home-furnishings/protectors/mattress-protectors">
                    <Image src={`${BASE_IMAGE_URL}/media/cms/extras/ForABetterSleep04.png`} alt="ForABetterSleep04" />
                  </Link>
                </Col>
              </Row>
            </Box>
          </Box>

          {/* Shop our best sellers - Pasha */}

          {/* {bestsellers && (
            <Box px={10} mt={30} mb={15}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <CategoryCarouselDeals
                  categoryName="Shop our Bestsellers"
                  colSize="45%"
                  // name="Bolton Engineered Wood King bed with Box storage in Wenge Colour by HomeTown"
                  // image={banner2}
                  // offerPrice="₹50"
                  // maxPrice="₹100"
                  // discount="₹50"
                  // coupon="New50"
                  // coupon="Ends Today"
                  // token="NEW15"
                  // button="SHOP NOW →"
                  id={2}
                  data={bestsellers}
                />
              </LazyLoad>
            </Box>
          )} */}
          {bestsellers && bestsellers.length ? (
            <Box px={10} mt={30} mb={15} bg="#F7F0F0">
              <CategoryCarouselDeals categoryName="Shop our Bestsellers" colSize="45%" id={2} data={bestsellers} />
            </Box>
          ) : null}

          {/* New arrivals */}
          <Box mt={20}>
            <Heading textAlign="center" fontSize={22} pt={20} mb={15}>
              New Arrivals
            </Heading>
            <div
              style={{
                width: '30px',
                borderTop: '2px solid #222222',
                margin: 'auto',
                marginBottom: '20px'
              }}
            />
            <Link to="/furniture/living-room-furniture/accent-chairs">
              <Image src={NewArrival} alt={NewArrival} />
            </Link>
          </Box>

          {/* D&B and MK */}

          <Box mt={30} px={20}>
            <Box p={20} sx={{ border: '2px solid black' }}>
              <Box>
                <Heading textAlign="center" fontSize={22} pt={10} px={20} mb={15} color="#222222" lineHeight="30px">
                  Customise Your Home With Us
                </Heading>
                <div
                  style={{
                    width: '30px',
                    borderTop: '2px solid #222222',
                    margin: 'auto',
                    marginBottom: '20px'
                  }}
                />
                <Image src={DesignBuild} alt={DesignBuild} />
                <Box bg="#F2F2F2" width="100vw" ml="-40px" px={40} pt={100} pb={30} mt="-90px">
                  <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Design & Build</h3>
                  <Text color="#B9B5B4" fontSize="14px" lineHeight="1.2rem" mb={20}>
                    Interior Design Solutions for every space, customised for you. Set up consultation with our Design
                    expert
                  </Text>
                  <Link to="/design-build/" target="_blank" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    KNOW MORE
                    <img
                      style={{
                        display: 'inline',
                        marginLeft: '-6px',
                        height: '10px',
                        width: '40px'
                      }}
                      src={arrowForward}
                      alt="Arrow"
                    />
                  </Link>
                </Box>
              </Box>
              <Box mx="-22px" pt={10} px={20} sx={{ border: '2px solid white' }}>
                <Box>
                  {/* <Heading textAlign="center" my={20}>Customise Your Home With Us</Heading> */}
                  <Image pt={30} src={ModularKitchen} alt={ModularKitchen} />
                  <Box bg="#F2F2F2" width="100vw" ml="-40px" px={40} pt={100} pb={30} mt="-90px">
                    <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Modular Kitchen</h3>
                    <Text color="#B9B5B4" fontSize="14px" lineHeight="1.2rem" mb={20}>
                      Customise your kitchen from a wide range of styles, materials and finishes. Choose from over 300
                      styles.
                    </Text>
                    <Link to="/modular-kitchens/" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      KNOW MORE
                      <img
                        style={{
                          display: 'inline',
                          marginLeft: '-6px',
                          height: '10px',
                          width: '40px'
                        }}
                        src={arrowForward}
                        alt="Arrow"
                      />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Shop the room to be hidden */}

          {/* shop your fav brands */}

          {/* Easy finance - static images */}

          <Box px={30} py={20} mt={30} bg="#F5EEEE">
            <Heading pb={30} pt={10} textAlign="center">
              Easy Finance
            </Heading>
            <Row>
              <Col variant="col-6">
                <Box bg="white" height={200} pt={30} pb={10} px={10}>
                  <Box height={30} px={10}>
                    <Image src={EasyEmi01} width={1} />
                  </Box>
                  <Box px={10} mt={20}>
                    <Heading fontSize={14} mb={5}>
                      0% Interest
                    </Heading>
                    <Text fontSize={12} lineHeight="18px" color="#575757">
                      On upto 6 months EMI for orders above 3000
                    </Text>
                  </Box>
                </Box>
              </Col>
              <Col variant="col-6">
                <Box bg="white" height={200} pt={30} pb={10} px={10}>
                  <Box height={30} px={10}>
                    <Image src={EasyEmi02} width={1} />
                  </Box>
                  <Box px={10} mt={20}>
                    <Heading fontSize={14} mb={5}>
                      0% Interest
                    </Heading>
                    <Text fontSize={12} lineHeight="18px" color="#575757">
                      On upto 6 months EMI for orders above 3000
                    </Text>
                  </Box>
                </Box>
              </Col>
            </Row>
          </Box>

          {/* Recently view - widget */}

          <Box>
            <UnbxdRecentlyViewed />
          </Box>

          {/* Stores */}

          {/* {!isLoggedIn &&
            staticbanners.length &&
            staticbanners.map(ban => (
              <Link to="/signup">
                <Box>
                  <Image src={ban.id === 3 ? ban.image : null} width="90%" m="auto" alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
            ))} */}

          {/* {staticbanners.length &&
            staticbanners.map(ban => {
              if (ban.id === 1) {
                return (
                  <Link to={ban.target_url}>
                    <Box>
                      <Image src={ban.image} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                    </Box>
                  </Link>
                );
              }
            })} */}
          {/* <Link to="/furniture/dining-kitchen-furniture/dining-sets">
            <Box>
              <Image src={offer2} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
            </Box>
          </Link>
          <Link to="/home-furnishings/bedding/comforters">
            <Box>
              <Image src={offer3} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
            </Box>
          </Link> */}

          {/* Categories Carousel */}
          {/* {homepageCategories.map((category, index) => (
            <Box px={10} mb={30}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150} key={String(index)}>
                <CategoryCarousel
                  categoryName={category.title}
                  subTitle={category.sub_title}
                  data={category.values}
                  colSize="45%"
                />
              </LazyLoad>
            </Box>
          ))} */}

          {/* {shopbyroom && (
            <Box px={10} my={30}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <CategoryCarousel
                  categoryName={shopbyroom.title}
                  // subTitle={category.sub_title}
                  data={shopbyroom.values}
                  colSize="45%"
                />
              </LazyLoad>
            </Box>
          )} */}

          {/* {shopbycategory && (
            <Box px={10} my={30}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <CategoryCarousel
                  categoryName={shopbycategory.title}
                  // subTitle={category.sub_title}
                  data={shopbycategory.values}
                  colSize="45%"
                />
              </LazyLoad>
            </Box>
          )} */}

          {/* {dealoftheday && (
            <Box px={10} mt={30} mb={15}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <CategoryCarousel
                  categoryName={dealoftheday.title}
                  // subTitle={category.sub_title}
                  data={dealoftheday.values}
                  colSize="45%"
                />
              </LazyLoad>
            </Box>
          )} */}

          {/* {staticbanners.length &&
            staticbanners.map(ban => (
              <Link to="/furniture/living-room-furniture/sofas">
                <Box>
                  <Image
                    src={ban.id === 2 ? ban.image : null}
                    width="90%"
                    m="auto"
                    my={10}
                    alt=""
                    sx={{ display: 'block' }}
                  />
                </Box>
              </Link>
            ))} */}

          {/* <Link to="/tableware-kitchenware/kitchen-essentials/kitchen-tools">
            <Box mt={20}>
              <Image src={banner2} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
            </Box>
          </Link> */}

          {/* <Box mt={30}>
            <Title
              title="STYLE YOUR HOME"
              headerProps={{
                variant: 'heading.medium',
                fontFamily: 'medium',
                textAlign: 'center'
              }}
            />
            <Text variant="regular" mx="auto" sx={{ textAlign: 'center', fontSize: '0.7rem', width: '90%' }}>
              We have everything you need to make her feel special. We have everything you need to make her feel
              special. We have everything you need to make her feel special.
            </Text>
            {styleyourhome.length &&
              styleyourhome.map(syh => (
                <Box>
                  <Link to={syh.target_url}>
                    <Box mt={20}>
                      <Image src={syh.image} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                    </Box>
                  </Link>
                  <Text variant="regular" textAlign="center" color="black">
                    {syh.title}
                  </Text>
                </Box>
              ))} */}
          {/* <Box>
              <Link to="/home-decor/vases-flowers/vases">
                <Box mt={20}>
                  <Image src={styleYourHome1} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Vases
              </Text>
            </Box>
            <Box>
              <Link to="/home-decor/idols-figurines/idols">
                <Box mt={20}>
                  <Image src={styleYourHome2} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Idols
              </Text>
            </Box>
            <Box>
              <Link to="/home-decor/candles-fragrances/candle-holders">
                <Box mt={20}>
                  <Image src={styleYourHome3} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Candle Holders and Votives
              </Text>
            </Box>
            <Box>
              <Link to="/home-decor/idols-figurines/figurines">
                <Box mt={20}>
                  <Image src={styleYourHome4} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Figurines
              </Text>
            </Box>
            <Box>
              <Link to="/home-furnishings/covers-inserts/modern-cushion-covers">
                <Box mt={20}>
                  <Image src={styleYourHome5} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Cushions
              </Text>
            </Box>
            <Box>
              <Link to="/home-decor/garden/plants">
                <Box mt={20}>
                  <Image src={styleYourHome6} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Planters
              </Text>
            </Box> */}
          {/* </Box> */}

          {/* <Box mt={30}>
            <Title
              title="HOST AND TOAST"
              headerProps={{
                variant: 'heading.medium',
                fontFamily: 'medium',
                textAlign: 'center'
              }}
            />
            <Text variant="regular" mx="auto" sx={{ textAlign: 'center', fontSize: '0.7rem', width: '90%' }}>
              We have everything you need to make her feel special. We have everything you need to make her feel
              special. We have everything you need to make her feel special.
            </Text>
            {hostandtoast1.length &&
              hostandtoast1.map(hat => (
                <Box>
                  <Link to={hat.target_url}>
                    <Box mt={20}>
                      <Image src={hat.image} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                    </Box>
                  </Link>
                  <Text variant="regular" textAlign="center" color="black">
                    {hat.title}
                  </Text>
                </Box>
              ))} */}
          {/* <Box>
              <Link to="/tableware-kitchenware/serveware/serving-sets">
                <Box mt={20}>
                  <Image src={hostAndToast1} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Serveware
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/drinkware/bar-glassware">
                <Box mt={20}>
                  <Image src={hostAndToast2} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Glassware
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/crockery/serving-bowls">
                <Box mt={20}>
                  <Image src={hostAndToast3} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Dinnerware
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/coffee-tea/coffee-mugs">
                <Box mt={20}>
                  <Image src={hostAndToast4} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Mugs
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/serveware/serving-sets">
                <Box mt={20}>
                  <Image src={hostAndToast1} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Serveware
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/drinkware/bar-glassware">
                <Box mt={20}>
                  <Image src={hostAndToast2} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Glassware
              </Text>
            </Box> */}
          {/* </Box> */}

          {/* <Box mt={20}>
            <Title
              title="HOST AND TOAST"
              headerProps={{
                variant: 'heading.medium',
                fontFamily: 'medium',
                textAlign: 'center'
              }}
            />
            <Text variant="regular" mx="auto" sx={{ textAlign: 'center', fontSize: '0.7rem', width: '90%' }}>
              We have everything you need to make her feel special. We have everything you need to make her feel
              special. We have everything you need to make her feel special.
            </Text>
            {hostandtoast2.length &&
              hostandtoast2.map(hat => (
                <Box>
                  <Link to={hat.target_url}>
                    <Box mt={20}>
                      <Image src={hat.image} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                    </Box>
                  </Link>
                  <Text variant="regular" textAlign="center" color="black">
                    {hat.title}
                  </Text>
                </Box>
              ))} */}
          {/* <Box>
              <Link to="/tableware-kitchenware/food-storage/containers">
                <Box mt={20}>
                  <Image src={hostAndToast12} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Containers
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/kitchen-essentials/knives-graters">
                <Box mt={20}>
                  <Image src={hostAndToast13} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Kitchen Essentials
              </Text>
            </Box>
            <Box>
              <Link to="/electronics/kitchen-care">
                <Box mt={20}>
                  <Image src={hostAndToast14} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Kitchen Appliances
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/serveware/serving-sets">
                <Box mt={20}>
                  <Image src={hostAndToast1} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Serveware
              </Text>
            </Box>
            <Box>
              <Link to="/tableware-kitchenware/drinkware/bar-glassware">
                <Box mt={20}>
                  <Image src={hostAndToast2} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
              <Text variant="regular" textAlign="center" color="black">
                Glassware
              </Text>
            </Box> */}
          {/* </Box> */}

          {/* {bestsellers && (
            <Box px={10} mt={30} mb={15}>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <CategoryCarousel
                  categoryName={bestsellers.title}
                  // subTitle={category.sub_title}
                  data={bestsellers.values}
                  colSize="45%"
                />
              </LazyLoad>
            </Box>
          )} */}

          {/* <Box mt={20}>
            <Title
              title="NEW AND NOW"
              headerProps={{
                variant: 'heading.medium',
                fontFamily: 'medium',
                textAlign: 'center'
              }}
            />
            <Box>
              <Link to="/furniture/bedroom-furniture/beds">
                <Box mt={20}>
                  <Image src={banner3} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                </Box>
              </Link>
            </Box>
          </Box>

          <Box mt={20}>
            <Title
              title="ONLINE EXCLUSIVE"
              headerProps={{
                variant: 'heading.medium',
                fontFamily: 'medium',
                textAlign: 'center'
              }}
            />
            <Box>
              <Box>
                <Box mt={20} sx={{ position: 'relative' }}>
                  <Image src={banner4} width="90%" m="auto" my={10} alt="" sx={{ display: 'block' }} />
                  <Link to="/paddington-plus-fabric-single-seater-sofa-in-blue-color-by-hometown/sku/HO340TA94TQZHTFUR">
                    <div
                      style={{
                        width: '22%',
                        height: '44%',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px'
                      }}
                    />
                  </Link>
                  <Link to="/paddington-fabric-three-seater-sofa-in-blue-colour-by-hometown/sku/HO340TA91TRCHTFUR">
                    <div
                      style={{
                        width: '30%',
                        height: '34%',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        bottom: '40px',
                        left: '120px'
                      }}
                    />
                  </Link>
                  <Link to="/paddington-plus-fabric-two-seater-sofa-in-blue-color-by-hometown/sku/HO340TA89TREHTFUR">
                    <div
                      style={{
                        width: '28%',
                        height: '54%',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        bottom: '10px',
                        right: '20px'
                      }}
                    />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box> */}

          {/* LET US DESIGN FOR YOU */}
          {/* <Box my={40}>
            <Container>
              <Row justifyContent="center" mb={5}>
                <Title
                  title="LET US DESIGN FOR YOU"
                  headerProps={{
                    variant: 'heading.medium',
                    fontFamily: 'medium',
                    textAlign: 'center'
                  }}
                />
              </Row>
              <Row>
                <Col variant="col-12" flexDirection="column" mb={30}>
                  <a href="https://m.hometown.in/design-build" target="_blank" rel="noreferrer">
                    <Box mb={10} sx={{ position: 'relative' }}>
                      <Image src={sliderImage} alt="Design and Build" />
                      <Image src={designBuildLogo} alt="Design and Build" variant="image.logoHomeTown" />
                    </Box>
                    <Heading variant="heading.medium">Design and Build</Heading>
                  </a>
                </Col>
                <Col variant="col-12" flexDirection="column">
                  <a href="https://m.hometown.in/modular-kitchens" target="_blank" rel="noreferrer">
                    <Box mb={20} sx={{ position: 'relative' }}>
                      <Image src={bannerImage} alt="Modular Kitchen" />
                      <Image
                        src="https://www.hometown.in/design-build/static/mkLogo.ae5caa06.png"
                        variant="image.logoHomeTown"
                        alt="Modular Kitchen"
                      />
                    </Box>
                    <Heading variant="heading.medium">Modular Kitchen</Heading>
                  </a>
                </Col>
              </Row>
            </Container>
          </Box> */}

          {/* Store Locator */}
          <Box my={20}>
            <Container>
              <Card
                py={30}
                px={16}
                sx={{
                  backgroundColor: '#F5EEEE',
                  backgroundSize: 'cover',
                  position: 'relative'
                }}
              >
                <Box
                  height="100%"
                  width={1}
                  // bg="rgba(0,0,0,0.5)"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
                <Row variant="row.contentCenter" sx={{ position: 'relative' }} mx={0} flexDirection="column">
                  <Box textAlign="center" mb={10}>
                    <Heading variant="heading.medium" color="#222222" mb={10}>
                      FIND A STORE NEAR YOU
                    </Heading>
                    {citySelectError && (
                      <Text variant="regular" color="red">
                        {cityErrorMessage}
                      </Text>
                    )}
                  </Box>
                  <Box width={1}>
                    <Select
                      placeholder="Select your city"
                      defaultValue={null}
                      options={citiesList}
                      styles={customDropdownStyles}
                      onChange={({ value }) => {
                        this.setState({
                          selectedCity: value,
                          citySelectError: false
                        });
                      }}
                    />
                    <Button onClick={this.mapHandler} width={1} mt={10} variant="primary.large" fontFamily="medium">
                      LOCATE A STORE
                    </Button>
                  </Box>
                </Row>
              </Card>
            </Container>
          </Box>

          {/* Share and Inspire */}
          {/* {instafeeds && !!instafeeds.length && ( */}
          {/* <Box px={15} my={40}>
            <Container> */}
          {/* <LazyLoad height={200} offset={100}>
                  <CategoryCarousel title="SHARE AND INSPIRE" data={instafeeds} />
                </LazyLoad> */}
          {/* <Row justifyContent="center" mt={40}>
                <Button
                  type="button"
                  width={1}
                  height={48}
                  px={40}
                  fontSize={18}
                  sx={{
                    textTransform: 'inherit'
                  }}
                >
                  <a
                    style={{ color: '#fff' }}
                    target="_blank"
                    href="https://www.instagram.com/hometownindia/"
                    rel="noreferrer noopener"
                  >
                    @HomeTownIndia
                  </a>
                </Button>
              </Row>
            </Container>
          </Box> */}
          {/* )} */}
        </Body>
        <Footer />
        {
          // <ReloadNotification />
        }
      </Wrapper>
    );
  }
}

Home.defaultProps = {
  banners: [],
  // homepageCategories: [],
  // homepageProducts: [],
  // recentlyviewed: [],
  cities: [],
  dealoftheday: {},
  bestsellers: {},
  shopbycategory: {},
  shopbyroom: {}

  // middleBanner: {}
  // instafeeds: []
};

Home.propTypes = {
  banners: PropTypes.array,
  // homepageCategories: PropTypes.array,
  cities: PropTypes.array,
  history: PropTypes.object.isRequired,
  dealoftheday: PropTypes.object,
  bestsellers: PropTypes.object,
  shopbycategory: PropTypes.object,
  shopbyroom: PropTypes.object,
  // instafeeds: PropTypes.array
  // isLoggedIn: PropTypes.bool.isRequired,
  hostandtoast1: PropTypes.any.isRequired,
  hostandtoast2: PropTypes.any.isRequired,
  styleyourhome: PropTypes.any.isRequired,
  staticbanners: PropTypes.any.isRequired
};
