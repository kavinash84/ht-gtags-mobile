import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { loadMyOrders } from 'redux/modules/orders';
import { loadOrdersTracking, closeModal, setCurrentOrder } from 'redux/modules/tracking';
import { getDateFilters } from 'utils/helper';
import OrderBlock from './OrderBlock';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadMyOrders,
      loadOrdersTracking,
      closeModal,
      setCurrentOrder
    },
    dispatch
  );
const mapStateToProps = ({
  orders,
  profile: {
    data: { contact_number: contactNumber }
  }
}) => ({
  results: orders.data,
  loading: orders.loading,
  loaded: orders.loaded,
  contactNumber
});

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      orderStatus: '',
      dateFilter: ''
    };
    this.FILTER_CONFIG = {
      days: [30],
      months: [6],
      years: 3
    };
    this.STATUS_FILTER = [
      { value: 'Open', label: 'Open' },
      { value: 'In-Process', label: 'In-Process' },
      { value: 'Resolved', label: 'Resolved' }
    ];
  }
  onStatusChange = status => {
    this.setState({
      orderStatus: { value: status, label: status }
    });
  };
  onChangeDate = dateFilter => {
    const { label } = dateFilter;
    // const startDate = dateFilter.start ? new Date(dateFilter.start) : '';
    // const endDate = dateFilter.end ? new Date(dateFilter.end) : '';
    // const start = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    // const end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    // this.setState({
    //   dateFilter: { value: label, label },
    //   startDate: start,
    //   endDate: end
    // });
    if (dateFilter.start && dateFilter.end) {
      const startDate = new Date(dateFilter.start);
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth() + 1 <= 9 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1;
      const startDay = startDate.getDate() <= 9 ? `0${startDate.getDate()}` : startDate.getDate();
      const endDate = new Date(dateFilter.end);
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth() + 1 <= 9 ? `0${endDate.getMonth() + 1}` : endDate.getMonth() + 1;
      const endDay = endDate.getDate() <= 9 ? `0${endDate.getDate()}` : endDate.getDate();
      const start = `${startYear}-${startMonth}-${startDay}`;
      const end = `${endYear}-${endMonth}-${endDay}`;
      this.setState({
        dateFilter: { value: label, label },
        startDate: start,
        endDate: end
      });
    } else {
      this.setState({
        dateFilter: { value: label, label },
        startDate: '',
        endDate: ''
      });
    }
  };
  getFilteredOrders = e => {
    e.preventDefault();
    const {
      startDate,
      endDate,
      orderStatus: { value: orderStatus }
    } = this.state;
    const { contactNumber } = this.props;
    this.props.loadMyOrders(contactNumber, startDate, endDate);
  };
  render() {
    const {
      results,
      loading,
      loadOrdersTracking: loadTrackingDetails,
      closeModal: closeTrackingModal,
      setCurrentOrder: setOrderNumber
    } = this.props;
    return (
      <Div type="block">
        <Section mb="0.3125rem" pt="0.5rem" pb="0.5rem" pr="0.5rem" pl="0.5rem">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
                My Orders
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section
          pt="1.25rem"
          mb="0"
          bg="sectionBgDark"
          boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
          display="flex"
          height="calc(100vh - 105px)"
        >
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row display="block" mr="-15px" ml="-15px" mb="1.5rem">
              <Div col="8" pr="5px">
                <Select
                  placeholder="Select From Date"
                  defaultValue={null}
                  value={this.state.dateFilter}
                  onChange={this.onChangeDate}
                  options={getDateFilters(this.FILTER_CONFIG)}
                />
              </Div>
              {/* <Div col="12" hide>
                <Select
                  placeholder="Select Order Status"
                  defaultValue={null}
                  value={this.state.caseStatus}
                  onChange={this.onStatusChange}
                  options={this.STATUS_FILTER}
                />
              </Div> */}
              <Div col="4" pl="5px">
                <Button
                  disabled={loading}
                  onClick={this.getFilteredOrders}
                  border="1px solid"
                  color="red"
                  lh="1.5"
                  size="block"
                  btnType="primary"
                  btnColor="#515151"
                  height="38px"
                  fontSize="16px"
                >
                  {loading ? 'Please Wait ...' : 'Find'}
                </Button>
              </Div>
            </Row>
            <Row>
              {results.length ? (
                results.map(item => (
                  <OrderBlock
                    key={item.order_item_id}
                    order={item}
                    loadOrdersTracking={loadTrackingDetails}
                    setCurrentOrder={setOrderNumber}
                    closeModal={closeTrackingModal}
                  />
                ))
              ) : (
                <p> No Orders Found </p>
              )}
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

MyOrder.defaultProps = {
  results: [],
  loading: false,
  contactNumber: ''
};
MyOrder.propTypes = {
  results: PropTypes.array,
  contactNumber: PropTypes.string,
  loading: PropTypes.bool,
  loadMyOrders: PropTypes.func.isRequired,
  loadOrdersTracking: PropTypes.func.isRequired,
  setCurrentOrder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrder);
