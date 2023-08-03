import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResponsiveModal from "components/Modal";
import Section from "hometown-components/lib/Section";
import Container from "hometown-components/lib/Container";
import { PINCODE } from "helpers/Constants";
import Helmet from "react-helmet";
import Theme from "hometown-components/lib/Theme";
import Button from "hometown-components/lib/Buttons";
import SeoContent from "components/SeoContent";
import ReviewMenu from "../ReviewMenu";
import DeliveryAddress from "../Cart/deliveryAddress";
import PackagePincode from "./packagePincode";
import PackageBreadCrumb from "./packageBreadcrumb";
import { loadPackagesSeo } from "../../redux/modules/lackpackages";

const BreadCrumpstyles = require("../Review/BreadCrumb.scss");
const styles = require("./index.scss");

@connect(({ userLogin, lackpackages, pincode }) => ({
  packages_data: lackpackages.packages_data,
  selectedPincode: pincode.selectedPincode,
  seoInfo: lackpackages.seo && lackpackages.seo && lackpackages.seo.items
}))
export default class OneLacPackage extends Component {
  state = {
    activeTab: 0,
    openModal: false,
    slected: "",
    showmore: true
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleTab = i => {
    this.setState({ activeTab: i });
  };

  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  handleBannerClick = (verify, id) => {
    const { selectedPincode } = this.props;
    if (selectedPincode === PINCODE && verify) {
      this.handleModal();
      this.setState({ slected: id });
    } else {
      const { history } = this.props;
      if (id) {
        history.push(`/package-catalog/${id}`);
      } else {
        history.push(`/package-catalog/${this.state.slected}`);
      }
    }
  };

  componentDidMount() {
    const { packages_data } = this.props;
    let found = "";
    if (packages_data && packages_data.tabs) {
      {
        packages_data.tabs.map((item, i) => {
          if (item.package.length && !Number.isInteger(found)) {
            found = i;
          }
        });
      }
    }
    if (Number.isInteger(found)) {
      this.setState({ activeTab: found });
    }
    const { dispatch } = this.context.store;
    dispatch(loadPackagesSeo());
  }

  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  render() {
    const { activeTab, showmore } = this.state;
    const { packages_data, seoInfo } = this.props;
    return (
      <div className="wrapper">
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
        </Helmet>
        <div className={styles.selectyourPackContainer}>
          <ReviewMenu backBtn={false} />
          <div className={BreadCrumpstyles.BreadCrumb_wrapper2}>
            <PackageBreadCrumb isPacakge={false} />
          </div>
          <Section mb="0px" p="0px" pr="0px" pl="0px">
            <Container type="container" pr="0px" pl="0px">
              <DeliveryAddress />
            </Container>
          </Section>
          <img src={packages_data.banner} alt="Banner" />
          <div
            style={{
              textAlign: "center",
              color: "#666666",
              fontSize: "16px",
              padding: "15px"
            }}
          >
            {packages_data.description}
          </div>
          <div
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "22px",
              marginTop: "10px",
              color: "black"
            }}
          >
            Select Your Packages
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingTop: "10px",
              marginBottom: "15px"
            }}
          >
            <div
              style={{
                border: "1px solid black",
                width: "10%",
                textAlign: "center"
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            {packages_data.tabs.map((item, i) => {
              if (Array.isArray(item.package) && item.package.length) {
                return (
                  <div
                    className={
                      activeTab === i
                        ? styles.activeTabContainer
                        : styles.tabContainer
                    }
                  >
                    <div
                      className={
                        activeTab === i ? styles.activeTab : styles.tab
                      }
                      onClick={() => this.handleTab(i)}
                    >
                      {item.title}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div
            style={{ background: "#FFF8F4", width: "100%", padding: "30px" }}
          >
            {packages_data.tabs[activeTab].package.map(pack => (
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <img
                    src={pack.img}
                    alt="Banner"
                    onClick={() => this.handleBannerClick(true, pack.id)}
                  />
                  {pack.pseudoItemsCount ? (
                    <div
                      className={styles.slectedStatus}
                      onClick={() => this.handleBannerClick(true, pack.id)}
                    >
                      <div>
                        {pack.pseudoItemsCount}/{pack.totalQty} Products Saved
                      </div>
                      <div>View All</div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveModal
          classNames={{ modal: "PackageModal" }}
          onCloseModal={this.handleModal}
          open={this.state.openModal}
        >
          <div
            style={{
              background: "#F5EEEE",
              height: "50px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px"
            }}
          />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <span
              style={{
                color: "#000000",
                fontSize: "22px",
                fontWeight: 600,
                textAlign: "center",
                margin: "20px 0px",
                width: "60%"
              }}
            >
              {" "}
              Please Confirm Your Pincode To Proceed With The Package
            </span>
          </div>
          <div
            style={{ padding: "25px 20px", fontSize: "16px", color: "#000000" }}
          >
            <PackagePincode
              handleModal={this.handleModal}
              handleBannerClick={this.handleBannerClick}
            />
          </div>
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
      </div>
    );
  }
}
