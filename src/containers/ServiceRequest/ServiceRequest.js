import React, { Component } from 'react';
import ServiceRequestContainer from 'components/ContactUs/ServiceRequest';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default class ServiceRequest extends Component {
  render() {
    return (
      <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle="Service Request">
        <ServiceRequestContainer />
      </OtherMenuFooter>
    );
  }
}
