import React, { Component } from 'react';
import Wrapper from 'hometown-components/lib/Wrapper';
import HomeInterior from 'components/HomeInterior';

export default class HomeInteriorContainer extends Component {
  render() {
    return (
      <Wrapper>
        <HomeInterior />
      </Wrapper>
    );
  }
}
