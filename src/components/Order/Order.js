import React from "react";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Text from "hometown-components/lib/Text";
import Row from "hometown-components/lib/Row";
import Heading from "hometown-components/lib/Heading";
import Image from "hometown-components/lib/Img";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatAmount } from "utils/formatters";
import moment from "moment";

const Placed = require("../../../static/order-placed.svg");

const styles = require("./Order.scss");

const mapStateToProps = ({ paymentstatus: { data, loaded, error } }) => ({
  isLoaded: loaded,
  error,
  data
});

const OrderContainer = ({
  isLoaded,
  error,
  data: {
    mrp_total,
    savings,
    shipping_address,
    cart_products,
    payment_method,
    payment_method_type,
    sub_total_amount,
    shipping_charges,
    discount_coupon_value,
    set_discount,
    net_order_amount,
    instant_discount,
    delivery_text,
    giftwrap_amount
  }
}) => {
  if (isLoaded && !error && shipping_address) {
    const order_date = moment({ order_date }).format("ddd, D MMM yyyy");
    return (
      <Div>
        <Div
          bg="#FAF4F2"
          style={{ height: "100%", width: "100%", padding: "25px 0px" }}
        >
          <Row
            bg="white"
            style={{
              width: "85%",
              height: "60px",
              border: "1px solid #F47020",
              marginLeft: "7.5%",
              borderRadius: "5px"
            }}
          >
            <Div col="6">
              <Image
                src={Placed}
                style={{
                  height: "14px",
                  width: "106px",
                  marginTop: "23px",
                  marginLeft: "10px"
                }}
              />
            </Div>
            <Div col="6">
              <Text
                mt="20px"
                ml="35px"
                style={{ color: "#999999", fontSize: "12px" }}
              >
                On {order_date}
              </Text>
            </Div>
          </Row>
        </Div>
        <Div>
          <Div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0px"
            }}
          >
            <Div>
              <Text
                ml="15%"
                style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
              >
                Details:
              </Text>
            </Div>
            <Div>
              {cart_products.length === 1 ? (
                <Text
                  ml="60%"
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold"
                  }}
                >
                  {cart_products.length} Item
                </Text>
              ) : (
                <Text
                  ml="55%"
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold"
                  }}
                >
                  {cart_products.length} Items
                </Text>
              )}
            </Div>
          </Div>
        </Div>

        <Div bg="#F2F2F2" style={{ width: "100%", height: "100%" }}>
          {cart_products.map(slide => (
            <Div
              bg="white"
              style={{
                width: "100%",
                height: "100%",
                marginTop: "10px",
                marginBottom: "10px",
                paddingBottom: "35px"
              }}
            >
              <Div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0px"
                }}
              >
                <Div>
                  <Text
                    ml="15%"
                    style={{
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold"
                    }}
                  >
                    Delivery by:
                  </Text>
                </Div>
                <Div>
                  <Text
                    ml="35%"
                    style={{
                      color: "#F47020",
                      fontSize: "16px",
                      fontWeight: "bold"
                    }}
                  >
                    {slide.delivery_text
                      .split(" ")
                      .splice(2)
                      .map(item => {
                        return " " + item;
                      })}
                  </Text>
                </Div>
              </Div>
              <Div
                bg="#FFF8F4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  width: "95%",
                  marginLeft: "2.5%"
                }}
              >
                <Div>
                  <Image
                    data-src={`${slide.image_url}?mode=fill&h=160`}
                    src={`${slide.image_url}?blur=30`}
                    style={{
                      height: "90px",
                      width: "100px",
                      marginLeft: "20px",
                      backgroundColor: "none"
                    }}
                  />
                </Div>
                <Div style={{ marginRight: "40px", padding: "10px 0px" }}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold"
                    }}
                  >
                    {slide.name}
                  </Text>
                  <Text style={{ color: "#999999", fontSize: "12px" }}>
                    By {slide.brand}
                  </Text>
                  <Row ml="0px">
                    <Div col="8">
                      <Text
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        Price:{" "}
                        <span style={{ color: "#F47020" }}>
                          ₹{formatAmount(slide.price)}
                        </span>
                      </Text>
                    </Div>
                    <Div col="4">
                      <Text
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        Qty:
                        <span style={{ color: "#F47020" }}>{slide.qty}</span>
                      </Text>
                    </Div>
                  </Row>
                </Div>
              </Div>
            </Div>
          ))}
        </Div>
        <Div>
          <Text
            ml="8%"
            style={{
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "20px"
            }}
          >
            Bill Details
          </Text>
          <div className={styles.PriceSummary_container}>
            <div className={styles.PriceSummary}>
              <div className={styles.individualPrice}>
                <div className={styles.price_label}>MRP</div>
                <div className={styles.price}>
                  ₹{mrp_total ? formatAmount(mrp_total) : null}
                </div>
              </div>
              <div className={styles.individualPrice}>
                <div className={styles.price_label}>Discount</div>
                {savings === 0 ? (
                  <div className={styles.price}>
                    ₹{savings ? formatAmount(savings) : 0}
                  </div>
                ) : (
                  <div className={styles.price}>
                    -₹{savings ? formatAmount(savings) : 0}
                  </div>
                )}
              </div>
              <div className={styles.individualPrice}>
                <div className={styles.price_label}>Delivery Fee</div>
                <div className={styles.price}>
                  ₹{shipping_charges ? formatAmount(shipping_charges) : 0}
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.individualPrice}>
                <div className={styles.price_label}>Final Price</div>

                {payment_method_type === "Wallet" ? (
                  <div className={styles.price1}>
                    ₹{sub_total_amount ? formatAmount(sub_total_amount) : 0}
                  </div>
                ) : (
                  <div className={styles.price1}>
                    ₹
                    {sub_total_amount
                      ? formatAmount(sub_total_amount + shipping_charges)
                      : 0}
                  </div>
                )}
              </div>
              <div className={styles.divider} />
              <div className={styles.individualPrice}>
                <div className={styles.price_label}>Coupon Discount</div>
                {discount_coupon_value === 0 ? (
                  <div className={styles.price} style={{ color: "#F47020" }}>
                    ₹
                    {discount_coupon_value
                      ? formatAmount(discount_coupon_value)
                      : 0}
                  </div>
                ) : (
                  <div className={styles.price} style={{ color: "#F47020" }}>
                    -₹
                    {discount_coupon_value
                      ? formatAmount(discount_coupon_value)
                      : 0}
                  </div>
                )}
              </div>
              {set_discount ? (
                <div className={styles.individualPrice}>
                  <div className={styles.price_label}>Combo Discount</div>
                  {set_discount === 0 ? (
                    <div className={styles.price} style={{ color: "#F47020" }}>
                      ₹{set_discount ? formatAmount(set_discount) : 0}
                    </div>
                  ) : (
                    <div className={styles.price} style={{ color: "#F47020" }}>
                      {/* -₹ */}
                      {set_discount ? formatAmount(set_discount) : 0}
                    </div>
                  )}
                </div>
              ) : null}
              {giftwrap_amount !== 0 ? (
                <div className={styles.individualPrice}>
                  <div className={styles.price_label}>Gift Wrap Fee</div>
                  <div className={styles.price}>
                    ₹{giftwrap_amount ? formatAmount(giftwrap_amount) : 0}
                  </div>
                </div>
              ) : null}
              <div className={styles.divider} />
              <div className={styles.individualPrice}>
                <div
                  className={styles.price_label1}
                  style={{ color: "black", fontWeight: 600 }}
                >
                  Total Price
                </div>
                <div className={styles.price1}>
                  ₹{net_order_amount ? formatAmount(net_order_amount) : 0}
                </div>
              </div>
            </div>
          </div>
        </Div>

        <Div>
          <Text
            ml="8%"
            mt="30px"
            style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
          >
            Paid by:
          </Text>
          <Div
            style={{
              width: "95%",
              height: "50px",
              backgroundColor: "#F7F7F7",
              marginLeft: "2.5%",
              borderRadius: "10px"
            }}
          >
            <Text
              ml="20px"
              mt="15px"
              style={{ color: "black", fontSize: "14px", fontWeight: "bold" }}
            >
              {payment_method_type}
            </Text>
          </Div>
        </Div>

        <Div pb="30px">
          <Text
            ml="8%"
            mt="30px"
            style={{ color: "black", fontSize: "16px", fontWeight: "bold" }}
          >
            Delivery Address
          </Text>
          <Div
            style={{
              width: "95%",
              height: "100%",
              backgroundColor: "#F7F7F7",
              marginLeft: "2.5%",
              borderRadius: "10px"
            }}
          >
            <Text
              ml="20px"
              pt="10px"
              style={{ color: "#666666", fontSize: "14px", fontWeight: "bold" }}
            >
              {`${shipping_address.first_name}${shipping_address.last_name}`}
            </Text>
            <Text ml="20px" style={{ color: "#666666", fontSize: "14px" }}>
              {shipping_address.address1}
            </Text>
            <Text ml="20px" style={{ color: "#666666", fontSize: "14px" }}>
              {shipping_address.city},{shipping_address.state}
            </Text>
            <Text
              ml="20px"
              pb="10px"
              style={{ color: "#666666", fontSize: "14px", fontWeight: "bold" }}
            >
              +91{shipping_address.phone}
            </Text>
          </Div>
        </Div>
      </Div>
    );
  }
  return null;
};

OrderContainer.defaultProps = {
  data: {
    order_date: "",
    shipping_address: {
      first_name: "",
      last_name: "",
      address1: "",
      city: "",
      postcode: "",
      state: ""
    },
    sub_total_amount: 0,
    shipping_charges: 0,
    discount_coupon_value: 0,
    set_discount: 0,
    net_order_amount: 0,
    cart_products: [],
    instant_discount: 0
  },
  isLoaded: false,
  error: ""
};

OrderContainer.propTypes = {
  data: PropTypes.shape({
    order_no: PropTypes.string.isRequired,
    order_date: PropTypes.string,
    shipping_address: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      address1: PropTypes.string,
      city: PropTypes.string,
      postcode: PropTypes.string,
      state: PropTypes.string
    }),
    cart_products: PropTypes.array,
    sub_total_amount: PropTypes.number,
    shipping_charges: PropTypes.number,
    discount_coupon_value: PropTypes.number,
    set_discount: PropTypes.number,
    net_order_amount: PropTypes.number,
    instant_discount: PropTypes.number
  }),
  isLoaded: PropTypes.bool,
  error: PropTypes.string
};

export default connect(mapStateToProps, null)(OrderContainer);
