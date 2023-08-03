import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "hometown-components/lib/Img";

const SliderItem = ({
  title,
  image,
  url,
  onClick,
  target,
  onImageClick,
  index
}) => {
  if (!target && !url) {
    return (
      <div
        title={title}
        rel="noopener noreferrer"
        as="a"
        onClick={onImageClick}
      >
        <img
          fetchpriority="high"
          data-src={image}
          src={`${image}?blur=30`}
          alt={title || "Banner-image"}
          style={{ width: "100%", height: "220px" }}
        />
      </div>
    );
  } else if (target) {
    return (
      <div
        href={url}
        title={title}
        target={target}
        rel="noopener noreferrer"
        onClick={onClick}
        as="a"
      >
        <img
          fetchpriority="high"
          data-src={image}
          src={`${image}?blur=30`}
          alt={title || "Banner-image"}
          style={{ width: "100%", height: "220px" }}
        />
      </div>
    );
  }
  return (
    <Link to={url} onClick={onClick}>
      <img
        fetchpriority="high"
        data-src={image}
        src={`${image}?blur=30`}
        alt={title || "Banner-image"}
        style={{ width: "100%", height: "220px" }}
      />
    </Link>
  );
};

SliderItem.defaultProps = {
  title: "",
  image: "",
  target: "",
  url: "",
  onImageClick: () => {}
};

SliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func
};

export default SliderItem;
