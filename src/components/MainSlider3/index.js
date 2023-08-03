import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import SliderItem from "./SliderItem";
import SlickSlider from "../SlickSlider";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  arrows: false
};

@connect(({ listingbanners }) => ({
  data: listingbanners.data2.items.text.banners3
}))
class MainSlider3 extends Component {
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
      <React.Fragment>
        {data.length !== 0 ? (
          <SlickSlider
            className="mainSlider"
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
        ) : null}
      </React.Fragment>
    );
  }
}

MainSlider3.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  mb: "0.625rem"
};

MainSlider3.propTypes = {
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
})(MainSlider3);
