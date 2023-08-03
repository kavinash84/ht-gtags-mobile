import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PYK_URL } from "helpers/Constants";
import Footer from "components/Footer";
import Section from "hometown-components/lib/Section";
import Helmet from "react-helmet";
import Div from "hometown-components/lib/Div";
import Heading from "hometown-components/lib/Heading";
import Img from "hometown-components/lib/Img";
import ResponsiveModal from "components/Modal";
import Theme from "hometown-components/lib/Theme";
import Button from "hometown-components/lib/Buttons";
import SeoContent from "components/SeoContent";
import { sendData, getData } from "redux/modules/services";

import Header from "./Header";
import ModularKitchenFormModal from "./ModularKitchenFormModal";

import "./Slider.css";
import WardrobesEveryone from "./WardrobesEveryone";
import CustomerStories from "./CustomerStories";
import ShopNow from "./ShopNow";
import LetUsHelp from "./letusHelp";
import WhyChoose from "./Whychoose";
import WardrobeTypes from "./WardrobesTypes";
import Materials from "./Materials";
import Finishes from "./Finishes";
import NewWardrobe from "./NewWardrobe";
import Accessories from "./Accessories";
import TopBanner from "./topBanner";

@connect(
  ({ services, modularWardrobe, userLogin, profile }) => ({
    modularWardrobe,
    livingRoom: modularWardrobe.data.items.text.livingRoom,
    Kitchen: modularWardrobe.data.items.text.Kitchen,
    bedRoom: modularWardrobe.data.items.text.bedRoom,
    seoInfo:
      modularWardrobe.data &&
      modularWardrobe.data.seo &&
      modularWardrobe.data.seo.items,
    isLoggedIn: userLogin.isLoggedIn,
    fullName: profile.data ? profile.data.full_name : undefined,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
export default class ModularWardRobe extends Component {
  state = {
    openModal: false,
    open: false,
    makeItOwnSelect: "Organisers",
    organiser: true,
    handles: false,
    lights: false,
    countertops: false,
    showmore: true
  };
  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  handleModalWithSave = () => {
    this.setState({
      openModal: false
    });
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 1000);
  };

  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  render() {
    const {
      livingRoom,
      Kitchen,
      bedRoom,
      isLoggedIn,
      fullName,
      loading,
      loaded,
      seoInfo
    } = this.props;
    const { showmore } = this.state;
    const correctIcon = require("../../../static/correct.svg");

    return (
      <Div display="block">
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
        </Helmet>
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

        {/* Why choose us */}
        <WhyChoose />

        {/* Wardrobes for Everyone */}
        <WardrobesEveryone />

        {/* Types of Wardrobes */}
        <WardrobeTypes />

        {/* Materials We use */}
        <Materials />

        {/* Finishes We Offer */}
        <Finishes />

        {/* New wardrobe */}
        <NewWardrobe handleModal={this.handleModal} />

        {/* <Accessories/> */}
        <Accessories />

        {/* CustomerStories */}
        {/* <CustomerStories /> */}

        {/* shop furniture */}
        <ShopNow />

        {/* help u */}
        {/* <LetUsHelp /> */}

        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: "mkModal" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <ModularKitchenFormModal
              handleModalWithSave={this.handleModalWithSave}
            />
          </ResponsiveModal>
          <Div>
            {!loading && loaded ? (
              <ResponsiveModal
                classNames={{ modal: "mkModal" }}
                onCloseModal={() => this.setState({ open: false })}
                open={this.state.open}
              >
                <Div
                  mt="50px"
                  p="50px 15%"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                >
                  <Heading
                    ta="center"
                    fontSize="22px"
                    mb="50px"
                    mt="10px"
                    color="#000000"
                    style={{ whiteSpace: "normal" }}
                  >
                    Thank you for your Interest, Our Team will get in touch with
                    you Shortly
                  </Heading>
                  <Img
                    m="0 auto 5px"
                    width="100px"
                    src={correctIcon}
                    alt="Reload Page"
                  />
                </Div>
              </ResponsiveModal>
            ) : null}
          </Div>

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

ModularWardRobe.defaultProps = {
  data: null
};
ModularWardRobe.propTypes = {
  data: PropTypes.object
};
