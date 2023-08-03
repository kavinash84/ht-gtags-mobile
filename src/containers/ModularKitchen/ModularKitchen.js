import React, { Component } from 'react';
import ModularKitchenContainer from 'components/StaticPages/ModularKitchen';
import OtherMenuFooter from 'containers/OtherMenuFooter';

@connect(({ modularkitchen }) => ({
  modularkitchen
}))
export default class ModularKitchen extends Component {
  render() {
    return (
      <div className="wrapper">
        <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle="Modular Kitchen">
          <ModularKitchenContainer />
        </OtherMenuFooter>
      </div>
    );
  }
}
