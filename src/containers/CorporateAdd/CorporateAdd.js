import React, { Component } from 'react';
import Menu from 'components/OtherMenu';
import CorporateAddContainer from 'components/ContactUs/CorporateAdd';

export default class CorporateAdd extends Component {
  render() {
    return (
      <div>
        <Menu />
        <CorporateAddContainer />
      </div>
    );
  }
}
