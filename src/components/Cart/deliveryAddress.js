import React from 'react';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Row from 'hometown-components/lib/Row';
import { connect } from 'react-redux';
import CartPincode from './cartPincode';

const styles = require('./Cart.scss');

const mapStateToProps = ({ pincode }) => ({
  pincode: pincode.selectedPincode
});

class DeliveryAddress extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    takePincode: false
  };
  render() {
    const { pincode } = this.props;
    return (
      <Row className={styles.pincodeCheck} type="block" m="0" mb="0" mt="0">
        {this.state.takePincode ? (
          <Div col="12" pr="0" pl="0" className={styles.address_wrapper}>
            <CartPincode />
          </Div>
        ) : (
          <Div col="12" pr="0" pl="0" pt="10px" pb="10px" className={styles.address_wrapper}>
            <div className={styles.address_container}>
              <div className={styles.filtered_address} style={{ marginTop: '5px' }}>
                Deliver To: {pincode}
              </div>
            </div>
            <Button fontSize="0.75rem" color="#F47020" btnType="link" p="0" pl="5px">
              <div
                onClick={() => {
                  this.setState({ takePincode: true });
                }}
              >
                Change
              </div>
            </Button>
          </Div>
        )}
      </Row>
    );
  }
}

export default connect(mapStateToProps)(DeliveryAddress);
