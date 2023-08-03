import React, { Component } from 'react';
import GrievanceContainer from 'components/ContactUs/Grievance';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default class Grievance extends Component {
  render() {
    return (
      <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle="Grievance">
        <GrievanceContainer />
      </OtherMenuFooter>
    );
  }
}
