import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Div from "hometown-components/lib/Div";
import Input from "hometown-components/lib/Input";
// import { formatProductURL } from 'utils/helper';

const styles = require("./Search.scss");

const onFocus = history => e => {
  e.preventDefault();
  return history.push("/new-search");
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
class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {
  //   const { history } = this.props;
  //   window.unbxd_autosuggest_fun();
  //   window.HTSEARCH = {};
  //   window.HTSEARCH.navigateToPDP = navigateToPDP(history);
  //   window.HTSEARCH.navigateToSearch = navigateToSearch(history);
  // }
  componentDidMount() {
    // window.unbxd_autosuggest_fun();
  }
  render() {
    const { history } = this.props;
    return (
      <Div className={styles.search} pt="0" pb="0" onClick={onFocus(history)}>
        <Input
          type="text"
          placeholder="Search"
          backgroundColor="rgba(0, 0, 0, 0.05)"
          borderColor="rgba(0, 0, 0, 0.03)"
          height="2.5rem"
          p="0 2.2rem"
          onFocus={onFocus(history)}
        />
      </Div>
    );
  }
}

SearchInput.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(SearchInput);
