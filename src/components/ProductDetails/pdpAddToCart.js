import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AddCart from "hometown-components/lib/Icons/AddCart";
import GotoCart from "hometown-components/lib/Icons/GotoCart";
import Button from "hometown-components/lib/Buttons";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
import Img from "hometown-components/lib/Img";
import Span from "hometown-components/lib/Span";
import * as actionCreators from "redux/modules/cart";
import { getCartListSKU } from "selectors/cart";
import { PINCODE, CART_URL } from "helpers/Constants";

const checkSKUInCart = (list, sku) => list.includes(sku);
const styles = require("./pdpAddToCart.scss");
const LoaderIcon = require("../../../static/refresh.svg");

const onClick = (
  key,
  skuId,
  simpleSku,
  session,
  pincode,
  configId,
  quantity
) => dispatcher => e => {
  e.preventDefault();
  dispatcher(key, skuId, simpleSku, session, pincode, configId, quantity);
};

const mapStateToProps = ({
  app,
  pincode,
  cart,
  cart: { addingToCart, addedToCart, key }
}) => ({
  session: app.sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  addedToCart,
  stateId: key,
  cartSKUs: getCartListSKU(cart)
});

const AddToCart = ({
  session,
  simpleSku,
  sku,
  addToCart,
  pincode,
  cartSKUs,
  addingToCart,
  itemId,
  stateId,
  size,
  isSoldOut,
  height,
  btnColor,
  btnType,
  ta,
  configId,
  quantity
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const addLoading = addingToCart && stateId === itemId;

  return (
    <Row ml="0" mr="0" p="1rem" style={{ width: "50%" }}>
      <Div ta={ta}>
        {isSoldOut ? (
          <Div>
            <Button
              btnType="custom"
              border="1px solid"
              bc="white"
              color="red"
              p="1px 4px"
              size={size}
              height={height}
              lh="1.5"
            >
              <Span
                fontSize="12px"
                fontFamily="regular"
                color="red"
                va="text-top"
              >
                Out of Stock
              </Span>
            </Button>
          </Div>
        ) : (
          <Row ml="0" mr="0">
            {!checkStatus ? (
              <Div>
                <Button
                  btnType={btnType}
                  border="1px solid"
                  bc={btnColor === "transparent" ? "#f98d29" : btnColor}
                  color={btnColor === "transparent" ? "#f98d29" : "#FFF"}
                  bg={btnColor === "transparent" ? "transparent" : btnColor}
                  size={size}
                  height={height}
                  className={styles.addToCartBtn}
                  p="1px 4px"
                  lh="1.5"
                  disabled={addLoading}
                  onClick={onClick(
                    itemId,
                    sku,
                    simpleSku,
                    session,
                    pincode,
                    configId,
                    quantity
                  )(addToCart)}
                >
                  {/* {!addLoading && (
                    <AddCart
                      width="18px"
                      height="18px"
                      va="middle"
                      fill={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
                    />
                  )} */}
                  {/* {addLoading && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />} */}
                  <Span
                    ml="2px"
                    fontSize="0.75rem"
                    fontFamily="regular"
                    color={btnColor === "transparent" ? "#f98d29" : "#FFF"}
                    va="middle"
                    lh="1.8"
                  >
                    {addLoading ? "Adding.." : "Add to Cart"}
                  </Span>
                </Button>
              </Div>
            ) : (
              <Div>
                <Link
                  className={`${styles.goToCart} ${height !== "auto" &&
                    styles.heightFix} `}
                  to={CART_URL}
                >
                  <GotoCart va="sub" width="18px" height="18px" fill="#FFF" />
                  <Span
                    ml="0.625rem"
                    fontSize="12px"
                    fontFamily="regular"
                    color="#FFF"
                    va="text-bottom"
                    lh="1.5"
                  >
                    Go to Cart
                  </Span>
                </Link>
              </Div>
            )}
          </Row>
        )}
      </Div>
    </Row>
  );
};

AddToCart.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: "",
  stateId: "",
  session: "",
  size: "default",
  height: "auto",
  btnColor: "#f98d29",
  btnType: "custom",
  ta: "center",
  configId: "",
  quantity: 1
};

AddToCart.propTypes = {
  simpleSku: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array,
  sku: PropTypes.string.isRequired,
  session: PropTypes.string,
  pincode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  addingToCart: PropTypes.bool,
  itemId: PropTypes.string,
  stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  height: PropTypes.string,
  btnColor: PropTypes.string,
  btnType: PropTypes.string,
  ta: PropTypes.string,
  isSoldOut: PropTypes.bool.isRequired,
  configId: PropTypes.string,
  quantity: PropTypes.number
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
