import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import DBCarousel from './carousel';

const styles = require('./ModularKitchen.scss');

const adjustSlides = length => ({
  slidesToShow: 1.3,
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
  wardrobesEveryone: modularWardrobe.data.items.text.wardrobesEveryone
}))
export default class WardrobesEveryone extends Component {
  render() {
    const { wardrobesEveryone } = this.props;
    return (
      <Div style={{ backgroundColor: '#FFFFFF', marginTop: '30px', textAlign: 'center' }}>
        <Div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>
          {wardrobesEveryone.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={wardrobesEveryone.values} settings={adjustSlides} component={3} />
        </Div>
      </Div>
    );
  }
}
