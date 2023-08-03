import React from "react";
import Div from "hometown-components/lib/Div";
import { Label } from "hometown-components/lib/Label";
import { connect } from "react-redux";
import { getEmiBanks } from "selectors/payments";
import { formatAmount } from "utils/formatters";
import PropTypes from "prop-types";
import BankCard from "./BankCard";
import DebitBankCard from "./DebitBankCard";
import { BASE_IMAGE_URL } from "helpers/Constants";
import CardForm from "./CardForm";

const styles = require("./Checkout.scss");

const mapStateToProps = ({ paymentoptions }) => ({
  selectedGateway: paymentoptions.selectedGateway,
  noCostDebit: paymentoptions.data.paymentData.noCostEmiDetails.debit,
  noCostCredit: paymentoptions.data.paymentData.noCostEmiDetails.credit,
  details: paymentoptions.paymentMethodDetails.EmiZero,
  isCreditSelected: paymentoptions.isCreditSelected
});

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const EmiZero = ({
  selectedGateway,
  setPaymentDetails,
  noCostDebit,
  noCostCredit,
  details,
  currentSelection,
  isCreditSelected
}) => {
  const noCostDebitNames = Object.keys(noCostDebit);
  const noCostcreditNames = Object.keys(noCostCredit);
  const currentBank = details.emiBank;
  return (
    <Div col="12" mt="0">
      <Div className={styles.paymentBlock}>
        {/* Debit Cards */}

        {Array.isArray(noCostDebitNames) ? (
          noCostDebitNames.length ? (
            <Div col="12" mb="1rem">
              <Label for="bankOptions1" pl="1rem" color="textLight">
                Choose From Preferred Bank (Available On Debit Cards)
              </Label>
            </Div>
          ) : null
        ) : null}

        {noCostDebitNames.map(bank => (
          <DebitBankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name={bank}
            img={
              [
                "citibank",
                "AMEX",
                "IndusInd",
                "Bob",
                "Yes",
                "federal"
              ].includes(bank)
              ? `${BASE_IMAGE_URL}/media/cms/Bank/${bank}.jpeg`
              : `${BASE_IMAGE_URL}/media/cms/BankLOGO/${bank}.gif`
            }
            currentSelection={currentSelection}
            key={bank}
          />
        ))}
        {!isCreditSelected ? (
          <React.Fragment>
            {noCostDebit[currentBank] && (
              <Div>
                <Div col="12" mb="0" mt="1rem" className={styles.overflowAuto}>
                  <table
                    border="1"
                    className={`table table-border ${styles.emiTable}`}
                  >
                    <tbody>
                      <tr>
                        <th />
                        <th width="100px">Tenure</th>
                        <th>Annual Interest Rate</th>
                        {/* <th>EMI Interest</th> */}
                        <th>Total Cost</th>
                        <th>Monthly Instalments</th>
                      </tr>

                      {noCostDebit[currentBank] &&
                        noCostDebit[currentBank].emiOptions &&
                        Object.values(noCostDebit[currentBank].emiOptions).map(
                          (item, index) => (
                            <tr key={String(index)}>
                              <td align="center">
                                <input
                                  type="radio"
                                  onChange={onChangeDetails(
                                    setPaymentDetails,
                                    selectedGateway
                                  )}
                                  name="emiCode"
                                  value={item.emiCode}
                                />
                              </td>
                              <td width="100px">{item.value} Months</td>
                              <td>{item.interestRate}%</td>
                              {/* <td>
                                Rs.
                                {formatAmount(Math.round(item.emiInterest))}
                              </td> */}
                              <td>
                                Rs.
                                {formatAmount(Math.round(item.totalAmount))}
                              </td>
                              <td>
                                Rs.
                                {formatAmount(Math.round(item.EMI))}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </Div>
                <Div col="12" mb="1rem" mt="1rem">
                  <CardForm
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                  />
                </Div>
              </Div>
            )}
          </React.Fragment>
        ) : null}

        {/* Credit Cards */}

        {Array.isArray(noCostcreditNames) ? (
          noCostcreditNames.length ? (
            <Div col="12" mb="1rem" mt="40px">
              <Label for="bankOptions1" pl="1rem" color="textLight">
                Choose From Preferred Bank (Available On Credit Cards)
              </Label>
            </Div>
          ) : null
        ) : null}

        {noCostcreditNames.map(bank => (
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name={bank}
            img={
              [
                "citibank",
                "AMEX",
                "IndusInd",
                "Bob",
                "Yes",
                "federal"
              ].includes(bank)
              ? `${BASE_IMAGE_URL}/media/cms/Bank/${bank}.jpeg`
              : `${BASE_IMAGE_URL}/media/cms/BankLOGO/${bank}.gif`
            }
            currentSelection={currentSelection}
            key={bank}
          />
        ))}
        {isCreditSelected ? (
          <React.Fragment>
            {noCostCredit[currentBank] && (
              <Div>
                <Div col="12" mb="0" mt="1rem" className={styles.overflowAuto}>
                  <table
                    border="1"
                    className={`table table-border ${styles.emiTable}`}
                  >
                    <tbody>
                      <tr>
                        <th />
                        <th width="100px">Tenure</th>
                        <th>Annual Interest Rate</th>
                        {/* <th>EMI Interest</th> */}
                        <th>Total Cost</th>
                        <th>Monthly Instalments</th>
                      </tr>

                      {noCostCredit[currentBank] &&
                        noCostCredit[currentBank].emiOptions &&
                        Object.values(noCostCredit[currentBank].emiOptions).map(
                          (item, index) => (
                            <tr key={String(index)}>
                              <td align="center">
                                <input
                                  type="radio"
                                  onChange={onChangeDetails(
                                    setPaymentDetails,
                                    selectedGateway
                                  )}
                                  name="emiCode"
                                  value={item.emiCode}
                                />
                              </td>
                              <td width="100px">{item.value} Months</td>
                              <td>{item.interestRate}%</td>
                              {/* <td>
                                Rs.
                                {formatAmount(Math.round(item.emiInterest))}
                              </td> */}
                              <td>
                                Rs.
                                {formatAmount(Math.round(item.totalAmount))}
                              </td>
                              <td>
                                Rs.
                                {formatAmount(Math.round(item.EMI))}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </Div>
                <Div col="12" mb="1rem" mt="1rem">
                  <CardForm
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                  />
                </Div>
              </Div>
            )}
          </React.Fragment>
        ) : null}
      </Div>
    </Div>
  );
};

export default connect(mapStateToProps, null)(EmiZero);

EmiZero.propTypes = {
  selectedGateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  emiBankDetails: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired,
  currentSelection: PropTypes.string.isRequired
};
