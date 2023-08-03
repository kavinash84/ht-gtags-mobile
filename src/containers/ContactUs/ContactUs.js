import React, { Component } from 'react';
import ContactUsContainer from 'components/ContactUs/';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default class ContactUs extends Component {
  render() {
    return (
      <OtherMenuFooter
        backBtn
        menuIcon={false}
        Footer
        pageTitle="Contact Us - Hometown.in"
        seoDescription="Need to contact HomeTown for any queries? Visit our contact us page and get in touch with us!"
      >
        <ContactUsContainer />
      </OtherMenuFooter>
    );
  }
}
