import React, { Component } from 'react';
import Wrapper from 'hometown-components/lib/Wrapper';
import ModularWardRobe from '../../components/ModularWardrobe';

export default class ModularWardrobeContainer extends Component {
  render() {
    return (
      <Wrapper>
        <ModularWardRobe />
      </Wrapper>
    );
  }
}
