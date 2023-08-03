/* eslint-disable no-mixed-operators */
/* eslint-disable radix */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
import Span from "hometown-components/lib/Span";
import Button from "hometown-components/lib/Buttons";
import Heading from "hometown-components/lib/Heading";
import ResponsiveModal from "components/Modal";
import { formatAmount } from "utils/formatters";

const styles = require("./EmiModal.scss");

const bajajFinance = require("../../../static/bajaj-finance.png");

const schemes = [
  {
    schemeName: "9 by 0",
    emiTenure: 9,
    processingFee: 0,
    interest: 0,
    grossTenure: 9
  },
  {
    schemeName: "6 by 0",
    emiTenure: 6,
    processingFee: 0,
    interest: 0,
    grossTenure: 6
  },
  {
    schemeName: "3 by 0",
    emiTenure: 3,
    processingFee: 0,
    interest: 0,
    grossTenure: 3
  }
];

// Computed as (CSP of the product * (1 +(X% / 12 * EMI Tenure)) / EMI Tenure)
// B16*(1+B20/12*B21)/B21

const formatPrice = price => {
  let newPrice = 0;
  if (price.length > 3 && price !== null) {
    newPrice = Number(price.replace(",", ""));
    return newPrice;
  }
  return Number(price);
};

const calculateEMI = (price, interest, emiTenure) =>
  parseInt((price * (1 + (interest / 12) * emiTenure)) / emiTenure);

// eslint-disable-next-line max-len
const advancePayment = (specialPrice, interest, emiTenure, grossTenure) =>
  calculateEMI(specialPrice, interest, emiTenure) * (grossTenure - emiTenure);

