import React, { Component } from 'react';
import FeedbackContainer from 'components/ContactUs/Feedback';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default class Feedback extends Component {
  render() {
    return (
      <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle="">
        <FeedbackContainer />
      </OtherMenuFooter>
    );
  }
}
