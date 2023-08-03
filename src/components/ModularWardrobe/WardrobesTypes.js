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
  wardrobesTypes: modularWardrobe.data.items.text.wardrobesTypes
}))
export default class WardrobeTypes extends Component {
  render() {
    const { wardrobesTypes } = this.props;
    return (
      <div>
       <Div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'black', textAlign: 'center', lineHeight: '30px', marginTop: '15px' }}>
       Select From A Range <br></br> Of Wardrobe Collection
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
      <Div style={{ backgroundColor: '#F7F0F0', padding: '30px 30px 0px', textAlign: 'center' }}>
        <Div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>
          {wardrobesTypes.title}
        </Div>
        <Div style={{ color: '#888888', marginBottom: '10px' }}>{wardrobesTypes.subtitle}</Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={wardrobesTypes.values} settings={adjustSlides} component={3} />
        </Div>
      </Div>
      </div>
    );
  }
}