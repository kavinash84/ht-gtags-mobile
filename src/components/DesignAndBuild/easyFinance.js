import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import DBCarousel from './carousel';

const styles = require('./ModularKitchen.scss');

const adjustSlides = length => ({
  slidesToShow: 2.2,
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
  easyFinance: designBuild.data.items.text.easyFinance
}))
export default class EasyFinance extends Component {
  render() {
    const { easyFinance } = this.props;
    return (
      <Div style={{ backgroundColor: '#F5F5F5', padding: '30px 30px 10px 30px', textAlign: 'center' }}>
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: 'black' }}>
          {easyFinance.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={easyFinance.values} settings={adjustSlides} component={11} />
        </Div>
      </Div>
    );
  }
}
