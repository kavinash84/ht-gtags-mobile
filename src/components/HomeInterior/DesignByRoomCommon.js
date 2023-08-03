import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
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

export default class DesignByRoomCommon extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div style={{ marginBottom: '30px' }}>
        <div style={{ height: '185px' }}>
          <img
            data-src={data.imgSrc}
            src={`${data.imgSrc}?blur=30`}
            alt={data.title}
            style={{ height: '100%', width: 'auto', margin: 'auto', marginBottom: '-5px' }}
          />
        </div>
        <Div style={{ backgroundColor: '#F5EEEE', padding: '30px 30px 10px', textAlign: 'center', marginTop: '0px' }}>
          <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '5px', color: 'black' }}>{data.title}</Div>
          <Text style={{ color: '#888888', textAlign: 'center' }}>{data.description}</Text>
          <Div style={{ paddingBottom: '' }}>
            <DBCarousel data={data.values} settings={adjustSlides} component={7} />
          </Div>
        </Div>
      </Div>
    );
  }
}
