import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PYK_URL } from "helpers/Constants";
import MainSlider from "components/MainSlider";
import Footer from "components/Footer";
import Section from "hometown-components/lib/Section";
import Container from "hometown-components/lib/Container";
import Heading from "hometown-components/lib/Heading";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
import Text from "hometown-components/lib/Text";
import Theme from "hometown-components/lib/Theme";
import Img from "hometown-components/lib/Img";
import Button from "hometown-components/lib/Buttons";
import ResponsiveModal from "components/Modal";
import { sendData, getData } from "redux/modules/services";
import Helmet from "react-helmet";
import LazyLoad from "react-lazyload";
import { Shimmer, BackgroundMasker } from "hometown-components/lib/Shimmer";
import SeoContent from "components/SeoContent";
import Header from "./Header";
import SlickSlider from "../SlickSlider";
import ModularKitchenForm from "./ModularKitchenForm";
import ModularKitchenFormModal from "./ModularKitchenFormModal";
import KitchenLayoutCarousel from "./KitchenLayoutCarousel";
import { BASE_IMAGE_URL } from "helpers/Constants";

const styles = require("./ModularKitchen.scss");

const arrowForward = require("../../../static/newHomepage/newForwardArrow.svg");
const quote = require("../../../static/mkNew/quote.svg");

import "./Slider.css";

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

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 1.2 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

const adjustSlidesNew = (length, index) => ({
  slidesToShow: length > 1 ? 1.2 : length,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
});

const adjustSlidesKitchenLayout = length => ({
  slidesToShow: length > 1 ? 1 : length,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
});

