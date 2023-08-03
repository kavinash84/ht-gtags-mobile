import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import DBCarousel from './carousel';

const styles = require('./ModularKitchen.scss');

const adjustSlides = length => ({
  slidesToShow: 1,
  slidesToScroll: 1,
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
accessories: modularWardrobe.data.items.text.accessories
}))

export default class Accessories extends Component {
  render() {
    const { accessories } = this.props;
    return (
      <Div style={{ marginBottom: '30px' }}>
        <Div style={{ backgroundColor: '#F5F5F5', padding: '30px 30px 10px', textAlign: 'center', marginTop: '0px' }}>
        <Div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'black', textAlign: 'center', lineHeight: '30px', marginTop: '15px' }}>
       {accessories.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
          <Div style={{ paddingBottom: '' }}>
            <DBCarousel data={accessories.values} settings={adjustSlides} component={7} />
          </Div>
        </Div>
      </Div>
    );
  }
}
