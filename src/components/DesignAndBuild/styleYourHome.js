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
  styleHome: designBuild.data.items.text.styleHome
}))
export default class StyleYourHome extends Component {
  render() {
    const { styleHome } = this.props;
    return (
      <Div style={{ backgroundColor: '#FFFFFF', padding: '10px', textAlign: 'center', marginTop: '10px' }}>
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '0px', color: 'black' }}>
          {styleHome.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ padding: '10px 5px 0px 20px' }}>
          <DBCarousel data={styleHome.values} settings={adjustSlides} component={10} />
        </Div>
      </Div>
    );
  }
}
