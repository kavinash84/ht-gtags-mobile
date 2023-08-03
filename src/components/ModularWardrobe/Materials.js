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
  materials: modularWardrobe.data.items.text.materials
}))
export default class Materials extends Component {
  render() {
    const { materials } = this.props;
    return (
      <Div style={{ backgroundColor: '#F5F5F5', padding: '30px 30px 0px', textAlign: 'center', marginTop: '30px' }}>
        <Div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>
          {materials.title}
        </Div>
        <Div style={{ color: '#888888', marginBottom: '10px' }}>{materials.subtitle}</Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={materials.values} settings={adjustSlides} component={3} />
        </Div>
      </Div>
    );
  }
}