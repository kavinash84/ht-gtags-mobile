import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import { weBannerImpression } from "../../redux/modules/homepage";
import SliderItem from "./SliderItem";
import SlickSlider from "../SlickSlider";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  arrows: false
};

class MainSlider2 extends Component {
  render() {
    const {
      data,
      triggerSlideChange,
      triggerSlideClick,
      reference,
      newSettings,
      mb,
      weBannerImpression
    } = this.props;
    const finalSettings = { ...settings, ...newSettings };

    return (
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
              onClick={() => {
                weBannerImpression(slide.weData);
                triggerSlideClick(index);
                window.dataLayer.push({
                  event: 'pt_global_click_link_banner_click',
                  pagetype: '',
                  source_page_url: window.location.href,
                  previous_page_url: '',
                  destination_page_url:slide.url_key||"",
                  login_status: '',
                  user_id: '',
                  page_url: window.location.href,
                  banner_id: '',
                  click_text: title||""
                });
                
              }}
            />
          </div>
        ))}
      </SlickSlider>
    );
  }
}

MainSlider2.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  mb: "0.625rem"
};

MainSlider2.propTypes = {
  data: PropTypes.array,
  triggerSlideChange: PropTypes.func.isRequired,
  triggerSlideClick: PropTypes.func.isRequired,
  weBannerImpression: PropTypes.func.isRequired,
  reference: PropTypes.object,
  newSettings: PropTypes.object,
  mb: PropTypes.string
};

export default connect(null, {
  triggerSlideChange: triggerImpression,
  triggerSlideClick: triggerClick,
  weBannerImpression: weBannerImpression
})(MainSlider2);
