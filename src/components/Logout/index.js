import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'hometown-components/lib/Buttons';
import { logout } from 'redux/modules/login';
import { addToSelectForDemo } from 'redux/modules/selectForDemo';

const onClickLogout = dispatcher => dispatcheroEmpty => e => {
  e.preventDefault();
  dispatcher();
  const state = [];
  dispatcheroEmpty(state);
};

@connect(
  null,
  {
    logoutUser: logout,
    clearSelectDemo: addToSelectForDemo
  }
)
export default class Logout extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired
  };
  render() {
    const { logoutUser, clearSelectDemo } = this.props;
    return (
      <Button p="0" border="none" bg="transparent" onClick={onClickLogout(logoutUser)(clearSelectDemo)}>
        Logout
      </Button>
    );
  }
}
