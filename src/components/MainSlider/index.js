import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import { weBannerImpression } from "../../redux/modules/homepage";
import SliderItem from "./SliderItem";
import SlickSlider from "../SlickSlider";
import "./MainSlider.css";
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  arrows: false
};

class MainSlider extends Component {
  render() {
    const {
      data,
      triggerSlideChange,
      triggerSlideClick,
      weBannerImpression,
      reference,
      newSettings,
      onImageClick,
      mb
    } = this.props;
    const finalSettings = { ...settings, ...newSettings };
    return (
      <React.Fragment>
        <SlickSlider
          settings={finalSettings}
          // settings={{
          //   finalSettings,
          //   nextArrow: <SampleNextArrow />,
          //   prevArrow: <SamplePrevArrow />
          // }}
          afterChange={e => triggerSlideChange(e)}
          ref={reference}
          mb={mb}
          className="mainSlider"
        >
          {data.map((slide, index) => (
            <div key={String(index)}>
              <SliderItem
                target={slide.target || ""}
                image={slide.image}
                url={slide.url_key}
                title={slide.title || ""}
                onClick={() => {
                  weBannerImpression(slide.weData);
                  triggerSlideClick(index);
                }}
                onImageClick={onImageClick}
                index
              />
            </div>
          ))}
        </SlickSlider>
      </React.Fragment>
    );
  }
}

MainSlider.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  onImageClick: () => {},
  mb: "0.625rem"
};

MainSlider.propTypes = {
  data: PropTypes.array,
  triggerSlideChange: PropTypes.func.isRequired,
  triggerSlideClick: PropTypes.func.isRequired,
  weBannerImpression: PropTypes.func.isRequired,
  reference: PropTypes.object,
  newSettings: PropTypes.object,
  onImageClick: PropTypes.func,
  mb: PropTypes.string
};

export default connect(null, {
  triggerSlideChange: triggerImpression,
  triggerSlideClick: triggerClick,
  weBannerImpression: weBannerImpression
})(MainSlider);
