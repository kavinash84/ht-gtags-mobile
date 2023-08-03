import React, { Component } from 'react';
import MyCasesContainer from 'components/MyCases';
import Menu from 'components/OtherMenu';

export default class MyCases extends Component {
  render() {
    return (
      <div>
        <Menu />
        <MyCasesContainer />
      </div>
    );
  }
}
