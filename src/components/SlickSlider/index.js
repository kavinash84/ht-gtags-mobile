import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Div from 'hometown-components/lib/Div';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const defaultSettings = {
  infinite: true,
  dots: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  lazyLoad: true,
  arrows: false
};

export default class SlickSlider extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    passedRef: PropTypes.object,
    mb: PropTypes.string
  };
  static defaultProps = {
    passedRef: {},
    mb: '0.625rem'
  };
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }
  render() {
    const { children, settings, mb, ...rest } = this.props;
    const newSettings = { ...defaultSettings, ...settings };
    return (
      <Div mb={mb}>
        <Slider ref={this.slider} {...newSettings} {...rest}>
          {children}
        </Slider>
      </Div>
    );
  }
}
