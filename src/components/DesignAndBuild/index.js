import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { PYK_URL } from "helpers/Constants";
import SeoContent from "components/SeoContent";
import Footer from "components/Footer";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Theme from "hometown-components/lib/Theme";
import Heading from "hometown-components/lib/Heading";
import Button from "hometown-components/lib/Buttons";
import Img from "hometown-components/lib/Img";
import ResponsiveModal from "components/Modal";
import { sendData, getData } from "redux/modules/services";
import LazyLoad from "react-lazyload";
import { Shimmer, BackgroundMasker } from "hometown-components/lib/Shimmer";
import Header from "./Header";
import ModularKitchenForm from "./ModularKitchenForm";
import ModularKitchenFormModal from "./ModularKitchenFormModal";

import "./Slider.css";
import TopBanner from "./topBanner";
import WhyChooseUs from "./whyChooseUs";
import DandBAdvantage from "./DandBAdvantage";
import DesignServices from "./designServices";
import ServicesOffered from "./servicesOffered";
import StepsToHome from "./steps";
import SpacesTransformed from "./spacesTransformed";
import CustomerStories from "./customarStories";
import ShopFurniture from "./shopFurniture";
import StyleYourHome from "./styleYourHome";
import EasyFinance from "./easyFinance";
import BeginJourney from "./beginJourney";
import Blogs from "./blogs";
import QueryDropDownContainer from "./queryDropdown";

const PlaceHolderShimmer = () => (
  <Div mb="1rem">
    <Shimmer height="168px">
      <BackgroundMasker width="20%" height="25px" left="0" />
      <BackgroundMasker width="20%" height="25px" right="0" />
      <BackgroundMasker width="100%" height="10px" left="0" top="25px" />
      <BackgroundMasker width="15px" height="153px" left="0" top="35px" />
      <BackgroundMasker
        width="15px"
        height="153px"
        left="calc(15px + 153px)"
        top="35px"
      />
      <BackgroundMasker
        width="15px"
        height="153px"
        left="calc(15px + 153px + 15px + 153px)"
        top="35px"
      />
    </Shimmer>
  </Div>
);
@connect(
  ({ services, designBuild, userLogin, profile }) => ({
    designBuild,
    whyChooseUs: designBuild.data.items.text.whyChooseUs,
    seoInfo:
      designBuild.data && designBuild.data.seo && designBuild.data.seo.items,
    isLoggedIn: userLogin.isLoggedIn,
    fullName: profile.data ? profile.data.full_name : undefined,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
export default class ModularKitchen extends Component {
  state = {
    openModal: false,
    open: false,
    makeItOwnSelect: "Organisers",
    organiser: true,
    handles: false,
    lights: false,
    countertops: false,
    showScript: false,
    showmore: true
  };
  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  render() {
    const {
      whyChooseUs,
      isLoggedIn,
      fullName,
      loading,
      loaded,
      seoInfo
    } = this.props;
    const { showScript, showmore } = this.state;
    const correctIcon = require("../../../static/correct.svg");
    return (
      <Div display="block">
        {/* Meta */}
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
          {showScript ? (
            // <!-- Facebook Pixel Code -->
            <script>
              {`
               window.addEventListener('load',function(){
                var x = 0;
                var myVar = setInterval(function(){
                  if(jQuery('h2:contains(Thank You For Your)').is(":visible")){
                    if(x == 0){
                      gtag('event', 'conversion', {'send_to': 'AW-832074530/h7wJCMXmzdcCEKLm4YwD'});
                      x = 1;
                    }
                    clearInterval(myVar);
                  }
                }, 1000);
              });
              `}
            </script>
          ) : // <!-- End Facebook Pixel Code -->
            null}

          {/* Meta Pixel Code  */}
          {showScript ? (

            <script>
              {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1024172491523922');
fbq('track', 'DBlead');
`}
            </script>

          ) :
            null}

          {showScript ? (
            <noscript>{`<img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1024172491523922&ev=DBlead&noscript=1"
            />`}</noscript>


          ) :
            null}
          {/* End Facebook Pixel Code  */}
        </Helmet>
        {/* Header */}
        <Header
          link={PYK_URL}
          text="Plan Your Kitchen"
          handleModal={this.handleModal}
          display={true}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
        />

        {/* Top banner*/}
        <TopBanner handleModal={this.handleModal} />

        {/* Why choose us*/}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <WhyChooseUs whyChooseUs={whyChooseUs} />
        </LazyLoad>

        {/* The Design And Build Advantage */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <DandBAdvantage />
        </LazyLoad>

        {/* Speak to our experts*/}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <ModularKitchenForm
          />
        </LazyLoad>

        {/* DesignServices*/}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <DesignServices />
        </LazyLoad>

        {/* Services offered */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <ServicesOffered />
        </LazyLoad>

        {/* steps to dream home */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <StepsToHome handleModal={this.handleModal} />
        </LazyLoad>

        {/* spacesWeTransformed */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <SpacesTransformed />
        </LazyLoad>

        {/* CustomerStories */}
        {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
        {/* <CustomerStories /> */}
        {/* </LazyLoad> */}

        {/* shop furniture */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <ShopFurniture />
        </LazyLoad>

        {/* style Your Home */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <StyleYourHome />
        </LazyLoad>

        {/* Easy Finance */}
        {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
        {/* <EasyFinance /> */}
        {/* </LazyLoad> */}

        {/* Begin Journey */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <BeginJourney handleModal={this.handleModal} />
        </LazyLoad>

        {/* Blogs */}
        {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
        {/* <Blogs /> */}
        {/* </LazyLoad> */}

        {/* QueryDropDown */}
        {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
        {/* <QueryDropDownContainer /> */}
        {/* </LazyLoad> */}

        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: "mkModal" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <ModularKitchenFormModal
            />
          </ResponsiveModal>
        
          {seoInfo && seoInfo.seo_text && (
            <SeoContent>
              <div
                dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }}
                className={showmore ? "showLessSeo" : "showMoreSeo"}
              />
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
        </Section>
      </Div>
    );
  }
}

ModularKitchen.defaultProps = {
  data: null
};
ModularKitchen.propTypes = {
  data: PropTypes.object
};
