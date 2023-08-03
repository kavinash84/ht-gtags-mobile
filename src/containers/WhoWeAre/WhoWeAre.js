import React, { Component } from 'react';
import WhoWeAreContainer from 'components/StaticPages/WhoWeAre';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default class WhoWeAre extends Component {
  render() {
    return (
      <div className="wrapper">
        <OtherMenuFooter
          backBtn
          menuIcon={false}
          Footer
          pageTitle="Who We Are - Hometown.in"
          seoDescription="Want to know who we are and what we do?
          Visit www.hometown.in today to know more."
        >
          <WhoWeAreContainer />
        </OtherMenuFooter>
      </div>
    );
  }
}
