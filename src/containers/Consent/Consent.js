import React, { Component } from 'react';
import UserConsent from 'components/UserConsent';
import OtherMenuFooter from 'containers/Consent/Wrapper';

export class Consent extends Component {
  render() {
    return (
      <div className="wrapper">
        <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle="User Consent">
          <UserConsent />
        </OtherMenuFooter>
      </div>
    );
  }
}

export default Consent;
