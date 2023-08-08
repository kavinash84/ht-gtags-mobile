import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// New
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import ShopByCategories from "components/ShopByCategories";
import StyleYourHome from "components/StyleYourHome";
import Text from "hometown-components/lib/Text";
import Row from "hometown-components/lib/Row";
import Heading from "hometown-components/lib/Heading";
import Image from "hometown-components/lib/Img";
import CategoryCarousel from "components/CategoryCarouselHome";
import CategoryCarouselDeals from "components/CategoryCarouselDeals";
import CategoryCarouselLook from "components/CategoryCarouselLook";
import CategoryCarouselFinance from "components/CategoryCarouselFinance";
import LazyLoad from "react-lazyload";
import MainSlider2 from "components/MainSlider2";
// import MainSlider3 from "components/MainSlider3";
import { Shimmer, BackgroundMasker } from "hometown-components/lib/Shimmer";

const arrowForward = require("../../../static/newHomepage/newForwardArrow.svg");

import "./NewHome.css";

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

export class Home extends Component {
  render() {
    const {
      bestsellers,
      dealoftheday,
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
      isLoggedIn,
      easyFinance,
      strip,
      secondmainbanner
    } = this.props;
    // const { section11 } = htExclusiveData;
    return (
      <Section p="0px">
        {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={630}> */}
        <Link to={strip.url_key}
        onClick={()=>{
          window.dataLayer.push({
            event: 'pt_global_click_link_banner_click',
            pagetype: '',
            source_page_url: window.location.href,
            previous_page_url: '',
            destination_page_url: strip.url_key||"",
            login_status: '',
            user_id: '',
            page_url: window.location.href,
            banner_id: '',
            click_text: ''
          });
        }}
        >
          <div style={{ width: "80%", marginLeft: "10%" }}>
            <img
              data-src={strip.image}
              src={`${strip.image}?blur=30`}
              alt="strip"
              style={{ width: "100%", height: "52px" }}
            />
          </div>
        </Link>
        {/* </LazyLoad> */}
        {/* banner 3 */}
        {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <div style={{ marginTop: "35px" }}>
            <MainSlider3 mb="30px" />
          </div>
        </LazyLoad> */}

        {/* Shop By Category */}
        {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={630}> */}
        <ShopByCategories shopByCategories={shopByCategories} />
        {/* </LazyLoad> */}

        {/* banner two */}
        {secondmainbanner ? (
          <LazyLoad placeholder={<PlaceHolderShimmer />} height={288}>
            <div style={{ marginTop: "35px" }}>
              <MainSlider2 data={secondmainbanner} mb="30px" />
            </div>
          </LazyLoad>
        ) : null}


        {/* Shop by room */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={639}>
          <Div mt="20px" mb="15px" style={{ display: "block" }}>
            <CategoryCarousel
              categoryName="Shop By Rooms"
              shopByRooms={shopByRooms}
              colSize="45%"
            />
          </Div>
        </LazyLoad>

        {/* Deals of the day */}

        {dealoftheday && dealoftheday.length ? (
          <LazyLoad placeholder={<PlaceHolderShimmer />} height={575}>
            <Div px={0}>
              <CategoryCarouselDeals
                categoryName="Deals Of The Day"
                colSize="45%"
                id={1}
                data={dealoftheday}
              />
            </Div>
          </LazyLoad>
        ) : null}

        {/* Best seat in the house */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={780}>
          <Div>
            <Heading
              mb="20px"
              fontSize="22px"
              style={{
                textAlign: "center",
                color: "#222222",
                fontFamily: "medium"
              }}
            >
              {bestSeat.mainTitle}
            </Heading>
            <Link to={bestSeat.url_key}
            onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: bestSeat.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: bestSeat.button
              });
            }}
            >
              <Heading
                fontFamily="medium"
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#222222"
                }}
              >
                {bestSeat.button}
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
              <Image
                data-src={bestSeat.image}
                src={`${bestSeat.image}?blur=30`}
                alt="bestSeat"
                margin="20px auto 0"
                width="100%"
                height="300px"
              />
            </Link>

            {/* Get the look - Pasha */}
            <Div pl="30px" pr="30px" pt="30px" pb="20px" mb="10px" bg="#F9F9F9">
              {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
              {getTheLook.data.length ? (
                <CategoryCarouselLook
                  categoryName="Get the Look"
                  colSize="45%"
                  getTheLook={getTheLook}
                />
              ) : null}
              {/* </LazyLoad> */}
            </Div>
          </Div>
        </LazyLoad>

        {/* Style your home */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={615}>
          <StyleYourHome styleYourHome={styleYourHome} />
        </LazyLoad>

        {/* Shop homeware */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={880}>
          <Div mb="20px">
            {homePageBanners.map((val, index) => (
              <Div m="15px 0px">
                <Link to={val.url_key}
                 onClick={()=>{
                  window.dataLayer.push({
                    event: 'pt_global_click_link_banner_click',
                    pagetype: '',
                    source_page_url: window.location.href,
                    previous_page_url: '',
                    destination_page_url: val.url_key,
                    login_status: '',
                    user_id: '',
                    page_url: window.location.href,
                    banner_id: '',
                    click_text: ""
                  });
                }}
                >
                  <Image
                    data-src={val.image}
                    src={`${val.image}?blur=30`}
                    alt="IndoorFountain"
                    width="100%"
                    height="185px"
                  />
                </Link>
              </Div>
            ))}
          </Div>
        </LazyLoad>

        <LazyLoad placeholder={<PlaceHolderShimmer />} height={549}>
          {/* Fathers day gift */}
          <Div>
            <Heading
              mb="10px"
              style={{
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium"
              }}
              fontSize="22px"
            >
              {gifting.mainTitle}
            </Heading>
            <Link to={gifting.url_key}
             onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: gifting.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: gifting.buttonTitle||""
              });
            }}
            >
              <Heading
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontFamily: "medium",
                  color: "#222222"
                }}
              >
                {gifting.buttonTitle}
                <img
                  style={{
                    display: "inline",
                    marginLeft: "-6px",
                    height: "10px",
                    width: "40px"
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </Heading>
              <Image
                mt="10px"
                width="100%"
                height="470px"
                data-src={gifting.image}
                src={`${gifting.image}?blur=30`}
                alt="FathersDayGift"
              />
            </Link>
          </Div>
        </LazyLoad>

        {/* Together in the momemt */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={373}>
          <Div mt="30px">
            <Heading
              mb="15px"
              style={{
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium"
              }}
              fontSize="22px"
            >
              {togetherInMoment.mainTitle}
            </Heading>
            <Link to={togetherInMoment.url_key}
             onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: togetherInMoment.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: togetherInMoment.buttonTitle||""
              });
            }}
            >
              <Heading
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontFamily: "medium",
                  color: "#222222"
                }}
              >
                {togetherInMoment.buttonTitle}
                <img
                  style={{
                    display: "inline",
                    marginLeft: "-6px",
                    height: "10px",
                    width: "40px"
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </Heading>
              <Image
                mt="20px"
                data-src={togetherInMoment.image}
                src={`${togetherInMoment.image}?blur=30`}
                alt="TogetherInTheMoment"
                width="100%"
                height="250px"
              />
            </Link>
          </Div>
        </LazyLoad>

        {/* The way we are entertaining now */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={518}>
          <Div p="30px 25px" bg="#FAF4F2">
            <Heading
              mb="15px"
              pl="40px"
              pr="40px"
              style={{
                lineHeight: "1.8rem",
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium",
                whiteSpace: "normal"
              }}
              fontSize="22px"
            >
              {TheWayWeAreEntertainingNow.mainTitle}
            </Heading>
            <Link to={TheWayWeAreEntertainingNow.url_key}
             onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: TheWayWeAreEntertainingNow.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: TheWayWeAreEntertainingNow.buttonTitle||""
              });
            }}
            >
              <Heading
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontFamily: "medium",
                  color: "#222222"
                }}
              >
                {TheWayWeAreEntertainingNow.buttonTitle}
                <img
                  style={{
                    display: "inline",
                    marginLeft: "-6px",
                    height: "10px",
                    width: "40px"
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </Heading>
              <Image
                mt="20px"
                data-src={TheWayWeAreEntertainingNow.image}
                src={`${TheWayWeAreEntertainingNow.image}?blur=30`}
                alt="TheWayWeAreEntertainingNow"
                width="100%"
                height="auto"
              />
            </Link>
            <Text
              mt="20px"
              style={{ textAlign: "center" }}
              color="#545454"
              fontSize="14px"
              lineHeight="1.2rem"
            >
              {TheWayWeAreEntertainingNow.description}
            </Text>
          </Div>
        </LazyLoad>

        {/* Mid banner */}

        {!isLoggedIn ? (
          <LazyLoad placeholder={<PlaceHolderShimmer />} height={128}>
            <Div mt="30px">
              <Link to={midbanner.url_key}
               onClick={()=>{
                window.dataLayer.push({
                  event: 'pt_global_click_link_banner_click',
                  pagetype: '',
                  source_page_url: window.location.href,
                  previous_page_url: '',
                  destination_page_url: midbanner.url_key,
                  login_status: '',
                  user_id: '',
                  page_url: window.location.href,
                  banner_id: '',
                  click_text: ""
                });
              }}
              >
                <Image
                  data-src={midbanner.image}
                  src={`${midbanner.image}?blur=30`}
                  width="100%"
                  height="auto"
                  alt="MidBanner"
                  style={{ display: "block" }}
                />
              </Link>
            </Div>
          </LazyLoad>
        ) : null}

        {/* WFH favorites */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={457}>
          <Div mt="30px" mb="30px">
            <Link to={wfhAreBack.url_key}
             onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: wfhAreBack.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: wfhAreBack.mainTitle||""
              });
            }}
            >
              <Div style={{ position: "relative" }}>
                <div className="gradient">
                  <Heading
                    fontSize="22px"
                    style={{
                      textAlign: "center",
                      color: "#323131",
                      fontFamily: "medium"
                    }}
                    mb="10px"
                  >
                    {wfhAreBack.mainTitle}
                  </Heading>
                  <Text fontSize="14px" style={{ textAlign: "center" }}>
                    {wfhAreBack.description}
                  </Text>
                </div>
                <Image
                  data-src={wfhAreBack.image}
                  src={`${wfhAreBack.image}?blur=30`}
                  width="100%"
                  height="auto"
                  alt="WorkFromHome"
                />
                <Heading
                  style={{
                    position: "absolute",
                    bottom: "30px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontFamily: "medium",
                    width: "100%"
                  }}
                  color="#222222"
                  mb="0px"
                >
                  SHOP NOW{" "}
                  <img
                    style={{
                      display: "inline",
                      marginLeft: "-6px",
                      height: "10px",
                      width: "40px"
                    }}
                    src={arrowForward}
                    alt="Arrow"
                  />
                </Heading>
              </Div>
            </Link>
          </Div>
        </LazyLoad>

        {/* trends we love */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={426}>
          <Div p="30px" pt="0px">
            <Heading
              fontSize="22px"
              mb="5px"
              style={{ color: "#323131", fontFamily: "medium" }}
            >
              {trendsWeLove1.mainTitle}
            </Heading>
            <Link to={trendsWeLove1.url_key}
            onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: trendsWeLove1.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: trendsWeLove1.mainTitle||""
              });
            }}
            >
              <Image
                data-src={trendsWeLove1.image}
                src={`${trendsWeLove1.image}?blur=30`}
                alt="TrendsWeLove"
                width="100%"
                height="auto"
              />
            </Link>
          </Div>
        </LazyLoad>

        {/* trends we love */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={426}>
          <Div p="30px" pt="0px">
            <Heading
              fontSize="22px"
              mb="5px"
              style={{ color: "#323131", fontFamily: "medium" }}
            >
              {trendsWeLove2.mainTitle}
            </Heading>
            <Link to={trendsWeLove2.url_key}
            onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: trendsWeLove2.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: trendsWeLove2.mainTitle||""
              });
            }}
            >
              <Image
                data-src={trendsWeLove2.image}
                src={`${trendsWeLove2.image}?blur=30`}
                alt="TrendsWeLove"
                width="100%"
                height="auto"
              />
            </Link>
          </Div>
        </LazyLoad>

        {/* For you master suite */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={694}>
          <Div bg="#F2F2F2" pt="30px" pb="10px">
            <Heading
              mb="20px"
              fontSize="22px"
              style={{
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium"
              }}
            >
              {forYourMasterSuite.mainTitle}
            </Heading>
            <Link to={forYourMasterSuite.url_key}
            onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: forYourMasterSuite.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: forYourMasterSuite.mainTitle||""
              });
            }}
            >
              <Heading
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontFamily: "medium",
                  color: "#222222"
                }}
              >
                {forYourMasterSuite.buttonTitle}
                <img
                  style={{
                    display: "inline",
                    marginLeft: "-6px",
                    height: "10px",
                    width: "40px"
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </Heading>
              <Image
                mt="20px"
                data-src={forYourMasterSuite.image}
                src={`${forYourMasterSuite.image}?blur=30`}
                width="100%"
                height="auto"
              />
            </Link>

            {/* Get the look*/}
            <Div pl="20px" pr="20px" mt="30px" mb="10px">
              {/* <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}> */}
              {getTheLook2.id === "2" || getTheLook2.id === 2 ? (
                <CategoryCarouselLook
                  categoryName="Get the Look"
                  colSize="45%"
                  id={1}
                  getTheLook={getTheLook2}
                />
              ) : null}
              {/* </LazyLoad> */}
            </Div>
          </Div>
        </LazyLoad>

        {/* Our fav summer sheets */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={506}>
          <Div pt="30px" pb="30px">
            <Heading
              mb="15px"
              fontSize="22px"
              style={{
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium"
              }}
            >
              {ourBeddingFavourites.mainTitle}
            </Heading>
            <Link to={ourBeddingFavourites.url_key}
            onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: ourBeddingFavourites.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: ourBeddingFavourites.mainTitle||""
              });
            }}
            >
              <Heading
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  fontFamily: "medium",
                  color: "#222222"
                }}
              >
                {ourBeddingFavourites.buttonTitle}
                <img
                  style={{
                    display: "inline",
                    marginLeft: "-6px",
                    height: "10px",
                    width: "40px"
                  }}
                  src={arrowForward}
                  alt="Arrow"
                />
              </Heading>
              <Image
                mt="20px"
                data-src={ourBeddingFavourites.image}
                src={`${ourBeddingFavourites.image}?blur=30`}
                width="100%"
                height="250px"
              />
            </Link>
            <Text
              pl="35px"
              pr="35px"
              mt="20px"
              style={{ textAlign: "center", color: "#898989" }}
              fontSize="15px"
              lineHeight="1.2rem"
            >
              {ourBeddingFavourites.description}
            </Text>
          </Div>
        </LazyLoad>

        {/* For a better sleep */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={692}>
          <Div pl="30px" pr="30px">
            <div className="gradient-sleep">
              <Heading
                style={{
                  textAlign: "center",
                  color: "#323131",
                  fontFamily: "medium"
                }}
                fontSize="24px"
                mb="10px"
                mt="0px"
                pb="5px"
                pt="30px"
              >
                {forBetterSleep.mainTitle}
              </Heading>
            </div>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #222222",
                margin: "auto",
                marginBottom: "20px"
              }}
            />
            {/* <Link to="/furniture/bedroom-furniture"> */}
            <Image
              data-src={forBetterSleep.image}
              src={`${forBetterSleep.image}?blur=30`}
              alt="ForABetterSleep"
              width="100%"
              height="250px"
            />
            {/* </Link> */}
            <Div mt="30px">
              <Row
                style={{ display: "flex", justifyContent: "space-between" }}
                pb="5px"
              >
                <Div style={{ width: "40%" }}>
                  <Link to={forBetterSleep.data[0].url_key}
                  onClick={()=>{
                    window.dataLayer.push({
                      event: 'pt_global_click_link_banner_click',
                      pagetype: '',
                      source_page_url: window.location.href,
                      previous_page_url: '',
                      destination_page_url: forBetterSleep.data[0].url_key,
                      login_status: '',
                      user_id: '',
                      page_url: window.location.href,
                      banner_id: '',
                      click_text: forBetterSleep.data[0].title||""
                    });
                  }}
                  >
                    <Image
                      data-src={forBetterSleep.data[0].image}
                      src={`${forBetterSleep.data[0].image}?blur=30`}
                      alt="ForABetterSleep01"
                      width="100%"
                      height="auto"
                    />
                    <div
                      style={{
                        background: "#FFFFFF",
                        padding: "4px 10px",
                        width: "85%",
                        margin: "-15px auto 0px",
                        position: "relative",
                        opacity: "90%",
                        textAlign: "center",
                        fontSize: "14px"
                        // fontWeight: 'bolder'
                      }}
                    >
                      {forBetterSleep.data[0].title}
                    </div>
                  </Link>
                </Div>
                <Div style={{ width: "40%" }}>
                  <Link to={forBetterSleep.data[1].url_key}
                   onClick={()=>{
                    window.dataLayer.push({
                      event: 'pt_global_click_link_banner_click',
                      pagetype: '',
                      source_page_url: window.location.href,
                      previous_page_url: '',
                      destination_page_url: forBetterSleep.data[1].url_key,
                      login_status: '',
                      user_id: '',
                      page_url: window.location.href,
                      banner_id: '',
                      click_text: forBetterSleep.data[1].title||""
                    });
                  }}
                  >
                    <Image
                      data-src={forBetterSleep.data[1].image}
                      src={`${forBetterSleep.data[1].image}?blur=30`}
                      alt="ForABetterSleep02"
                      width="100%"
                      height="auto"
                    />
                    <div
                      style={{
                        background: "#FFFFFF",
                        padding: "4px 10px",
                        width: "85%",
                        margin: "-15px auto 0px",
                        position: "relative",
                        opacity: "90%",
                        textAlign: "center",
                        fontSize: "14px"
                        // fontWeight: 'bolder'
                      }}
                    >
                      {forBetterSleep.data[1].title}
                    </div>
                  </Link>
                </Div>
              </Row>
              <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <Div style={{ width: "40%" }}>
                  <Link to={forBetterSleep.data[2].url_key}
                   onClick={()=>{
                    window.dataLayer.push({
                      event: 'pt_global_click_link_banner_click',
                      pagetype: '',
                      source_page_url: window.location.href,
                      previous_page_url: '',
                      destination_page_url: forBetterSleep.data[2].url_key,
                      login_status: '',
                      user_id: '',
                      page_url: window.location.href,
                      banner_id: '',
                      click_text: forBetterSleep.data[2].title||""
                    });
                  }}
                  >
                    <Image
                      data-src={forBetterSleep.data[2].image}
                      src={`${forBetterSleep.data[2].image}?blur=30`}
                      alt="ForABetterSleep03"
                      width="100%"
                      height="auto"
                    />
                    <div
                      style={{
                        background: "#FFFFFF",
                        padding: "4px 10px",
                        width: "85%",
                        margin: "-15px auto 0px",
                        position: "relative",
                        opacity: "90%",
                        textAlign: "center",
                        fontSize: "14px"
                        // fontWeight: 'bolder'
                      }}
                    >
                      {forBetterSleep.data[2].title}
                    </div>
                  </Link>
                </Div>
                <Div style={{ width: "40%" }}>
                  <Link to={forBetterSleep.data[3].url_key}
                   onClick={()=>{
                    window.dataLayer.push({
                      event: 'pt_global_click_link_banner_click',
                      pagetype: '',
                      source_page_url: window.location.href,
                      previous_page_url: '',
                      destination_page_url: forBetterSleep.data[3].url_key,
                      login_status: '',
                      user_id: '',
                      page_url: window.location.href,
                      banner_id: '',
                      click_text: forBetterSleep.data[3].title||""
                    });
                  }}
                  >
                    <Image
                      data-src={forBetterSleep.data[3].image}
                      src={`${forBetterSleep.data[3].image}?blur=30`}
                      alt="ForABetterSleep04"
                      width="100%"
                      height="auto"
                    />
                    <div
                      style={{
                        background: "#FFFFFF",
                        padding: "4px 10px",
                        width: "85%",
                        margin: "-15px auto 0px",
                        position: "relative",
                        opacity: "90%",
                        textAlign: "center",
                        fontSize: "14px"
                        // fontWeight: 'bolder'
                      }}
                    >
                      {forBetterSleep.data[3].title}
                    </div>
                  </Link>
                </Div>
              </Row>
            </Div>
          </Div>
        </LazyLoad>

        {/* Shop our best sellers - Pasha */}

        {bestsellers && bestsellers.length ? (
          <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
            <Div pl="10px" pr="10px" mt="30px" mb="15px" bg="#F7F0F0">
              <CategoryCarouselDeals
                categoryName="Shop our Bestsellers"
                colSize="45%"
                id={2}
                data={bestsellers}
              />
            </Div>
          </LazyLoad>
        ) : null}

        {/* New arrivals */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={371}>
          <Div mt="20px">
            <Heading
              ta="center"
              pl="30px"
              pr="30px"
              style={{
                color: "#323131",
                fontFamily: "medium",
                whiteSpace: "normal"
              }}
              fontSize="22px"
              mb="10px"
            >
              {shopOurNewArrivalFurniture.mainTitle}
            </Heading>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #222222",
                margin: "auto",
                marginBottom: "20px"
              }}
            />
            <Link to={shopOurNewArrivalFurniture.url_key}
            onClick={()=>{
              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: shopOurNewArrivalFurniture.url_key,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: shopOurNewArrivalFurniture.mainTitle||""
              });
            }}
            >
              <Image
                data-src={shopOurNewArrivalFurniture.image}
                src={`${shopOurNewArrivalFurniture.image}?blur=30`}
                alt="NewArrival"
                width="100%"
                height="250px"
              />
            </Link>
          </Div>
        </LazyLoad>

        <LazyLoad placeholder={<PlaceHolderShimmer />} height={1020}>
          {/* D&B and MK */}
          <Div mt="50px" pl="30px" pr="30px">
            <Div p="20px 10px" style={{ border: "2px solid black" }}>
              <Div>
                <Heading
                  ta="center"
                  fontSize="22px"
                  pt="10px"
                  pl="20px"
                  pr="20px"
                  mb="10px"
                  style={{
                    color: "#323131",
                    whiteSpace: "normal",
                    fontFamily: "medium"
                  }}
                  lineHeight="30px"
                >
                  {customiseYourHome.mainTitle}
                </Heading>
                <div
                  style={{
                    width: "30px",
                    borderTop: "2px solid #222222",
                    margin: "auto",
                    marginBottom: "20px"
                  }}
                />
                <Image
                  // src={DesignBuild}
                  data-src={customiseYourHome.image}
                  src={`${customiseYourHome.image}?blur=30`}
                  alt="ModularKitchen"
                  style={{
                    position: "relative",
                    zIndex: 10
                  }}
                  width="100%"
                  height="auto"
                />
                <Div
                  bg="#F2F2F2"
                  style={{ width: "100vw" }}
                  ml="-40px"
                  pl="40px"
                  pr="40px"
                  pt="100px"
                  pb="30px"
                  mt="-90px"
                >
                  <Heading
                    fontFamily="medium"
                    color="#222222"
                    style={{ marginBottom: "10px", fontSize: "20px" }}
                  >
                    {customiseYourHome.title}
                  </Heading>
                  <Text
                    color="#383838"
                    fontSize="14px"
                    lineHeight="1.2rem"
                    mb="20px"
                  >
                    {customiseYourHome.description}
                  </Text>
                  <Link
                    // to="/design-build/"
                    to={customiseYourHome.url_key}
                    // target="_blank"
                    style={{
                      fontWeight: "bold",
                      fontSize: "12px"
                    }}
                    onClick={()=>{
                      window.dataLayer.push({
                        event: 'pt_global_click_link_banner_click',
                        pagetype: '',
                        source_page_url: window.location.href,
                        previous_page_url: '',
                        destination_page_url: customiseYourHome.url_key,
                        login_status: '',
                        user_id: '',
                        page_url: window.location.href,
                        banner_id: '',
                        click_text: 'KNOW MORE'
                      });
                    }}
                  >
                    KNOW MORE
                    <img
                      style={{
                        display: "inline",
                        marginLeft: "-6px",
                        height: "10px",
                        width: "40px"
                      }}
                      src={arrowForward}
                      alt="Arrow"
                    />
                  </Link>
                </Div>
              </Div>
              <Div
                ml="-22px"
                mr="-22px"
                pt="10px"
                pl="20px"
                pr="20px"
                style={{ border: "2px solid white", float: "none" }}
              >
                <Div>
                  {/* <Heading textAlign="center" my={20}>Customise Your Home With Us</Heading> */}
                  <Image
                    pt="30px"
                    // src={ModularKitchen}
                    data-src={designAndBuild.image}
                    src={`${designAndBuild.image}?blur=30`}
                    alt="DesignBuild"
                    style={{ position: "relative", zIndex: 10 }}
                    width="100%"
                    height="auto"
                  />
                  <Div
                    bg="#F2F2F2"
                    style={{ width: "100vw" }}
                    ml="-40px"
                    pl="40px"
                    pr="40px"
                    pt="100px"
                    pb="30px"
                    mt="-90px"
                  >
                    <Heading
                      color="#222222"
                      fontFamily="medium"
                      style={{ marginBottom: "10px", fontSize: "20px" }}
                    >
                      {designAndBuild.mainTitle}
                    </Heading>
                    <Text
                      color="#383838"
                      fontSize="14px"
                      lineHeight="1.2rem"
                      mb="20px"
                    >
                      {designAndBuild.description}
                    </Text>
                    <Link
                      to={designAndBuild.url_key}
                      target="_blank"
                      style={{ fontWeight: "bold", fontSize: "12px" }}
                      onClick={()=>{
                        window.dataLayer.push({
                          event: 'pt_global_click_link_banner_click',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: designAndBuild.url_key,
                          login_status: '',
                          user_id: '',
                          page_url: window.location.href,
                          banner_id: '',
                          click_text: 'KNOW MORE'
                        });
                      }}
                    >
                      KNOW MORE
                      <img
                        style={{
                          display: "inline",
                          marginLeft: "-6px",
                          height: "10px",
                          width: "40px"
                        }}
                        src={arrowForward}
                        alt="Arrow"
                      />
                    </Link>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </LazyLoad>
        {/* Easy finance - static images */}
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={428}>
          <Div
            pl="30px"
            pr="30px"
            pt="30px"
            pb="20px"
            mb="20px"
            mt="40px"
            bg="#F5EEEE"
          >
            {easyFinance.data.length ? (
              <CategoryCarouselFinance
                categoryName="Get the Look"
                colSize="45%"
                easyFinance={easyFinance}
              />
            ) : null}
          </Div>
        </LazyLoad>
      </Section>
    );
  }
}

export default Home;

Home.defaultProps = {
  banners: [],
  homepageCategories: [],
  homepageProducts: [],
  recentlyviewed: [],
  cities: [],
  middleBanner: {},
  announcementBar: "",
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
