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

@connect(({ designBuild }) => ({
  designBuild,
  shopFurniture: designBuild.data.items.text.shopFurniture
}))
export default class ShopFurniture extends Component {
  render() {
    const { shopFurniture } = this.props;
    return (
      <Div style={{ backgroundColor: '#FFFFFF', padding: '10px', textAlign: 'center', marginTop: '10px' }}>
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '0px', color: 'black' }}>
          {shopFurniture.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ padding: '10px 5px 0px 20px' }}>
          <DBCarousel data={shopFurniture.values} settings={adjustSlides} component={9} />
        </Div>
      </Div>
    );
  }
}
