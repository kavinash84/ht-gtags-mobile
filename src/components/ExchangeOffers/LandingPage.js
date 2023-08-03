import React, {Component} from "react";
import {connect} from "react-redux";
import Helmet from "react-helmet";
import Theme from "hometown-components/lib/Theme";
import Button from "hometown-components/lib/Buttons";
import SeoContent from "../../components/SeoContent";
import Form from "./FormComp";
import LeadSuccess from "./SuccessPage";
import LandingPageLogo from "./LandingPageLogo";
import {BASE_IMAGE_URL} from "../../helpers/Constants"

@connect(({ designBuild }) => ({
  seoInfo:
    designBuild.exchangeOffer &&
    designBuild.exchangeOffer &&
    designBuild.exchangeOffer.items
}))
export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UI: "Landing",
      email: "",
      mobile: "",
      showmore: true
    };
  }


  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  getUI = () => {
    const { UI, showmore } = this.state;
    const { history, seoInfo } = this.props;
    if (UI === "Success") {
      return <LeadSuccess {...this.state} />;
    }
    return (
      <section>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-832074530"
          ></script>
          <script>
            {` window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());

               gtag('config', 'AW-832074530'); `}
          </script>
        </Helmet>
        <LandingPageLogo />
        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
          <img src={`${BASE_IMAGE_URL}/media/cms/banner/exchange-offer/header_banner.png`} alt="Banner" />
        </div>
        <div>
          <div style={{ padding: "10px" }}>
            <h4 style={{ color: "#dc4c3a", fontSize: "14px" }}>
              REGISTER TO GET FREE EXCHANGE VOUCHERS
            </h4>
          </div>
          <div style={{ padding: "10px" }}>
            <div style={{ marginBottom: "15px", fontSize: "15px" }}>
              <h4 style={{ marginBottom: "10px" }}>
                Let old pay for the new in 3 Easy Steps!
              </h4>
              <ul style={{ padding: "10px 20px 20px" }}>
                <li style={{ marginBottom: "10px" }}>
                  <p>
                    Upload a picture of any old sofas, recliners, beds, wardrobes, dining sets, mattress and more.
                  </p>
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <p>Submit your details and get a FREE EXCHANGE VOUCHER.</p>
                </li>
                <li>
                  <p>
                    Visit the nearest HomeTown store or shop online at hometown.in to redeem your exchange voucher code on a wide range of furniture, mattress, homeware, decore, furnishings and much more...
                  </p>
                </li>
              </ul>
              {/* <h4
                className="mt-3 mt-sm-5 mb-5 mb-sm-0"
                style={{
                  color: '#dc1c52',
                  fontWeight: 700,
                  fontSize: '24px',
                  lineHeight: '34px'
                }}
              >
                Exchange opens 14th February 2020 onwards.
              </h4> */}
            </div>
            <div style={{ padding: "0px 10px" }}>
              <Form switchUI={this.switchUI} history={history} />
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #595959" }}>
          {/* <div className="col-12 mb-2">
            <h2 className="valueTitle">VALUE FOR YOUR OLD PRODUCTS</h2>
          </div> */}
          <div>
            <img src={`${BASE_IMAGE_URL}/media/cms/banner/exchange-offer/footer-banner-4.png`} alt="BottomBanner" />
          </div>
        </div>
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
      </section>
    );
  };
  switchUI = ({ email, mobile }) => {
    this.setState({
      UI: "Success",
      email,
      mobile
    });
  };
  render() {
    return this.getUI();
  }
}
