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
  emiBankDetails: getEmiBanks(paymentoptions),
  emiDebitCardDetails: paymentoptions.data.paymentData.emiDebitCardDetails,
  details: paymentoptions.paymentMethodDetails.Emi,
  isCreditSelected: paymentoptions.isCreditSelected
});

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const EMI = ({
  selectedGateway,
  setPaymentDetails,
  emiBankDetails,
  emiDebitCardDetails,
  details,
  currentSelection,
  isCreditSelected
}) => {
  const currentBankDetails = emiBankDetails.filter(
    item => item.bank === details.emiBank
  )[0];
  const currentDebitBankDetails = Object.keys(emiDebitCardDetails);
  const currentBank = details.emiBank;
  // const currentDebitCardDetailsIndex = Object.keys(emiDebitCardDetails).;
  return (
    <Div col="12" mt="0">
      <Div className={styles.paymentBlock}>
        <Div col="12" mb="1rem">
          <Label for="bankOptions1" pl="1rem" color="textLight">
            Choose From Preferred Bank (Available On Credit Cards)
          </Label>
        </Div>

        {emiBankDetails.map(bank => (
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name={bank.bank}
            img={
              [
                "citibank",
                "AMEX",
                "IndusInd",
                "Bob",
                "Yes",
                "federal"
              ].includes(bank.bank)
              ? `${BASE_IMAGE_URL}/media/cms/Bank/${bank.bank}.jpeg`
              : `${BASE_IMAGE_URL}/media/cms/BankLOGO/${bank.bank}.gif`
            }
            currentSelection={currentSelection}
            key={bank.bank}
          />
        ))}

        {currentBankDetails && isCreditSelected && (
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
                    <th>EMI Interest</th>
                    <th>Total Cost</th>
                    <th>Monthly Instalments</th>
                  </tr>

                  {currentBankDetails &&
                    currentBankDetails.values &&
                    currentBankDetails.values.map((item, index) => (
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
                        <td>
                          Rs.
                          {formatAmount(Math.round(item.emiInterest))}
                        </td>
                        <td>
                          Rs.
                          {formatAmount(Math.round(item.totalAmount))}
                        </td>
                        <td>
                          Rs.
                          {formatAmount(Math.round(item.EMI))}
                        </td>
                      </tr>
                    ))}
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

        {Array.isArray(currentDebitBankDetails) ? (
          currentDebitBankDetails.length ? (
            <Div col="12" mb="1rem" mt="60px">
              <Label for="bankOptions1" pl="1rem" color="textLight">
                Choose From Preferred Bank (Available On Debit Cards)
              </Label>
            </Div>
          ) : null
        ) : null}

        {currentDebitBankDetails.map(bank => (
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
            {emiDebitCardDetails[currentBank] && (
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
                        <th>EMI Interest</th>
                        <th>Total Cost</th>
                        <th>Monthly Instalments</th>
                      </tr>

                      {emiDebitCardDetails[currentBank] &&
                        emiDebitCardDetails[currentBank].emiOptions &&
                        Object.values(
                          emiDebitCardDetails[currentBank].emiOptions
                        ).map((item, index) => (
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
                            <td>
                              Rs.
                              {formatAmount(Math.round(item.emiInterest))}
                            </td>
                            <td>
                              Rs.
                              {formatAmount(Math.round(item.totalAmount))}
                            </td>
                            <td>
                              Rs.
                              {formatAmount(Math.round(item.EMI))}
                            </td>
                          </tr>
                        ))}
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

export default connect(mapStateToProps, null)(EMI);

EMI.propTypes = {
  selectedGateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  emiBankDetails: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired,
  currentSelection: PropTypes.string.isRequired
};
