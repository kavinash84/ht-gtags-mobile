import React, { Component } from 'react';
import FaqContainer from 'components/StaticPages/Faqs';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default class Faq extends Component {
  render() {
    return (
      <OtherMenuFooter
        backBtn
        menuIcon={false}
        Footer
        pageTitle="FAQs - Hometown.in"
        seoDescription="Have queries pertaining to questions that are most frequently asked by our customers.
        Visit our FAQs page at Hometown to know more."
      >
        <FaqContainer />
      </OtherMenuFooter>
    );
  }
}
