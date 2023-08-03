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
  blogs: designBuild.data.items.text.blogs
}))
export default class Blogs extends Component {
  render() {
    const { blogs } = this.props;
    return (
      <Div style={{ backgroundColor: '#FFFFFF', padding: '30px 30px 10px 30px', textAlign: 'center' }}>
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: 'black' }}>
          {blogs.title}
          <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto', marginTop: '10px' }} />
        </Div>
        <Div style={{ paddingBottom: '' }}>
          <DBCarousel data={blogs.values} settings={adjustSlides} component={13} />
        </Div>
      </Div>
    );
  }
}
