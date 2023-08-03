import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchListContainer from 'components/Search/SearchList';
import { clearSearchQuery } from 'redux/modules/search';

export default class SearchList extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentWillMount() {
    const { dispatch } = this.context.store;
    dispatch(clearSearchQuery());
  }
  render() {
    return (
      <div>
        <SearchListContainer />
      </div>
    );
  }
}
