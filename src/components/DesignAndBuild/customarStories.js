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
  customerStories: designBuild.data.items.text.customerStories
}))
export default class CustomerStories extends Component {
  render() {
    const { customerStories } = this.props;
    return (
      <Div style={{ backgroundColor: '#FFFFFF', padding: '30px 30px 0px', textAlign: 'center', marginTop: '10px' }}>
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '0px', color: 'black' }}>
          {customerStories.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={customerStories.values} settings={adjustSlides} component={8} />
        </Div>
      </Div>
    );
  }
}
