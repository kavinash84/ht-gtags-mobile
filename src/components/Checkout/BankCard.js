import React from "react";
import PropTypes from "prop-types";
import Div from "hometown-components/lib/Div";
import { Label } from "hometown-components/lib/Label";
import ImageShimmerMobile from "hometown-components/lib/ImageShimmerMobile";
import Img from "hometown-components/lib/Img";
import { setCreditCard } from "../../redux/modules/paymentoptions";
import { connect } from 'react-redux';

const styles = require("./Checkout.scss");

const changeDetails = (dispatcher, gateway, name, detailkey) => {
  dispatcher({ gateway, data: { [detailkey]: name } });
};

@connect(({ paymentoptions }) => ({
  isCreditSelected : paymentoptions.isCreditSelected
}))

class BankCard extends React.Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

handleClick = (value) => {
  const { dispatch } = this.context.store;
  dispatch(setCreditCard(value));
}

  render() {
    const {
      name,
      img,
      setPaymentDetails,
      gateway,
      detailkey,
      currentSelection,
      isCreditSelected
    } = this.props;
    return (
      <Div
        col="6"
        pr="1rem"
        onClick={() => {
          this.handleClick(true);
          changeDetails(setPaymentDetails, gateway, name, detailkey);
        }}
      >
        <Div className={styles.bankCard}>
          <input
            type="radio"
            name="bankOptions"
            id={`bankOptions${name}`}
            checked={currentSelection === name && isCreditSelected }
          />
          <Label for={`bankOptions${name}`} bg="#FFF" va="middle">
            <ImageShimmerMobile src={img} height="22px">
              {imageURL => (
                <Img
                  height="30px"
                  alt={name}
                  src={imageURL}
                  style={{ maxWidth: "80px", minWidth: "80px" }}
                />
              )}
            </ImageShimmerMobile>
          </Label>
        </Div>
      </Div>
    );
  }
}

export default BankCard;

BankCard.defaultProps = {
  img: "",
  name: "",
  currentSelection: ""
};

BankCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  detailkey: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  currentSelection: PropTypes.string
};

