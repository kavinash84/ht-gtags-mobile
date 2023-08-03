import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
// import { formatProductURL } from 'utils/helper';
import * as actionCreators from 'redux/modules/search';

const styles = require('./Search.scss');
const SearchIcon = require('../../../static/search-icon.svg');
const CloseIcon = require('../../../static/close-icon.svg');
const BackIcon = require('../../../static/back-icon.svg');

const clearSearch = dispatcher => e => {
  e.preventDefault();
  dispatcher();
};

const onChange = (dispatcher, load) => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
  // if (value.length >= 3) load(value);
};
// const navigateToPDP = history => (name, sku) => {
//   const productURL = formatProductURL(name, sku);
//   history.push(productURL);
// };
// const navigateToSearch = history => (path, query) => {
//   // const url = `search/?q=${query}`;
//   // history.push(url);
//   // history.replace({ pathname: `/search/?q=${query}` });
//   history.push({
//     pathname: `${path}${query ? `/?${query}` : ''}`,
//     state: {
//       query
//     }
//   });
// };

const mapStateToProps = ({ search }) => ({
  ...search
});

// const onSubmit = (searchQuery, setSearchHistory, history) => e => {
//   e.preventDefault();
//   setSearchHistory(searchQuery);
//   return history.push(`/search/?q=${searchQuery}`);
// };

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchinputref = React.createRef();
  }
  // componentDidMount() {
  //   if (this.searchinputref.current) {
  //     this.searchinputref.current.focus();
  //   }
  //   const { history } = this.props;
  //   window.unbxd_autosuggest_fun();
  //   window.HTSEARCH = {};
  //   window.HTSEARCH.navigateToPDP = navigateToPDP(history);
  //   window.HTSEARCH.navigateToSearch = navigateToSearch(history);
  // }
  componentDidMount() {
    window.unbxd_autosuggest_fun();
    if (this.searchinputref.current) {
      this.searchinputref.current.focus();
    }
  }
  render() {
    const {
      setSearchQuery,
      searchQuery,
      clearSearchQuery,
      load,
      history
      // setSearchHistory
    } = this.props;
    // onSubmit function -onSubmit(searchQuery, setSearchHistory, history)- removed
    return (
      <Div className={styles.search} pt="0" pb="0">
        <button onClick={history.goBack} className={styles.backIcon}>
          <img src={BackIcon} alt="Back" />
        </button>
        <form onSubmit={() => {}}>
          <input
            id="ht_generic_search"
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            onChange={onChange(setSearchQuery, load)}
            value={searchQuery}
            ref={this.searchinputref}
          />
        </form>
        {searchQuery === '' ? (
          <img src={SearchIcon} className={styles.searchIcon} alt="Search" />
        ) : (
          <Button
            className={styles.closeBtn}
            onClick={clearSearch(clearSearchQuery)}
            btnType="custom"
            bg="transparent"
            border="none"
            p="0"
          >
            <img src={CloseIcon} alt="Close" />
          </Button>
        )}
      </Div>
    );
  }
}

Search.defaultProps = {
  searchQuery: ''
};

Search.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
  // setSearchHistory: PropTypes.func.isRequired,
  clearSearchQuery: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
