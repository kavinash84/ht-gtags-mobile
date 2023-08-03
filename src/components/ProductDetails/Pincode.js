import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from 'hometown-components/lib/Input';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import * as actionCreators from 'redux/modules/pincode';
import { pincode as pincodeCheck } from 'utils/validation';
import { getDelieveryInfo } from 'redux/modules/productdetails';

const styles = require('./Pincode.scss');
const location = require('../../../static/map-icon.svg');

const onChange = dispatcher => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
};

const mapStateToProps = ({ pincode, productdetails }) => ({
  ...pincode,
  simpleSku: productdetails.simpleSku
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionCreators, deliveryInfo: getDelieveryInfo }, dispatch);

class Pincode extends React.Component {
  state = {
    validationError: false,
    validationErrorMessage: 'Please Enter Valid Pincode'
  };

  setPincodeInStore = (dispatcher, pincode) => e => {
    e.preventDefault();
    const { simpleSku, deliveryInfo } = this.props;
    this.setState(
      {
        validationError: pincodeCheck(pincode)
      },
      () => {
        if (!this.state.validationError) {
          dispatcher(pincode);
          deliveryInfo(simpleSku, pincode);
        }
      }
    );
  };

  render() {
    const { setPincodeQuery, setPincode, pincodeQuery } = this.props;
    const { validationError, validationErrorMessage } = this.state;
    return (
      <Div className={styles.pdpPincode} pt="0" pb="0.3125rem">
        {/* <Img
          width="initial"
          height="1.5em"
          mr="0.625rem"
          mt="0"
          float="left"
          src={location}
          className={styles.pincodeIcon}
        /> */}
        <form onSubmit={this.setPincodeInStore(setPincode, pincodeQuery)}>
          <Input
            type="text"
            placeholder="Enter pin code"
            backgroundColor="transparent"
            borderColor="rgb(202, 202, 202)"
            height="2.5rem"
            onChange={onChange(setPincodeQuery)}
            value={pincodeQuery}
            style={{ width: '70%' }}
          />
          <button className={styles.pincodeCheckBtn} onClick={this.setPincodeInStore(setPincode, pincodeQuery)}>
            Go
          </button>
        </form>
        {validationError && <div>{validationErrorMessage}</div>}
      </Div>
    );
  }
}

Pincode.defaultProps = {
  pincodeQuery: '',
  simpleSku: ''
};

Pincode.propTypes = {
  pincodeQuery: PropTypes.string,
  setPincodeQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  deliveryInfo: PropTypes.func.isRequired,
  simpleSku: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pincode);
