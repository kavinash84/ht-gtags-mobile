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
         onClick={(e)=>{
          onImageClick(e);
          window.dataLayer.push({
            event: 'pt_global_click_link_banner_click',
            pagetype: '',
            source_page_url: window.location.href,
            previous_page_url: '',
            destination_page_url: "",
            login_status: '',
            user_id: '',
            page_url: window.location.href,
            banner_id: '',
            click_text: title
          });
        }}
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
        onClick={(e)=>{
          onClick(e);
          window.dataLayer.push({
            event: 'pt_global_click_link_banner_click',
            pagetype: '',
            source_page_url: window.location.href,
            previous_page_url: '',
            destination_page_url: "",
            login_status: '',
            user_id: '',
            page_url: window.location.href,
            banner_id: '',
            click_text: title
          });
        }}
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
    <Link to={url}  onClick={(e)=>{
      onClick(e);
      window.dataLayer.push({
        event: 'pt_global_click_link_banner_click',
        pagetype: '',
        source_page_url: window.location.href,
        previous_page_url: '',
        destination_page_url:url,
        login_status: '',
        user_id: '',
        page_url: window.location.href,
        banner_id: '',
        click_text: title
      });
    }}>
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
