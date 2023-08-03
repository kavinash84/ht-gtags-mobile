import React from 'react';
import Promotions from 'components/Promotions';
import OtherMenuFooter from 'containers/OtherMenuFooter';

export default () => (
  <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle="Hometown Promotions and Offers">
    <Promotions />
  </OtherMenuFooter>
);
