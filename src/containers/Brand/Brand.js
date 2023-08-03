import React from 'react';
import BrandContainer from 'components/Brand';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default () => (
  <div className="wrapper">
    <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle="Brand">
      <BrandContainer />
    </OtherMenuFooter>
  </div>
);
