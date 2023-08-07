import React from "react";
import PropTypes from "prop-types";
import Div from "hometown-components/lib/Div";
import Text from "hometown-components/lib/Text";
import { Link } from "react-router-dom";

const arrowForward = require("../../../static/newHomepage/newForwardArrow.svg");
const styles = require("./Slider.scss");

const getDetails = (component, name, style, data) => {
  switch (component) {
    case 5:
      return (
        <Div className={styles.content1}>
          <Text className={styles.name}>
            {name.split("").length > 50 ? `${name.slice(0, 50)}....` : name}
          </Text>
          <Text className={styles.name}>
            <span style={{ color: data.price ? "" : "white" }}>Starting</span>{" "}
            {data.price}
          </Text>
        </Div>
      );
      break;
    case 7:
      return (
        <Div>
          {/* <Text className={styles.name} mt={0}>
            {name.split('').length > 50 ? `${name.slice(0, 50)}....` : name}
          </Text> */}
        </Div>
      );
      break;
    default:
      return (
        <Div className={styles.content}>
          <div className={styles.title} style={style}>
            {name.split("").length > 50 ? `${name.slice(0, 50)}....` : name}
          </div>
        </Div>
      );
  }
};

const ShopbyCatItem = ({
  image,
  name,
  url,
  layout,
  layoutStyle,
  style,
  component,
  data
}) => {
  if (component === 5) {
    return (
      <Div
        className={`${styles.sliderItem}
      ${layoutStyle === "grid" ? styles.grid : ""}
      ${layout === "square" ? styles.square : styles.round} ${
          component === 5 ? styles.shadowBox : ""
        }`}
      >
        <div className={styles.shadowdBox}>
          <Link className={styles.link} to={url}
          onClick={()=>{
            window.dataLayer.push({
              event: 'pt_global_click_link_banner_click',
              pagetype: '',
              source_page_url: window.location.href,
              previous_page_url: '',
              destination_page_url: url,
              login_status: '',
              user_id: '',
              page_url: window.location.href,
              banner_id: '',
              click_text: name || ""
            });
          }}
          >
            hhhhhhhhhhhhh
            <img
              data-src={image}
              src={`${image}?blur=30`}
              alt={name}
              className={styles.curosalImg}
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
            />
            {getDetails(component, name, style, data)}
          </Link>
        </div>
      </Div>
    );
  } else if (component === 7) {
    return (
      <Div
        className={`${styles.sliderItem}
        ${layoutStyle === "grid" ? styles.grid : ""}
        ${layout === "square" ? styles.square : styles.round} ${
          styles.extra_padding
        }`}
      >
        <Link className={styles.link} to={url}
        onClick={()=>{
          window.dataLayer.push({
            event: 'pt_global_click_link_banner_click',
            pagetype: '',
            source_page_url: window.location.href,
            previous_page_url: '',
            destination_page_url: url,
            login_status: '',
            user_id: '',
            page_url: window.location.href,
            banner_id: '',
            click_text: name || ""
          });
        }}
        >
          <Div height="200px" width="auto">
            <img
              data-src={image}
              src={`${image}?blur=30`}
              alt={name}
              style={{ width: "90%", height: "100%", margin: "0" }}
              loading="lazy"
            />
          </Div>
          {getDetails(component, name, style, data)}
        </Link>
      </Div>
    );
  }
  return (
    <Div
      className={`${styles.sliderItem}
    ${layoutStyle === "grid" ? styles.grid : ""}
    ${layout === "square" ? styles.square : styles.round} ${
        styles.extra_padding
      }`}
    >
      <Link className={styles.link} to={url}>
        <Div height="200px" width="auto">
          <img
            data-src={image}
            src={`${image}?blur=30`}
            alt={name}
            className={styles.curosalImg}
            style={{ width: "100%", height: "100%" }}
            loading="lazy"
          />
        </Div>
        {getDetails(component, name, style, data)}
      </Link>
    </Div>
  );
};

ShopbyCatItem.defaultProps = {
  layoutStyle: "slider",
  name: ""
};

ShopbyCatItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  layoutStyle: PropTypes.string
};

export default ShopbyCatItem;
