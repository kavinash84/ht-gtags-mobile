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

@connect(({ designBuild }) => ({
  designBuild,
  SpacesWeTransform: designBuild.data.items.text.SpacesWeTransform
}))
export default class SpacesTransformed extends Component {
  render() {
    const { SpacesWeTransform } = this.props;
    return (
      <Div style={{ backgroundColor: '#F5EEEE', padding: '30px 30px 10px', textAlign: 'center', marginTop: '10px' }}>
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '5px', color: 'black' }}>
          {SpacesWeTransform.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={SpacesWeTransform.values} settings={adjustSlides} component={7} />
        </Div>
      </Div>
    );
  }
}
