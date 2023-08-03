import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import CasesForm from 'components/MyOrder/CasesForm';
import ResponsiveModal from 'components/Modal';
import { formatAmount } from 'utils/formatters';
import { getImageURL } from 'utils/helper';
import TackingTimeline from './TrackingTimeline';

const styles = require('./MyOrder.scss');

const mapStateToProps = ({ cases, tracking }) => ({
  ordercase: cases.ordercase || {},
  trackingLoading: tracking.trackingLoading,
  trackingLoaded: tracking.trackingLoaded,
  currentOrder: tracking.currentOrder,
  data: tracking.data
});
class OrderBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCaseModal: false,
      caseItem: {},
      orderItem: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    const { loaded, loading } = nextProps.ordercase;
    if (loaded && !loading) {
      this.setState({
        openCaseModal: false
      });
    }
  }
  handleChange = (key, caseItem = {}, orderItem = {}) => {
    const newState = {};
    newState[key] = !this.state[key];
    this.setState({
      ...newState,
      caseItem,
      orderItem
    });
  };
  loadTrackingData = order => {
    const { loadOrdersTracking, setCurrentOrder } = this.props;
    const { order_number: orderNumber = '' } = order;
    setCurrentOrder(orderNumber);
    loadOrdersTracking(orderNumber);
  };
  render() {
    const {
      order,
      ordercase: { loaded, loading },
      trackingLoading,
      trackingLoaded,
      data,
      closeModal,
      currentOrder
    } = this.props;
    const { show_track_order: show = '', bob_order: isBob = '', status } = order;
    const error = data.error || '';
    const items = data.order_items || [];
    return (
      <Div className={styles.myOrdersWrapper}>
        <Row type="block" m="0" mb="1rem">
          <Div col="6">
            <Heading fontSize="1rem" color="textDark" mb="0px" mt="0px" fontFamily="regular">
              Order No. {order.order_number}
            </Heading>
          </Div>
          <Div col="6" ta="right">
            {show && (isBob === 0 || isBob === '0') && (status !== 'canceled') && (status !== 'payment_pending') ? (
              <Button
                disabled={trackingLoading && currentOrder === order.order_number}
                fontSize="14px !important"
                hoverColor="white"
                color="rgba(0,0,0,0.5)"
                bc="transparent"
                btnType="primary"
                p="5px 20px"
                onClick={e => {
                  e.preventDefault();
                  this.loadTrackingData(order);
                }}
              >
                {trackingLoading && currentOrder === order.order_number ? 'Please Wait' : 'Track'}
              </Button>
            ) : (
              <span />
            )}
          </Div>
        </Row>
        <Div>
          <Row type="block" m="0" mb="0.5rem">
            <Div col="6">
              <Text mt="0" mb="0.3125rem" fontSize="0.875rem" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                ORDER DATE
              </Text>
              <Text mt="0" mb="0.3125rem" fontSize="0.8125rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                {order.order_date}
              </Text>
            </Div>
            <Div col="6">
              <Text mt="0" mb="0.3125rem" fontSize="0.875rem" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
                ORDER AMOUNT
              </Text>
              <Text mt="0" mb="0.3125rem" fontSize="0.8125rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
                Rs.{formatAmount(order.grand_total)}
              </Text>
            </Div>
          </Row>
          <Row type="block" m="0">
            <Div col="12">
              <table className="ordersTable table" align="left">
                <tbody>
                  <tr>
                    <th colSpan="2" align="left">
                      Products
                    </th>
                    <th align="left"> Qty </th>
                    <th align="left">Delivery Status</th>
                  </tr>
                  {order.order_items &&
                    order.order_items.map(item => (
                      <tr key={item.order_item_id}>
                        <td width="50px">
                          <ImageShimmer src={getImageURL(item.image, 'catalog_360')} height="50px">
                            {imageURL => <Img src={imageURL} alt={item.product_name} />}
                          </ImageShimmer>
                        </td>
                        <td>{item.product_name || '--'}</td>
                        <td>{item.quantity || '--'}</td>
                        {order.status === 'canceled' ? (
                          <td>
                            <span style={{ color: 'red' }}> Cancelled </span>
                          </td>
                        ) : (
                          <td>{item.delivery_date_text || ''}</td>
                        )}
                        {item.bob_order_item === 0 || item.bob_order_item === '0' ? (
                          <td>
                            <Button
                              fontSize="14px !important"
                              hoverColor="white"
                              color="rgba(0,0,0,0.5)"
                              bc="rgba(0,0,0,0.5)"
                              btnType="btnOutline"
                              p="5px 20px"
                              onClick={() => {
                                this.handleChange('openCaseModal', item, order);
                              }}
                            >
                              Help
                            </Button>
                          </td>
                        ) : (
                          ''
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </Div>
          </Row>
        </Div>
        <ResponsiveModal
          classNames={{ modal: '' }}
          onCloseModal={e => {
            e.preventDefault();
            this.handleChange('openCaseModal');
          }}
          open={this.state.openCaseModal}
        >
          <CasesForm
            loading={loading}
            loaded={loaded}
            caseItem={this.state.caseItem}
            orderItem={this.state.orderItem}
          />
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{ modal: 'trackingModal', overlay: 'trackModalOverlay' }}
          onCloseModal={e => {
            e.preventDefault();
            closeModal();
          }}
          open={trackingLoaded && currentOrder === order.order_number}
        >
          <TackingTimeline error={error} data={items} />
        </ResponsiveModal>
      </Div>
    );
  }
}

OrderBlock.defaultProps = {
  ordercase: {}
};
OrderBlock.propTypes = {
  order: PropTypes.object.isRequired,
  ordercase: PropTypes.object,
  loadOrdersTracking: PropTypes.func.isRequired,
  setCurrentOrder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  trackingLoading: PropTypes.bool.isRequired,
  trackingLoaded: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  currentOrder: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  null
)(OrderBlock);
