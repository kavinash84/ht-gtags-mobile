import React, { Component } from "react";
import PropTypes from "prop-types";
import Section from "hometown-components/lib/Section";
import Button from "hometown-components/lib/Buttons";
import Img from "hometown-components/lib/Img";
import SlickSlider from "../SlickSlider";
import ProductDetailSliderItem from "./ProductDetailSliderItem";
import "./slider.css";
const styles = require("./ProductDetailSliderItem.scss");

const ZoomIcon = require("../../../static/zoom-in.svg");

const settings = {
  autoplay: false,
  infinite: false,
  lazyLoad: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
};

class ProductDetailSlider extends Component {
  render() {
    const { imageList, handleZoom, title, youtube } = this.props;
    const formatedData = youtube
      ? (imageList && [...imageList, { youtubeid: youtube }]) || []
      : [...imageList];
    return (
      <Section className={styles.prodDetailsSlider} mt="0.3125rem" mb="0">
        <Button
          p="5px"
          btnType="custom"
          bg="rgba(0,0,0,0.35)"
          color="white"
          border="none"
          onClick={() => handleZoom(0)}
          className={styles.zoomIcon}
          fontSize="12px"
          width="160px"
        >
          <Img
            display="inline-block"
            mr="5px"
            width="18px"
            va="bottom"
            src={ZoomIcon}
            alt="zoom"
          />
          Tap on image to zoom
        </Button>
        {formatedData.length > 0 && (
          <SlickSlider settings={settings}>
            {formatedData.map((item, index) => (
              <Button
                p="0"
                bg="transparent"
                border="none"
                onClick={() => handleZoom(index)}
                key={item.id_catalog_product_image}
                className={styles.imageButton}
              >
                {item.hasOwnProperty("youtubeid") && item.youtubeid ? (
                  <video
                    width="100%"
                    height="320px"
                    style={{ backgroundColor: "black" }}
                    controls
                    loop
                    autoPlay
                    muted
                  >
                    <source src={item.youtubeid} type="video/mp4" />
                  </video>
                ) : (
                  <ProductDetailSliderItem
                    name={title}
                    url={item.target_url}
                    img={`${item.url}.jpg?mode=fill&h=360&w=360&dpr=1.5`}
                  />
                )}
              </Button>
            ))}
          </SlickSlider>
        )}
      </Section>
    );
  }
}

ProductDetailSlider.defaultProps = {
  imageList: [],
  handleZoom: () => {},
  title: ""
};
ProductDetailSlider.propTypes = {
  imageList: PropTypes.array,
  handleZoom: PropTypes.func,
  title: PropTypes.string
};

export default ProductDetailSlider;
