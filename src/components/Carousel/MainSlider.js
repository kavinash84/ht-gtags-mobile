import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import SlickSlider from '../SlickSlider';
import MainSliderItem from './MainSliderItem';

export default class MainSlider extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mb="0.625rem">
        <SlickSlider>
          {data.map(slide => (
            <MainSliderItem key={slide.id} name={slide.title} url={slide.url_key} img={slide.image} />
          ))}
        </SlickSlider>
      </Div>
    );
  }
}

MainSlider.defaultProps = {
  data: []
};

MainSlider.propTypes = {
  data: PropTypes.array
};