export default class Emi extends Component {
  state = {
    open: false,
    isNoCost: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleCheckClick = value => {
    this.setState({ isNoCost: value });
  };

  render() {
    const { price, specialPrice, bflMinAmount } = this.props;
    let { data } = this.props;
    // data =
    //   data.emi && data.emi.sort((a, b) => Number(a.bank_code) - Number(b.bank_code));
    return (
      <Span>
        <Button
          p="0"
          btnType="link"
          fontSize="10px"
          mt="0"
          textAlign="center"
          onClick={this.onOpenModal}
          mt="0"
        >
          Know More
        </Button>
        <ResponsiveModal
          classNames={{
            modal: styles.emiModal,
            overlay: styles.emiOverlayModal
          }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <div className={styles.emiModalWrapper}>
            {/* <Row mr="1rem" ml="1rem">
              <Div col="11" ta="center">
                <Heading
                  fontSize="1rem"
                  lh="1.4"
                  color="text"
                  mt="0.9375em"
                  mb="0.3125em"
                  fontFamily="700"
                  ta="left"
                >
                  Bajaj Finance For Rs.
                  {price} <br />
                  <Span fontSize="0.875rem">
                    Available for Bajaj EMI Card Customers. <br />
                    Minimum Cart Value is Rs. {bflMinAmount}
                  </Span>{" "}
                  <br />
                  <Span fontSize="0.875rem">(Including shipping charge)</Span>
                </Heading>
              </Div>
            </Row>
            <Row mr="1rem" ml="1rem" pl="0" pr="0">
              <Div
                col="12"
                pt="0.3125rem"
                pb="0.625rem"
                className={styles.tableWrapper}
              >
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th />
                      <th>
                        <div>Scheme Name</div>
                      </th>
                      <th>
                        <div>EMI Tenure</div>
                      </th>
                      <th>
                        <div>Processing Fee</div>
                      </th>
                      <th>
                        <div>% Interest</div>
                      </th>
                      <th>
                        <div>Advance EMI</div>
                      </th>
                      <th>
                        <div>Downpayment</div>
                      </th>
                      <th>
                        <div>EMI</div>
                      </th>
                    </tr>

                    {schemes.map(arr => {
                      const {
                        schemeName,
                        emiTenure,
                        processingFee,
                        interest,
                        grossTenure
                      } = arr;

                      return (
                        <tr className={styles.coloumn}>
                          <td>
                            <div className={styles.bflImgWrapper}>
                              <img src={bajajFinance} alt="baja-finance" />
                            </div>
                          </td>
                          <td>{schemeName}</td>
                          <td>{emiTenure} Months</td>
                          <td>Rs. {processingFee}</td>
                          <td>{interest}%</td>
                          <td>
                            Rs.{" "}
                            {advancePayment(
                              specialPrice,
                              interest,
                              emiTenure,
                              grossTenure
                            )}
                          </td>
                          <td>
                            Rs.{" "}
                            {processingFee +
                              advancePayment(
                                specialPrice,
                                interest,
                                emiTenure,
                                grossTenure
                              )}
                          </td>
                          <td>
                            Rs.{" "}
                            {calculateEMI(specialPrice, interest, emiTenure)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Div>
            </Row> */}
            <Row mr="1rem" ml="1rem">
              <Div col="11" ta="center">
                <Heading
                  fontSize="1rem"
                  lh="1.4"
                  color="text"
                  mt="0.9375em"
                  mb="0.3125em"
                  fontFamily="700"
                  ta="left"
                >
                  EMI Options For Rs.
                  {price} <br />
                  <Span fontSize="0.875rem">(Including shipping charge)</Span>
                </Heading>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px",
                    color: "rgba(51,51,51,0.85)"
                  }}
                >
                  {formatPrice(price) < 10000 ? null : (
                    <React.Fragment>
                      <div onClick={() => this.handleCheckClick(false)}>
                        <input
                          type="radio"
                          id="Cost_emi_radio"
                          name="Cost_emi_radio"
                          checked={!this.state.isNoCost}
                        />
                        <label
                          for="Cost_emi_radio"
                          style={{ marginLeft: "3px" }}
                        >
                          Emi
                        </label>
                      </div>
                      {Array.isArray(data.noCostEmi) &&
                      data.noCostEmi.length ? (
                        <div onClick={() => this.handleCheckClick(true)}>
                          <input
                            type="radio"
                            id="noCost_emi_radio"
                            name="noCost_emi_radio"
                            checked={this.state.isNoCost}
                          />
                          <label
                            for="noCost_emi_radio"
                            style={{ marginLeft: "3px" }}
                          >
                            No Cost Emi
                          </label>
                        </div>
                      ) : null}
                    </React.Fragment>
                  )}
                </div>
              </Div>
            </Row>
            <Row mr="1rem" ml="1rem" pl="0" pr="0">
              <Div
                col="12"
                pt="0.3125rem"
                pb="0.625rem"
                className={styles.tableWrapper}
              >
                <table cellSpacing="0" cellPadding="5">
                  <tbody>
                    <tr className={styles.tableHead}>
                      <th>
                        <div />
                      </th>
                      <th>
                        <div>Minimum Amt.</div>
                      </th>
                      <th>
                        <div>3 Months</div>
                      </th>
                      <th>
                        <div>6 Months</div>
                      </th>
                      <th>
                        <div>9 Months</div>
                      </th>
                      <th>
                        <div>12 Months</div>
                      </th>
                      <th>
                        <div>18 Months</div>
                      </th>
                      <th>
                        <div>24 Months</div>
                      </th>
                      <th>
                        <div>36 Months</div>
                      </th>
                    </tr>
                    {/* eslint-disable */}
                    {!this.state.isNoCost ? (
                      <React.Fragment>
                        {Array.isArray(data.emi) &&
                          data.emi.length &&
                          data.emi.map((bank, index) => (
                            <tr key={String(index)} className={styles.coloumn}>
                              <td>
                                <div className={styles.bankImgWrapper}>
                                  <img
                                    src={bank.bank_logo_url}
                                    alt={bank.gateway_type}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className={styles.bankImgWrapper}>
                                  INR {bank.min_order_amt}
                                </div>
                              </td>
                              {bank.slabs.map((slab, index) => {
                                const values = Object.values(slab.slab_keys);
                                return (
                                  <td className="" key={String(index)}>
                                    <div>
                                      {values[3] && (
                                        <p>Rs.{formatAmount(values[3])} p.m.</p>
                                      )}
                                      {values[3] && (
                                        <p>Interest Rate {values[0]}%</p>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {Array.isArray(data.noCostEmi) &&
                          data.noCostEmi.length &&
                          data.noCostEmi.map((bank, index) => (
                            <tr key={String(index)} className={styles.coloumn}>
                              <td>
                                <div className={styles.bankImgWrapper}>
                                  <img
                                    src={bank.bank_logo_url}
                                    alt={bank.gateway_type}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className={styles.bankImgWrapper}>
                                  INR {bank.min_order_amt}
                                </div>
                              </td>
                              {bank.slabs.map((slab, index) => {
                                const values = Object.values(slab.slab_keys);
                                return (
                                  <td className="" key={String(index)}>
                                    <div>
                                      {values[3] && (
                                        <p>Rs.{formatAmount(values[3])} p.m.</p>
                                      )}
                                      {values[3] && (
                                        <p>Interest Rate {values[0]}%</p>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                      </React.Fragment>
                    )}
                  </tbody>
                </table>
              </Div>
            </Row>
          </div>
        </ResponsiveModal>
      </Span>
    );
  }
}

Emi.defaultProps = {
  data: [],
  price: "",
  specialPrice: ""
};

Emi.propTypes = {
  data: PropTypes.array,
  price: PropTypes.string,
  specialPrice: PropTypes.string,
  bflMinAmount: PropTypes.number.isRequired
};
