import React from "react";
import PropTypes from "prop-types";
import Button from "hometown-components/lib/Buttons";
import { Label } from "hometown-components/lib/Label";
import Row from "hometown-components/lib/Row";
import Div from "hometown-components/lib/Div";
import Img from "hometown-components/lib/Img";
import Theme from "hometown-components/lib/Theme";
import { connect } from "react-redux";
import { updateCart, removeFromCart } from "redux/modules/cart";
import { PINCODE } from "helpers/Constants";

const styles = require("./checkbox.scss");

const ReductIcon = require("../../../static/remove_circle_outline.svg");
const IncreaseIcon = require("../../../static/add_circle_outline.svg");
const DeleteIcon = require("../../../static/delete.svg");

const mapStateToProps = ({ pincode, app }) => ({
  pincode: pincode.selectedPincode === "" ? PINCODE : pincode.selectedPincode,
  sessionId: app.sessionId
});

const onClickRemove = (
  cartId,
  sessionId,
  pincode,
  qty,
  configId
) => dispatcher => onDelete => e => {
  e.preventDefault();
  onDelete();
  dispatcher(cartId, sessionId, pincode, qty, configId);
};

const onClick = (
  cartId,
  skuId,
  simpleSku,
  session,
  pincode,
  qty,
  configId
) => dispatcher => e => {
  e.preventDefault();
  dispatcher(cartId, skuId, simpleSku, session, pincode, qty, configId);
};

const ProductQuantity = ({
  cartId,
  updateQuantity,
  quantity,
  simpleSku,
  skuId,
  pincode,
  sessionId,
  cartItemLoading,
  discardFromCart,
  handleCheckboxClick,
  checked,
  demoProduct,
  onDelete,
  configId
}) => (
  <Row display="block" m="0" mt="0.3125rem" mb="0">
    <Div col="6" ta="left">
      <Button
        fontSize="0.75rem"
        fontFamily="regular"
        color={Theme.colors.text}
        btnType="link"
        onClick={onClickRemove(
          cartId,
          sessionId,
          pincode,
          quantity,
          configId
        )(discardFromCart)(onDelete)}
        p="0"
        pt="1px"
      >
        <Img
          src={DeleteIcon}
          alt=""
          float="left"
          height="19px"
          mr="0.3125rem"
        />
      </Button>
      {demoProduct && (
        <Div display="inline-block" ml="15px">
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id={simpleSku}
              onClick={handleCheckboxClick}
              checked={checked}
            />
            <label htmlFor={simpleSku} />
          </div>
          <Label htmlFor="seeDemo" ml="10px">
            Select for Demo
          </Label>
        </Div>
      )}
    </Div>
    <Div col="6" ta="right">
      <Button
        type="custom"
        color="textDark"
        border="none"
        bg="white"
        bc="transparent"
        p="0"
        va="middle"
        onClick={onClick(
          cartId,
          skuId,
          simpleSku,
          sessionId,
          pincode,
          -1,
          configId
        )(updateQuantity)}
        disabled={cartItemLoading(cartId) || quantity <= 1}
      >
        <Img src={ReductIcon} alt="" float="left" height="22px" />
      </Button>
      <Label
        color="textDark"
        mb="0"
        mt="0"
        p="0 10px"
        position="relative"
        top="2px"
      >
        {quantity}
      </Label>
      <Button
        type="custom"
        color="textDark"
        border="none"
        bg="white"
        bc="transparent"
        p="0"
        va="middle"
        onClick={onClick(
          cartId,
          skuId,
          simpleSku,
          sessionId,
          pincode,
          1,
          configId
        )(updateQuantity)}
        disabled={cartItemLoading(cartId)}
      >
        <Img src={IncreaseIcon} alt="" float="left" height="22px" />
      </Button>
    </Div>
  </Row>
);

ProductQuantity.defaultProps = {
  cartItemLoading: () => {},
  demoProduct: false,
  checked: false,
  configId: ""
};

ProductQuantity.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  cartId: PropTypes.number.isRequired,
  skuId: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  cartItemLoading: PropTypes.func,
  discardFromCart: PropTypes.func.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  demoProduct: PropTypes.bool,
  checked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  configId: PropTypes.string
};

export default connect(mapStateToProps, {
  updateQuantity: updateCart,
  discardFromCart: removeFromCart
})(ProductQuantity);
