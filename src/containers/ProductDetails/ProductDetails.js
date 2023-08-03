import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductDetailsContainer from "components/ProductDetails";
import Menu from "components/MenuWithoutNav";
import Footer from "components/Footer";
import ProductNotFoundContainer from "./ProductNotFound";
import Helmet from "react-helmet";

@connect(({ productdetails }) => ({
  ...productdetails
}))
export default class ProductDetails extends Component {
  state = { showScript: false };
  componentDidMount() {
    this.setState({ showScript: true });
  }
  render() {
    const { loading, loaded, history, productDescription } = this.props;
    return (
      <div>
        <Helmet>
          {/* <!-- Meta Pixel Code --> */}
          {this.state.showScript && (
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
          )}
          {/* <!-- End Meta Pixel Code --> */}
        </Helmet>
        {!loading &&
          loaded &&
          productDescription &&
          productDescription.error_message && <ProductNotFoundContainer />}
        {!loading && !productDescription.error_message && loaded && (
          <div>
            <Menu backBtn={false} menuIcon logoShow />
            <div>
              <ProductDetailsContainer history={history} />
            </div>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

ProductDetails.defaultProps = {
  loading: false,
  loaded: false,
  productDescription: {}
};

ProductDetails.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  productDescription: PropTypes.object,
  history: PropTypes.object.isRequired
};
