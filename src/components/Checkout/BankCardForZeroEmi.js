import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';

const changeDetails = (dispatcher, gateway, name, detailkey, emiCode, type) => () => {
  dispatcher({ gateway, data: { [detailkey]: name, emiCode, cardType: type } });
};

const BankCard = ({
  name, img, setPaymentDetails, gateway, detailkey, details: { emiCode }
}) => (
  <Div col="12" pr="1rem">
    <Div>
      <img src={img} alt={name} />
    </Div>
    <Div>
      <Row ml="0" mr="0" pt="1rem" flexWrap="nowrap" alignItems="center">
        <Row
          ml="0"
          mr="30px"
          alignItems="center"
          type="flexEqual"
          onClick={changeDetails(setPaymentDetails, gateway, name, detailkey, 'EMI3', 'credit')}
        >
          <input type="radio" name="bankOptions" id={`bankOptions${name}`} checked={emiCode === 'EMI3'} />
          <Label for={`bankOptions${name}`} bg="#FFF" pl="15px">
            HDFC Credit
          </Label>
        </Row>
        <Row
          ml="0"
          mr="30px"
          alignItems="center"
          onClick={changeDetails(setPaymentDetails, gateway, name, detailkey, 'HDFCD03', 'debit')}
        >
          <input type="radio" name="bankOptions" id={`bankOptions${name}`} checked={emiCode === 'HDFCD03'} />
          <Label for={`bankOptions${name}`} bg="#FFF" pl="15px">
            HDFC Debit
          </Label>
        </Row>
      </Row>
    </Div>
  </Div>
);

BankCard.defaultProps = {
  img: '',
  name: ''
  // currentSelection: ''
};

BankCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  detailkey: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired
  // currentSelection: PropTypes.string
};

export default BankCard;
