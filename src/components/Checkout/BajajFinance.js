import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Components
 */
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';

import ResponsiveModal from 'components/Modal';

/**
 * modules / selectors / helpers
 */
import { formatAmount } from 'utils/formatters';
import { submitBflPaymentDetails, setSelectedPaymentDetails } from 'redux/modules/paymentoptions';
import { setEmiPaymentType, paymentLoaded } from 'redux/modules/app';

const bajajFinance = require('../../../static/bajaj-finance.png');

class BajajFinance extends Component {
  static propTypes = {
    submitPaymentDetails: PropTypes.func.isRequired,
    setPaymentDetails: PropTypes.func.isRequired,
    session: PropTypes.string,
    selectedGateway: PropTypes.string,
    emiType: PropTypes.func.isRequired,
    paymentLoaded: PropTypes.func.isRequired,
    details: PropTypes.string,
    bflMinAmount: PropTypes.number.isRequired
  };

  static defaultProps = {
    session: '',
    details: '',
    selectedGateway: 'EmiZero'
  };
  constructor(props) {
    super(props);
    this.state = {
      countDown: 5,
      countDownId: '',
      bflModal: false
    };
  }

  openBflModal = () => {
    const {
      submitPaymentDetails,
      session,
      selectedGateway,
      emiType,
      paymentLoaded: paymentload,
      setPaymentDetails
    } = this.props;

    setPaymentDetails({
      gateway: 'EmiZero',
      data: { emiCode: 'BFL', emiBank: 'bfl', cardType: 'credit' }
    });

    const countDownId = setInterval(() => {
      let { countDown } = this.state;
      countDown -= 1;

      if (countDown === 0) {
        this.closeBflModal();
        emiType('bfl');
        paymentload(false);
        submitPaymentDetails(session, selectedGateway);
        window.clearInterval(countDownId);
      } else {
        this.setState({ countDown });
      }
    }, 1000);
    this.setState({ countDownId, bflModal: true });
  };

  closeBflModal = () => {
    const { countDownId } = this.state;
    const { setPaymentDetails } = this.props;
    window.clearInterval(countDownId);
    this.setState({ bflModal: false, countDown: 5, countDownId: '' });
    setPaymentDetails({
      gateway: 'EmiZero',
      data: { emiCode: '', emiBank: '', cardType: '' }
    });
  };

  render() {
    const { countDown, bflModal } = this.state;
    const {
      details: { emiCode },
      bflMinAmount
    } = this.props;
    return (
      <Div col="12" pr="1rem" style={{ borderBottom: '2px solid #97979733' }}>
        <Div pb={20}>
          <Label color="textLight" pl="15px">
            Available for Bajaj EMI Card Holders for order value &gt; Rs {formatAmount(bflMinAmount)}
          </Label>
        </Div>
        <Div>
          <Row ml="0" mr="0" pt="1rem" flexWrap="nowrap" alignItems="center" onClick={this.openBflModal}>
            <Row ml="0" mb="10px" alignItems="center">
              <input type="radio" name="bankOptions" id="bankOptionsBfl" checked={emiCode === 'BFL'} />
              <Label for="bankOptionsBfl" bg="white" ml="10px">
                <img
                  height={30}
                  // eslint-disable-next-line max-len
                  src={bajajFinance}
                  alt="Bajaj Finserv"
                  maxHeight={24}
                  sx={{ flexShrink: 0 }}
                />
              </Label>
            </Row>
          </Row>
        </Div>

        <ResponsiveModal classNames={{ modal: 'bflModal' }} open={bflModal} onCloseModal={this.closeBflModal}>
          <Div py={32} px={32} my={10} m="20px 10px">
            <Div>
              <Label pt={10}>Redirecting you to Bajaj Finance Payment Gateway</Label>
            </Div>
            <Div style={{ display: 'flex', justifyContent: 'center' }}>
              <Label pt={10} textAlign="center">
                {countDown}
              </Label>
            </Div>
          </Div>
        </ResponsiveModal>
      </Div>
    );
  }
}

const mapStateToProps = ({ app, paymentoptions }) => ({
  session: app.sessionId,
  selectedGateway: paymentoptions.selectedGateway,
  details: paymentoptions.paymentMethodDetails.EmiZero
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitPaymentDetails: submitBflPaymentDetails,
      setPaymentDetails: setSelectedPaymentDetails,
      emiType: setEmiPaymentType,
      paymentLoaded
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BajajFinance);
