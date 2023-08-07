import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SliderItem = ({ title, image, url, onClick, target }) => {
  if (!target && !url) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a title={title} rel="noopener noreferrer"
      onClick={()=>{
        window.dataLayer.push({
          event: 'pt_global_click_link_banner_click',
          pagetype: '',
          source_page_url: window.location.href,
          previous_page_url: '',
          destination_page_url: '',
          login_status: '',
          user_id: '',
          page_url: window.location.href,
          banner_id: '',
          click_text: title || ""
        });
      }}
      >
        <img
          data-src={image}
          src={`${image}?blur=30`}
          alt={title}
          style={{ width: "100%", height: "auto" }}
          loading="lazy"
        />
      </a>
    );
  } else if (target) {
    return (
      <a
        href={url}
        title={title}
        target={target}
        rel="noopener noreferrer"
        onClick={(e)=>{
          onClick(e)
          window.dataLayer.push({
            event: 'pt_global_click_link_banner_click',
            pagetype: '',
            source_page_url: window.location.href,
            previous_page_url: '',
            destination_page_url: '',
            login_status: '',
            user_id: '',
            page_url: window.location.href,
            banner_id: '',
            click_text: title || ""
          });
        }}
      >
        <img
          data-src={image}
          src={`${image}?blur=30`}
          alt={title}
          style={{ width: "100%", height: "auto" }}
          loading="lazy"
        />
      </a>
    );
  }
  return (
    <Link to={url}
    onClick={(e)=>{
      onClick(e)
      window.dataLayer.push({
        event: 'pt_global_click_link_banner_click',
        pagetype: '',
        source_page_url: window.location.href,
        previous_page_url: '',
        destination_page_url: '',
        login_status: '',
        user_id: '',
        page_url: window.location.href,
        banner_id: '',
        click_text: title || ""
      });
    }}
    >
      <img
        data-src={image}
        src={`${image}?blur=30`}
        alt={title}
        style={{ width: "100%", height: "auto" }}
        loading="lazy"
      />
    </Link>
  );
};

SliderItem.defaultProps = {
  title: "",
  image: "",
  target: ""
};

SliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default SliderItem;
