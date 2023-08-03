import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import DBCarousel from './carousel';

const styles = require('./ModularKitchen.scss');

const adjustSlides = length => ({
  slidesToShow: 2,
  slidesToScroll: 2,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: '1px solid #848C7F'
      }}
    ></div>
  )
});

@connect(({ modularWardrobe }) => ({
  modularWardrobe,
  shopNow: modularWardrobe.data.items.text.shopNow
}))
export default class ShopNow extends Component {
  render() {
    const { shopNow } = this.props;
    return (
      <Div
        style={{ backgroundColor: '#FFFFFF', padding: '20px 15px 10px 30px', textAlign: 'center', marginTop: '10px' }}
      >
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: 'black' }}>
          {shopNow.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={shopNow.values} settings={adjustSlides} component={9} />
        </Div>
      </Div>
    );
  }
}
