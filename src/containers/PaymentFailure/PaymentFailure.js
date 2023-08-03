import React, { Component } from "react";
import PropTypes from "prop-types";
import PaymentFailure from "components/PaymentFailure";
import BflPaymentFailure from "components/PaymentFailure/BflPaymentFailure";
import { connect } from "react-redux";
import FailurePage from "../../components/Order/PaymentFail";
import { wePaymentFailure } from "../../redux/modules/paymentstatus";

class PaymentFailureContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.context.store;
    dispatch(wePaymentFailure());
  }
  render() {
    const {
      match: {
        params: { orderId }
      },
      emiPaymentType
    } = this.props;
    return (
      <div>
        <FailurePage />
        {emiPaymentType === "bfl" ? (
          <BflPaymentFailure />
        ) : (
          <PaymentFailure orderId={orderId} />
        )}
      </div>
    );
  }
}

PaymentFailureContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  emiPaymentType: PropTypes.string
};

PaymentFailureContainer.defaultProps = {
  emiPaymentType: ""
};

PaymentFailureContainer.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = ({ app: { emiPaymentType } }) => ({
  emiPaymentType
});

export default connect(mapStateToProps, null)(PaymentFailureContainer);
