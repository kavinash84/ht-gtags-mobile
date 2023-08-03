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
import { loadMyCases } from 'redux/modules/mycases';
import { getDateFilters } from 'utils/helper';
import CasesBlock from './CasesBlock';

const caseMapping = require('../../data/case-reverse-mapping');

const mapDispatchToProps = dispatch => bindActionCreators({ loadMyCases }, dispatch);
const mapStateToProps = ({ mycases, profile }) => ({
  ...mycases,
  mycases,
  contactNumber: profile.data.contact_number,
  salesforce_account_id: profile.data.salesforce_account_id
});

class MyCases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      caseStatus: '',
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
      { value: 'Completed', label: 'Resolved' }
    ];
  }
  onStatusChange = status => {
    this.setState({
      caseStatus: status
    });
  };
  onChangeDate = dateFilter => {
    const { label } = dateFilter;
    // const startDate = dateFilter.start ? new Date(dateFilter.start) : '';
    // const endDate = dateFilter.end ? new Date(dateFilter.end) : '';
    // const start = this.formatDate(startDate);
    // const end = this.formatDate(endDate);
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
  getFilteredCases = e => {
    e.preventDefault();
    const {
      startDate,
      endDate,
      caseStatus: { value: caseStatus }
    } = this.state;
    const { salesforce_account_id: sfid, contactNumber: cn } = this.props;
    this.props.loadMyCases(sfid, startDate, endDate, caseStatus, cn);
  };
  getMapping = (cat = '', subcat = '', type = '') => {
    let value = '';
    if (cat && subcat) {
      const key = `${cat}-${subcat}`;
      const item = caseMapping[`${key}`] ? caseMapping[`${key}`] : {};
      value = item[`${type}`] || '';
    }
    return value;
  };
  formatDate = inputDate => {
    const yearValue = inputDate.getFullYear();
    const monthInput = inputDate.getMonth() + 1;
    const monthValue = monthInput <= 9 ? `0${monthInput}` : monthInput;
    const dayInput = inputDate.getDate();
    const dayValue = dayInput <= 9 ? `0${dayInput}` : dayInput;
    const value = `${yearValue}-${monthValue}-${dayValue}`;
    return value;
  };
  render() {
    const { data: results, loading } = this.props;
    return (
      <Div type="block">
        <Section mb="0.3125rem" pt="0.5rem" pb="0.5rem" pr="0.5rem" pl="0.5rem">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
                My Cases
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section pt="1.25rem" mb="0" bg="sectionBgDark" boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)" display="flex">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row display="block" mr="-15px" ml="-15px" mb="1.5rem">
              <Div col="12" mr="1rem" mb="10px">
                <Select
                  placeholder="Select From Date"
                  defaultValue={null}
                  value={this.state.dateFilter}
                  onChange={this.onChangeDate}
                  options={getDateFilters(this.FILTER_CONFIG)}
                />
              </Div>
              <Div col="12" mr="1rem" mb="10px">
                <Select
                  placeholder="Select Case Status"
                  defaultValue={null}
                  value={this.state.caseStatus}
                  onChange={this.onStatusChange}
                  options={this.STATUS_FILTER}
                />
              </Div>
              <Div col="12" mr="1rem">
                <Button
                  disabled={loading}
                  onClick={this.getFilteredCases}
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
                results.map((item, index) => (
                  <CasesBlock key={String(index)} item={item} getMapping={this.getMapping} />
                ))
              ) : (
                <p> No Cases Found </p>
              )}
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

MyCases.defaultProps = {
  data: [],
  loading: false,
  updated: false,
  salesforce_account_id: '',
  contactNumber: ''
};

MyCases.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  updated: PropTypes.bool, //eslint-disable-line
  salesforce_account_id: PropTypes.string,
  loadMyCases: PropTypes.func.isRequired,
  contactNumber: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCases);
