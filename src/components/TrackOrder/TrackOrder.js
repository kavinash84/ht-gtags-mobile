import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
// import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Button from 'hometown-components/lib/Buttons';
// import Theme from 'hometown-components/lib/Theme';
// import Heading from 'hometown-components/lib/Heading';
// import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import Img from 'hometown-components/lib/Img';
// import Text from 'hometown-components/lib/Text';
import { connect } from 'react-redux';
// import { formatDate } from 'utils/formatters';
import ResponsiveModal from 'components/Modal';
import TackingTimeline from '../MyOrder/TrackingTimeline';

const LoaderIcon = require('../../../static/refresh-white.svg');

// const calendarImage = require('../../../static/calendar.svg');
// const assemblyIcon = require('../../../static/cube-of-notes-stack.svg');

// const styles = require('./TrackOrder.scss');

const mapStateToProps = ({ trackorder }) => ({
  ...trackorder
});

class TrackOrder extends Component {
  render() {
    const {
      // status,
      handleSubmit,
      handleChange,
      loading,
      loaded,
      data,
      closeStatusModal,
      onChange,
      // error,
      // errorMessage,
      orderId
    } = this.props;
    const orders = data.order_items || [];
    const error = data.error || '';
    return (
      <Section display="block" p="0" pb="1rem" mb="0" height="auto">
        <TitleBar title="Track Order" />
        <Container type="container" pr="0.5rem" pl="0.5rem">
          <Div type="block" pt="1rem" pb="1rem" p="1rem 1rem">
            <Row display="block" mr="0" ml="0">
              <form onSubmit={handleSubmit}>
                <Div col="12">
                  <FormInput
                    size="default"
                    label="Order Number"
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    value={orderId}
                    required
                  />
                </Div>
                <Div col="6" pt="0.3175rem" pl="0">
                  {loading ? (
                    <Button btnType="primary" fontFamily="regular" height="38px" mt="1rem" type="submit">
                      <span>
                        PLEASE WAIT
                        <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                      </span>
                    </Button>
                  ) : (
                      <Button btnType="primary" fontFamily="regular" height="38px" mt="1rem" type="submit">
                        CONFIRM
                      </Button>
                    )}
                </Div>
              </form>
            </Row>
            {orders.length ? (
              <ResponsiveModal
                classNames={{ modal: 'trackingModal', overlay: 'trackModalOverlay' }}
                onCloseModal={e => {
                  e.preventDefault();
                  closeStatusModal();
                }}
                open={loaded}
              >
                <TackingTimeline data={orders} />
              </ResponsiveModal>
            ) : (
                <Label fontSize="0.75rem" lh="1.8" mb="1.125rem">
                  {loaded && !onChange ? (
                    <b style={{ color: 'red' }}>
                      {data.status === 'canceled'
                        ? 'This Order is Cancelled !'
                        : error || 'Sorry, no products found, please call customer care for further assistance !'}
                    </b>
                  ) : (
                      ''
                    )}
                </Label>
              )}
            <Row display="block" mr="0" ml="0" mt="1rem">
              <Div>
                <Label fontSize="0.75rem" lh="1.8" mb="1.125rem">
                  <b>Note:</b> Products with different delivery times may be shipped separately.
                  <br />
                  For any queries please call 08069252525 (10AM - 8PM) or mail us at
                  <a href="mailto:care@hometown.in"> care@hometown.in</a>
                </Label>
              </Div>
            </Row>
          </Div>
        </Container>
      </Section>
    );
  }
}

TrackOrder.propTypes = {
  // status: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  // error: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
  onChange: PropTypes.bool.isRequired,
  // errorMessage: PropTypes.string.isRequired
  closeStatusModal: PropTypes.func.isRequired
};
export default connect(mapStateToProps, null)(TrackOrder);