@connect(
  ({ services, modularkitchen, userLogin, profile }) => ({
    modularkitchen,
    topBanner: modularkitchen.data.items.text.topBanner,
    carouselOne: modularkitchen.data.items.text.carouselOne,
    kitchenLayouts: modularkitchen.data.items.text.kitchenLayouts,
    customerStory: modularkitchen.data.items.text.customerStory,
    makeItOwn: modularkitchen.data.items.text.makeItOwn,
    whyChooseUs: modularkitchen.data.items.text.whyChooseUs,
    newKitchen: modularkitchen.data.items.text.newKitchen,
    touchAndSee: modularkitchen.data.items.text.touchAndSee,
    beginJourney: modularkitchen.data.items.text.beginJourney,
    partners: modularkitchen.data.items.text.partners,
    seoInfo:
      modularkitchen.data &&
      modularkitchen.data.seo &&
      modularkitchen.data.seo.items,
    isLoggedIn: userLogin.isLoggedIn,
    userDetails: userLogin,
    fullName: profile.data ? profile.data.full_name : undefined,
    profile,
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

  makeItOwnSelecter = e => {
    e.preventDefault();
  };

  // handleScript = () => {
  //   this.setState({
  //     showScript: true
  //   });
  //   setTimeout(() => {
  //     this.setState({
  //       showScript: false
  //     });
  //   }, 2000);
  // };



  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  render() {
    const {
      data,
      carouselOne,
      kitchenLayouts,
      customerStory,
      makeItOwn,
      topBanner,
      whyChooseUs,
      newKitchen,
      touchAndSee,
      beginJourney,
      partners,
      loading,
      loaded,
      isLoggedIn,
      userDetails,
      profile,
      fullName,
      seoInfo
    } = this.props;
    const correctIcon = require("../../../static/correct.svg");
    const { makeItOwnSelect, showScript, showmore } = this.state;

    return (
      <Div display="block">
        {/* Meta */}
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
          {/* Facebook Pixel Code  */}
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
fbq('track', 'MKlead');
`}
            </script>
          ) : null}
          {showScript ? (
            <noscript>{`<img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1024172491523922&ev=MKlead&noscript=1"
/>`}</noscript>
          ) : null}

          {/* End Facebook Pixel Code */}
          {showScript ? (
            // <!-- Facebook Pixel Code -->
            <script type="text/javascript">
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
        </Helmet>
        {/* Header - Raj */}
        <Header
          link={PYK_URL}
          text="Plan Your Kitchen"
          handleModal={this.handleModal}
          display={true}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
        />

        {/* Top banner - Pasha */}

        <Div>
          <Div>
            <Img
              data-src={topBanner.image}
              src={`${topBanner.image}?blur=30`}
              height="auto"
            />
          </Div>
          <Section mt="10px">
            <Img src={`${BASE_IMAGE_URL}/media/cms/extras/DuracucineLogo.png`} width="300px" m="auto" />
            <Text
              ta="center"
              fontSize="16px"
              color="#666666"
              style={{ lineHeight: "18px" }}
            >
              {topBanner.description}
            </Text>
          </Section>
        </Div>

        {/* Carousel - Raj */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <div className="carousel-one offset">
            <SlickSlider
              settings={adjustSlidesNew(8, carouselOne.values.length)}
            >
              {carouselOne.values.map((data, index) => (
                <Div key={index} pr="20px">
                  <Img
                    data-src={data.image}
                    src={`${data.image}?blur=30`}
                    alt={data.title}
                  />
                  <Div pl="10px">
                    <Heading fontSize="19px" color="#666666">
                      {data.title}
                    </Heading>
                    <Text color="#888888" fontSize="12px">
                      {data.description}
                    </Text>
                  </Div>
                </Div>
              ))}
            </SlickSlider>
          </div>
        </LazyLoad>

        {/* Why choose us - Pasha */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div mt="30px" mb="30px">
            <Div>
              <Img
                data-src={whyChooseUs.image}
                src={`${whyChooseUs.image}?blur=30`}
                alt={whyChooseUs.title}
              />
            </Div>
            <Div style={{ display: "flex" }}>
              <Div
                style={{
                  width: "85%",
                  margin: "auto",
                  boxShadow: "0px 15px 30px #00000029",
                  backgroundColor: "#FFFFFF",
                  marginTop: "-50px"
                }}
              >
                <Heading
                  pt="15px"
                  color="##222222"
                  fontSize="22px"
                  ta="center"
                  fontWeight="bold"
                  style={{
                    lineHeight: "31px"
                  }}
                  mb="10px"
                >
                  {whyChooseUs.title}
                </Heading>
                <Text
                  color="#888888"
                  fontSize="14px"
                  ta="center"
                  pl="20px"
                  pr="20px"
                  mb="30px"
                  style={{ lineHeight: "24px" }}
                >
                  {whyChooseUs.description}
                </Text>
                <Div style={{ display: "flex" }}>
                  <Div
                    className={styles.gradient}
                    style={{
                      width: "90%",
                      margin: "auto"
                      // backgroundImage: 'linear-gradient(to bottom, #EFEFEF, transparent)'
                    }}
                    p="0px 20px"
                  >
                    {whyChooseUs.data.map((val, index) => (
                      <Text
                        fontSize="16px"
                        p="10px 0px"
                        key={index}
                        style={{ fontWeight: "bold" }}
                      >
                        {val.text.split(" ")[0]}{" "}
                        <span style={{ fontWeight: "normal" }}>
                          {val.text
                            .split(" ")
                            .slice(1, val.text.split(" ").length)
                            .join(" ")}
                        </span>
                      </Text>
                    ))}
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </LazyLoad>

        {/* Speak to our experts - Raj */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <ModularKitchenForm
          />
        </LazyLoad>

        {/* Kitchen layout - Raj */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div mt="20px">
            <Heading
              mb="15px"
              ta="center"
              color="#222222"
              fontSize="22px"
              fontFamily="regular"
            >
              {kitchenLayouts.title}
            </Heading>
            <div
              style={{
                width: "25px",
                borderTop: "2px solid #222222",
                margin: "auto"
              }}
            ></div>
            <div className="carousel-one" style={{ marginTop: "15px" }}>
              <SlickSlider settings={adjustSlidesKitchenLayout(8)}>
                {kitchenLayouts.data.map((data, index) => (
                  <Div key={index}>
                    <KitchenLayoutCarousel
                      image={data.image}
                      title={data.title}
                      description={data.description}
                      handleModal={this.handleModal}
                    />
                  </Div>
                ))}
              </SlickSlider>
            </div>
          </Div>
        </LazyLoad>

        {/* New kitchen - Pasha */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div mt="50px" mb="20px">
            <Div>
              <Img
                data-src={newKitchen.image}
                src={`${newKitchen.image}?blur=30`}
                alt={newKitchen.title}
                height="auto"
              />
            </Div>

            <Div style={{ display: "flex" }}>
              <Div
                m="auto"
                mt="-50px"
                style={{
                  width: "80%",
                  border: "1px solid #FCE1D1",
                  borderRadius: "5px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 5px 10px #0000001A"
                }}
                p="10px 30px"
                pb="30px"
              >
                <Heading
                  ta="center"
                  color="#1D1D1D"
                  fontSize="22px"
                  fontFamily="regular"
                  style={{ whiteSpace: "normal", lineHeight: "31px" }}
                >
                  {newKitchen.title}
                </Heading>
                <Div p="0px 20px" pr="0px">
                  {newKitchen.texts.map((val, index) => (
                    <Div
                      key={index}
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Text
                        mt="5px"
                        mb="5px"
                        style={{
                          height: "23px",
                          width: "23px",
                          backgroundColor: "#E0DFDF",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold"
                        }}
                        mr="15px"
                        fontSize="12px"
                      >
                        {val.number}
                      </Text>
                      <Text fontSize="14px" mt="5px" mb="5px">
                        {val.value}
                      </Text>
                    </Div>
                  ))}
                  <div
                    style={{
                      height: "110px",
                      width: "1px",
                      border: "2px dashed #E0DFDF",
                      marginTop: "10px",
                      marginLeft: "10px"
                    }}
                  ></div>
                </Div>
                <Div ta="center" mt="30px">
                  <Button
                    type="button"
                    btnType="custom"
                    p="8px 12px"
                    bg="white"
                    color="#F47020"
                    style={{ fontSize: "14px" }}
                    onClick={this.handleModal}
                  >
                    Speak to our Experts
                  </Button>
                </Div>
              </Div>
            </Div>

            {/* <Text mt="20px"><span className={styles.span}>1</span> Speak to our expert</Text>
          <Text mt="20px"><span className={styles.span}>1</span> Discuss your requirements</Text>
          <Text mt="20px"><span className={styles.span}>1</span> Speak to our expert</Text>
          <Text mt="20px"><span className={styles.span}>1</span> Speak to our expert</Text> */}
          </Div>
        </LazyLoad>

        {/* Touch see - Pasha */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Section mt="20px">
            <Heading
              color="#222222"
              fontSize="1.25rem"
              fontWeight="bold"
              ta="center"
            >
              {touchAndSee.title}
            </Heading>
            <Text
              color="#888888"
              ta="center"
              pl="30px"
              pr="30px"
              mb="10px"
              fontSize="14px"
              style={{ lineHeight: "18px" }}
            >
              {touchAndSee.description}
            </Text>

            <a onClick={this.handleModal}>
              <Heading
                mt="30px"
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#222222"
                }}
              >
                LETS MEET{" "}
                <img
                  style={{
                    display: "inline",
                    marginLeft: "-8px",
                    height: "10px",
                    width: "40px"
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </Heading>
            </a>
          </Section>
        </LazyLoad>

        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div mb="20px">
            <Div>
              <Img
                data-src={touchAndSee.image}
                src={`${touchAndSee.image}?blur=30`}
                height="auto"
              />
            </Div>

            <Row
              p="0px"
              ml="0px"
              mr="0px"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              {/* {touchAndSee.data.map((data, index) => (
              <Div key={index} style={{ width: '40%', marginTop: '20px'}}>
                <Img src={data.image} height="auto" width="100%"/>
                <Text fontSize="14px" style={{fontWeight: 'bold'}} className={styles.meetText}>{data.description}</Text>
              </Div>
            ))} */}
              <Div style={{ width: "40%", marginTop: "20px" }}>
                <Img
                  data-src={touchAndSee.data[0].image}
                  src={`${touchAndSee.data[0].image}?blur=30`}
                  height="auto"
                  width="100%"
                />
                <Text
                  fontSize="14px"
                  style={{ fontWeight: "bold" }}
                  className={styles.meetText}
                >
                  {touchAndSee.data[0].description}
                </Text>
              </Div>
              <Div style={{ width: "40%", marginTop: "20px" }}>
                <Img
                  data-src={touchAndSee.data[1].image}
                  src={`${touchAndSee.data[1].image}?blur=30`}
                  height="auto"
                  width="100%"
                />
                <Text
                  fontSize="14px"
                  style={{ fontWeight: "bold" }}
                  className={styles.meetText}
                >
                  {touchAndSee.data[1].description}
                </Text>
              </Div>
            </Row>
            <Row
              p="0px"
              ml="0px"
              mr="0px"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              {/* {touchAndSee.data.map((data, index) => (
              <Div key={index} style={{ width: '40%', marginTop: '20px'}}>
                <Img src={data.image} height="auto" width="100%"/>
                <Text fontSize="14px" style={{fontWeight: 'bold'}} className={styles.meetText}>{data.description}</Text>
              </Div>
            ))} */}
              <Div style={{ width: "40%", marginTop: "20px" }}>
                <Img
                  data-src={touchAndSee.data[2].image}
                  src={`${touchAndSee.data[2].image}?blur=30`}
                  height="auto"
                  width="100%"
                />
                <Text
                  fontSize="14px"
                  style={{ fontWeight: "bold" }}
                  className={styles.meetText}
                >
                  {touchAndSee.data[2].description}
                </Text>
              </Div>
              <Div style={{ width: "40%", marginTop: "20px" }}>
                <Img
                  data-src={touchAndSee.data[3].image}
                  src={`${touchAndSee.data[3].image}?blur=30`}
                  height="auto"
                  width="100%"
                />
                <Text
                  fontSize="14px"
                  style={{ fontWeight: "bold" }}
                  className={styles.meetText}
                >
                  {touchAndSee.data[3].description}
                </Text>
              </Div>
            </Row>
          </Div>
        </LazyLoad>

        {/* Customer story - Raj */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div>
            <Heading
              ta="center"
              color="#1D1D1D"
              fontSize="22px"
              fontFamily="regular"
              style={{
                whiteSpace: "normal",
                lineHeight: "30px"
              }}
              p="0px 15%"
            >
              {customerStory.title}
            </Heading>
            <div
              style={{
                width: "25px",
                borderTop: "2px solid #222222",
                margin: "auto",
                marginBottom: "15px"
              }}
            ></div>
            <Div p="0px 20px" pr="0px" className="offset">
              <SlickSlider settings={adjustSlides(8)}>
                {customerStory.data.map((data, index) => (
                  <Div p="0px 10px" pb="20px" key={index}>
                    <Img
                      data-src={data.image}
                      src={`${data.image}?blur=30`}
                      alt="customer comment"
                    />
                    <Div style={{ display: "flex", height: "100px" }}>
                      <Div
                        m="auto"
                        p="10px 20px"
                        mt="-50px"
                        style={{
                          width: "90%",
                          boxShadow: "0px 5px 10px #0000001A",
                          borderRadius: "5px",
                          backgroundColor: "#FFFFFF",
                          position: "relative",
                          height: "160px"
                        }}
                      >
                        <Img
                          src={quote}
                          style={{ position: "absolute", top: "15px" }}
                          width="auto"
                          height="40px"
                          alt="quote"
                        />
                        <Text fontSize="12px" color="#000000">
                          {data.message}
                        </Text>
                        <Text
                          mt="15px"
                          fontSize="12px"
                          color="#000000"
                          style={{ fontStyle: "italic" }}
                        >
                          {data.customer}
                        </Text>
                      </Div>
                    </Div>
                  </Div>
                ))}
              </SlickSlider>
            </Div>
          </Div>
        </LazyLoad>

        {/* Make it your own - Raj */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div>
            <Heading
              ta="center"
              color="#1D1D1D"
              fontSize="22px"
              fontFamily="regular"
            >
              {makeItOwn.title}
            </Heading>
            <Row mr="0px" ml="0px" p="0px 15px" justifyContent="space-between">
              <button
                style={{
                  border: "none",
                  fontSize: "16px",
                  color: "#666666",
                  background: "transparent",
                  display: "inline-block",
                  paddingBottom: "15px",
                  borderBottom: this.state.organiser
                    ? "2px solid #F57831"
                    : "none",
                  fontWeight: this.state.organiser ? "bold" : "normal"
                }}
                value="Organisers"
                onClick={e => {
                  this.setState({
                    makeItOwnSelect: e.target.value,
                    organiser: true,
                    handles: false,
                    lights: false,
                    countertops: false
                  });
                }}
              >
                Organisers
              </button>
              <button
                style={{
                  border: "none",
                  fontSize: "16px",
                  color: "#666666",
                  background: "transparent",
                  display: "inline-block",
                  paddingBottom: "15px",
                  borderBottom: this.state.handles
                    ? "2px solid #F57831"
                    : "none",
                  fontWeight: this.state.handles ? "bold" : "normal"
                }}
                value="Handles"
                onClick={e => {
                  this.setState({
                    makeItOwnSelect: e.target.value,
                    organiser: false,
                    handles: true,
                    lights: false,
                    countertops: false
                  });
                }}
              >
                Handles
              </button>
              <button
                style={{
                  border: "none",
                  fontSize: "16px",
                  color: "#666666",
                  background: "transparent",
                  display: "inline-block",
                  paddingBottom: "15px",
                  borderBottom: this.state.lights
                    ? "2px solid #F57831"
                    : "none",
                  fontWeight: this.state.lights ? "bold" : "normal"
                }}
                value="Lights"
                onClick={e => {
                  this.setState({
                    makeItOwnSelect: e.target.value,
                    organiser: false,
                    handles: false,
                    lights: true,
                    countertops: false
                  });
                }}
              >
                Lights
              </button>
              <button
                style={{
                  border: "none",
                  fontSize: "16px",
                  color: "#666666",
                  background: "transparent",
                  display: "inline-block",
                  paddingBottom: "15px",
                  borderBottom: this.state.countertops
                    ? "2px solid #F57831"
                    : "none",
                  fontWeight: this.state.countertops ? "bold" : "normal"
                }}
                value="Countertops"
                onClick={e => {
                  this.setState({
                    makeItOwnSelect: e.target.value,
                    organiser: false,
                    handles: false,
                    lights: false,
                    countertops: true
                  });
                }}
              >
                Countertops
              </button>
            </Row>
            <Div bg="#F5F5F5" className="offset" pb="30px">
              <Text
                mt="30px"
                mb="0px"
                ta="center"
                color="#666666"
                fontSize="14px"
                p="0px 10%"
                style={{ lineHeight: "16px", height: "90px" }}
              >
                {makeItOwn.carouselData[`${makeItOwnSelect}`].description}
              </Text>
              <SlickSlider settings={adjustSlides(8)}>
                {makeItOwn.carouselData[`${makeItOwnSelect}`].images.map(
                  (data, index) => (
                    <Div key={index} p="30px" pr="0px" pb="10px">
                      {/* <Img src={data.image} /> */}
                      <Img
                        height="auto"
                        data-src={data.image}
                        src={`${data.image}?blur=30`}
                      />
                      {/* <Text style={{lineHeight: '20px'}} fontSize="14px">{data.description}</Text> */}
                    </Div>
                  )
                )}
              </SlickSlider>
              <Div>
                <a onClick={this.handleModal} to="">
                  <Heading
                    ta="center"
                    fontSize="13px"
                    fontFamily="regular"
                    color="#323F38"
                  >
                    SPEAK TO OUR EXPERTS
                    <img
                      style={{
                        display: "inline",
                        marginLeft: "-8px",
                        height: "10px",
                        width: "40px"
                      }}
                      src={arrowForward}
                      alt="Arrow"
                    />
                  </Heading>
                </a>
              </Div>
            </Div>
          </Div>
        </LazyLoad>

        {/* Dream kitchen - Raj */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div>
            <a onClick={this.handleModal}>
              <Img
                data-src={beginJourney.image}
                src={`${beginJourney.image}?blur=30`}
                alt={beginJourney.title}
              />
            </a>
          </Div>
        </LazyLoad>

        {/* Our partners - Pasha */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Section>
            <div className={styles.partners}>
              <Heading
                color="black"
                fontSize="1.25rem"
                ta="center"
                fontWeight="bold"
              >
                Our Partners
              </Heading>
              <div
                style={{
                  width: "30px",
                  borderTop: "2px solid #222222",
                  margin: "-5px auto 0"
                }}
              />

              <Row mt="30px" p="0px 30px">
                {partners.images.map((data, index) => (
                  <Div key={index} col="6">
                    <Img
                      data-src={data.image}
                      src={`${data.image}?blur=30`}
                      height="50px"
                      width="60px"
                      m="auto"
                      style={{ objectFit: "contain" }}
                    />
                  </Div>
                ))}
              </Row>
            </div>
          </Section>
        </LazyLoad>

        {/* <Header link={PYK_URL} text="Plan Your Kitchen" /> */}
        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: "mkModal" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <ModularKitchenFormModal
            />
          </ResponsiveModal>
          
        </Section>
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
