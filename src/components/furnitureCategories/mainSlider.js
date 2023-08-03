import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import SliderItem from "./mainSliderItem";
import SlickSlider from "../SlickSlider";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  arrows: false,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
};

import "./Slider.css";

class MainFurnitureSlider extends Component {
  render() {
    const {
      data,
      triggerSlideChange,
      triggerSlideClick,
      reference,
      newSettings,
      mb
    } = this.props;
    const finalSettings = { ...settings, ...newSettings };

    return (
      <SlickSlider
        className="carousel-one"
        settings={finalSettings}
        afterChange={e => triggerSlideChange(e)}
        ref={reference}
        mb={mb}
      >
        {data.map((slide, index) => (
          <div key={String(index)}>
            <SliderItem
              target={slide.target || ""}
              image={slide.m_image || slide.image}
              url={slide.url_key}
              title={slide.title || ""}
              onClick={() => triggerSlideClick(index)}
            />
          </div>
        ))}
      </SlickSlider>
    );
  }
}

MainFurnitureSlider.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  mb: "0.625rem"
};

MainFurnitureSlider.propTypes = {
  data: PropTypes.array,
  triggerSlideChange: PropTypes.func.isRequired,
  triggerSlideClick: PropTypes.func.isRequired,
  reference: PropTypes.object,
  newSettings: PropTypes.object,
  mb: PropTypes.string
};

export default connect(null, {
  triggerSlideChange: triggerImpression,
  triggerSlideClick: triggerClick
})(MainFurnitureSlider);
