import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import DBCarousel from './carousel';

const styles = require('./ModularKitchen.scss');

const adjustSlides = length => ({
  slidesToShow: 1.2,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  // dots: true,
  // customPaging: i => (
  //   <div
  //     style={{
  //       borderTop: '1px solid #848C7F'
  //     }}
  //   ></div>
  // )
});

@connect(({ modularWardrobe }) => ({
    modularWardrobe,
  finishes: modularWardrobe.data.items.text.finishes
}))
export default class WardrobeTypes extends Component {
  render() {
    const { finishes } = this.props;
    return (
      <Div style={{ backgroundColor: '#F7F0F0', padding: '30px 30px 0px', textAlign: 'center', marginTop: '30px' }}>
        <Div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>
          {finishes.title}
        </Div>
        <Div style={{ color: '#888888', marginBottom: '10px' }}>{finishes.subtitle}</Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={finishes.values} settings={adjustSlides} component={3} />
        </Div>
      </Div>
    );
  }
}