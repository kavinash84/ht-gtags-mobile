import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Img from 'hometown-components/lib/Img';
import { setCardType } from 'redux/modules/paymentoptions';

const styles = require('./Checkout.scss');

const aeIcon = require('../../../static/american-express.svg');
const dcIcon = require('../../../static/diners-club.svg');
const discoverIcon = require('../../../static/discover.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const YEARS = [...Array(21)];

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const onGetCardType = (dispatcher, sessionId, gateway) => e => {
  const { value } = e.target;
  dispatcher(value, sessionId, gateway);
};

const mapDispatchToProps = dispatch => bindActionCreators({ getCardType: setCardType }, dispatch);

const mapStateToProps = ({ paymentoptions, app }) => ({
  details: paymentoptions.paymentMethodDetails[paymentoptions.selectedGateway],
  sessionId: app.sessionId,
  cardType: paymentoptions.cardType,
  selectedGateway: paymentoptions.selectedGateway
});

const CardForm = ({
  gateway,
  setPaymentDetails,
  details: {
    nameOnCard, cardNumber, cvv, expMonth, expYear
  },
  getCardType,
  cardType,
  sessionId
}) => (
  <Div>
  <Div col="12" className={styles.cardFieldWrapper}>
      <FormInput
        label=""
        type="number"
        placeholder="Card number"
        name="cardNumber"
        value={cardNumber}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        onBlur={onGetCardType(getCardType, sessionId, gateway)}
        style={{height:'45px', border: '1px solid #E3E3E3', borderRadius: '5px'}}
      />
      {cardType === 'visa' && <Img src={visaIcon} alt="visaCard" />}
      {cardType === 'mast' && <Img src={mastercardIcon} alt="Master Card" />}
      {cardType === 'maestro' && <Img src={maestroIcon} alt="Maestro" />}
      {cardType === 'amex' && <Img src={aeIcon} alt="maestroCard" />}
      {cardType === 'discover' && <Img src={discoverIcon} alt="discoverCard" />}
      {cardType === 'diners' && <Img src={dcIcon} alt="amexCard" />}
    </Div>
    <Div mt="5px" col="12">
      <FormInput
        label=""
        type="text"
        placeholder="Name on card"
        value={nameOnCard}
        name="nameOnCard"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        style={{height:'45px', border: '1px solid #E3E3E3', borderRadius: '5px'}}
      />
    </Div>
    <Row  pl="1rem" pr="1rem">
    <Div col="12" mt="5px" style={{display: 'flex',justifyContent: 'space-between'}}  className={styles.cardFieldWrapper}>
      <select
        className={styles.dropDown}
        name="expMonth"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        value={expMonth}
      >
        <option key="month" value="">
          MM
        </option>
        {MONTHS.map(month => (
          <option key={month}>{month}</option>
        ))}
        <div className={styles.arrow}>deded</div>
      </select>
      <select
        className={styles.dropDown}
        name="expYear"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        value={expYear}
      >
        <option key="year" value="">
          YYYY
        </option>
        {YEARS.map((v, i) => (
          <option key={String(i)}>{new Date().getFullYear() + i}</option>
        ))}
        <div className={styles.arrow}>deded</div>
      </select>
      {/* <Div mt="5px" col="4"> */}
      <FormInput
        label=""
        type="password"
        placeholder="CVV"
        name="cvv"
        value={cvv}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        style={{height:'45px', border: '1px solid #E3E3E3', borderRadius: '5px'}}
      />
    {/* </Div> */}
    </Div>
    
    </Row>
  </Div>
);

CardForm.defaultProps = {
  cardType: 'visa',
  sessionId: ''
};

CardForm.propTypes = {
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  getCardType: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  cardType: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);
