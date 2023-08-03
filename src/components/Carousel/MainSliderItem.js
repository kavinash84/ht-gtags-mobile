import React from "react";
import PropTypes from "prop-types";

const styles = require("./Slider.scss");

const MainSliderItem = ({ name, url, img }) => (
  <div className={styles.homeSlider}>
    <a className={styles.link} href={url}>
      <img src={img} alt={name} />
    </a>
  </div>
);

MainSliderItem.defaultProps = {
  name: "",
  url: "",
  img: ""
};

MainSliderItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string
};

export default MainSliderItem;
