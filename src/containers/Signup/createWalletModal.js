import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResponsiveModal from 'components/Modal';

// Components
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import OtpGenerator from './otpGenerator';

class CreateWalletModal extends Component {
  state = {
    sendOtp: false
  };
  render() {
    const { sendOtp } = this.state;
    const { showModal, handleModal, handleNo, handleYes, mobile } = this.props;

    return (
      <ResponsiveModal
        classNames={{
          overlay: 'futurePayModalModal',
          modal: 'futurePayModal'
        }}
        onCloseModal={() => {
          handleModal();
          this.setState({ sendOtp: false });
        }}
        open={showModal}
      >
        <div>
          <Row display="block" mr="0" ml="0" mb="10px" p="10px">
            <div col="12" ta="center">
              <Heading
                color="color676767"
                mt="0"
                mb="0"
                fontWeight="400"
                fontSize="26px"
                ta="center"
                fontFamily="light"
                p="5px"
              >
                HomeTown Wallet
              </Heading>
              <Text color="color676767" ta="center">
                'Would you like to create a wallet?'
              </Text>
              {sendOtp ? (
                <Div>
                  <OtpGenerator mobile={mobile} handleSubmit={handleYes} />
                </Div>
              ) : (
                <Div style={{ display: 'flex' }}>
                  <button
                    style={{ margin: '0 10px' }}
                    className="google-login-btn"
                    onClick={() => this.setState({ sendOtp: true })}
                  >
                    Yes
                  </button>
                  <button style={{ margin: '0 10px' }} className="google-login-btn" onClick={() => handleNo()}>
                    No
                  </button>
                </Div>
              )}
            </div>
          </Row>
        </div>
      </ResponsiveModal>
    );
  }
}

CreateWalletModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
  handleYes: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired
};

export default CreateWalletModal;
