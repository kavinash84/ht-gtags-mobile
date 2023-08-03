import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
const mapIcon = require('../../../static/map-icon-primary.svg');
import { BASE_IMAGE_URL } from "../../helpers/Constants";

@connect(({ designBuild }) => ({
  seoInfo:
    designBuild.exchangeOffer &&
    designBuild.exchangeOffer &&
    designBuild.exchangeOffer.items,
  validity: designBuild.exchangeOfferCoupon.validity
}))
class ThankYouEoContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
    render() {
      const { seoInfo, validity } = this.props;
      if(!validity){
        return (
          <Helmet></Helmet>
        )
      }
      return (
        <section style={{ paddingTop: "0px" }}>
          <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
            <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
            <meta
              name="description"
              content={seoInfo && seoInfo.meta_description}
            />
            {/* Meta Pixel Code  */}
            <script>
              {`fbq('trackSingle', '1024172491523922', 'PageView');`}
            </script>
            <script>
              {`fbq('trackSingleCustom', '1024172491523922', 'HTElead');`}
            </script>
            <noscript>
              {`
              <img
                  alt=""
                  height="1"
                  width="1"
                  style="display:none"
                  src="https://www.facebook.com/tr?id=1024172491523922&ev=HTElead&noscript=1"
              />
            `}
            </noscript>
            {/* <!-- End Meta Pixel Code --> */}
          </Helmet>
          <noscript>
            <img src="https://ttrk.ringocount.com/pixel?adid=621c50fcfba3a36de041935b" />
          </noscript>
          {/* <LandingPageLogo /> */}
          <img src={`${BASE_IMAGE_URL}/media/cms/extras/Thank-revised.jpg`} alt="banner" />
          <div style={{ paddingBottom: "25px" }}>
            <div style={{ padding: "20px" }}>
              <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
                THANK YOU FOR REGISTERING
              </h2>
              <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                Your exchange voucher code has been sent on your registered email
                ID and mobile number.
              </h2>
              <p style={{ marginBottom: "20px", textAlign: "center" }}>
                Redeem your exchange code at the nearest HomeTown store or online
                on a wide range of sofas, recliners, beds, wardrobes, dining table
                sets, mattress and more
              </p>
              <h2
                style={{
                  marginBottom: "10px",
                  textAlign: "center",
                  color: "#dc4c3a",
                  fontSize: "20px"
                }}
              >
                Your voucher is valid till {validity}
              </h2>
            </div>
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "22px",
                  padding: "0px 20px 25px"
                }}
              >
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.hometown.in/?utm_source=Landing-Page&utm_medium=Thank-You&utm_campaign=Exchange"
                  style={{
                    textDecoration: "underline",
                    color: "rgba(51, 51, 51, 0.85)"
                  }}
                >
                  Click here to redeem code online on hometown.in
                </a>
              </h2>
              <div>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={() => {
                    // if (window && window.fbq) {
                    //   window.fbq("track", "StoreLocatorE&U");
                    // }
                  }}
                  href="https://www.hometown.in/store-locator"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px"
                  }}
                >
                  <img src={mapIcon} alt="Store Locator" />
                  <span>Find a HomeTown store near you.</span>
                </a>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.hometown.in/promotions"
                >
                  Exchange T&C's
                </a>
              </div>
            </div>
          </div>
          <img src="https://ttrk.ringocount.com/pixel?adid=621c50fcfba3a36de041935b" />
        </section>
      );
    }
}
export default ThankYouEoContainer;
