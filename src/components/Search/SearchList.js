import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/search';
import Search from 'components/Search';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Container from 'hometown-components/lib/Container';

const styles = require('./Search.scss');
const historyIcon = require('../../../static/history-icon.svg');

const mapStateToProps = ({ search }) => ({
  ...search
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const SearchHistoryItem = ({ searchText }) => (
  <li>
    <Link to={`/search/?q=${searchText}`}>
      <span className={styles.historyIcon}>
        <img src={historyIcon} alt="" />
      </span>
      {searchText}
      <span className={styles.arrowIcon}>❯</span>
    </Link>
  </li>
);

// const onClick = (dispatcher, resultText) => () => {
//   // e.preventDefault();
//   dispatcher(resultText);
// };

// removed props
// loading,
// loaded,
// notFound,
// searchQuery,
// results,
// searchHistory,
// setSearchHistory
const SearchList = () => (
  <Container type="container" pr="0" pl="0">
    <div className={styles.searchListWraper}>
      <div className={styles.sidebarContainer}>
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Search />
          </Div>
        </Row>
        {/* <Row display="block" mr="0" ml="0">
          <Div col="12">
            <ul className={styles.searchListUl}>
              {searchQuery === '' &&
                searchHistory.map((text, index) => <SearchHistoryItem key={String(index)} searchText={text} />)}
              {loading && <li> Searching.... </li>}
              {loaded && searchQuery !== '' && notFound && <li>Not Found !</li>}
              {loaded &&
                results.length > 0 &&
                results.filter(result => result.has_url_key === true).map((result, index) => (
                  <li key={String(index)}>
                    <Link to={result.url_key} onClick={onClick(setSearchHistory, result.name)}>
                      {result.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </Div>
        </Row> */}
      </div>
    </div>
  </Container>
);

// SearchList.defaultProps = {
//   loading: false,
//   loaded: false,
//   notFound: false,
//   results: [],
//   searchHistory: [],
//   searchQuery: ''
// };

// SearchList.propTypes = {
//   loading: PropTypes.bool,
//   loaded: PropTypes.bool,
//   results: PropTypes.array,
//   searchHistory: PropTypes.array,
//   notFound: PropTypes.bool,
//   searchQuery: PropTypes.string,
//   setSearchHistory: PropTypes.func.isRequired
// };

SearchHistoryItem.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
