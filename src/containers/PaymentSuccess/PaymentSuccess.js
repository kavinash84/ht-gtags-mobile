import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import PaymentSuccess from "components/PaymentSuccess";

import {
  paymentLoaded as setPaymentLoadStatus,
  setEmiPaymentType
} from "redux/modules/app";
import SuccessPage from "../../components/Order/PaymentSuc";

@connect(
  ({
    paymentstatus: { data, loaded, error },
    userLogin: { isLoggedIn },
    app: { paymentLoaded }
  }) => ({
    data,
    loaded,
    error,
    isLoggedIn,
    paymentLoaded
  })
)
export default class PaymentSuccessContainer extends Component {
  static propTypes = {
    data: PropTypes.object,
    error: PropTypes.string,
    paymentLoaded: PropTypes.string,
    loaded: PropTypes.bool,
    // isLoggedIn: PropTypes.bool,
    history: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    data: "",
    error: "",
    paymentLoaded: false,
    loaded: false
    // isLoggedIn: false
  };
  componentDidMount() {
    const { history, data, error, paymentLoaded } = this.props;

    if (data === "An internal server error occurred") return history.push("/");

    if (data && error === "") {
      const { dispatch } = this.context.store;
      dispatch({
        type: "PUSH_TO_DATALAYER"
      });
      dispatch(setPaymentLoadStatus(true));
      dispatch(setEmiPaymentType(""));
    }
  }
  render() {
    const { data, error, loaded } = this.props;
    return (
      <div>
        <Helmet>
          <script type="text/javascript">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1024172491523922');
              fbq('track', 'Purchase');              
            `}
          </script>
          <script type="text/javascript" defer>
            {`
            gtag('event', 'conversion', {
                'send_to': 'AW-845903914/tkEvCJrdi6YDEKrwrZMD',
                'transaction_id': ''
            });
            `}
          </script>
        </Helmet>
        <SuccessPage />
        {data ? (
          <PaymentSuccess data={data} error={error} loaded={loaded} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
