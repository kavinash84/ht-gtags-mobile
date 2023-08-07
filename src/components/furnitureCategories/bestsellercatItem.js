import React from "react";
import PropTypes from "prop-types";
import Div from "hometown-components/lib/Div";
import Text from "hometown-components/lib/Text";
import { Link } from "react-router-dom";

const styles = require("./Slider.scss");

const BestsellerCatItem = ({
  image,
  name,
  url,
  layout,
  layoutStyle,
  price,
  mrp,
  off,
  code
}) => (
  <Div
    className={`${styles.sliderItem}
    ${layoutStyle === "grid" ? styles.grid : ""}
    ${layout === "square" ? styles.square : styles.round}`}
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
          className={styles.curosalImg}
          style={{ width: "100%", height: "auto" }}
          loading="lazy"
        />
      </Div>
      <Div className={styles.content3}>
        <Text className={styles.name}>
          {name.split("").length > 50 ? `${name.slice(0, 50)}....` : name}
        </Text>
        <Text className={styles.byHT}>By Hometown</Text>
        <Text className={styles.price}>
          {price}
          <span className={styles.mrp}>{mrp}</span>
        </Text>
        <Text className={styles.off}>
          Get Extra{off} off | <spn className={styles.code}>Use {code}</spn>
        </Text>
      </Div>
    </Link>
  </Div>
);

BestsellerCatItem.defaultProps = {
  layoutStyle: "slider",
  name: ""
};

BestsellerCatItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  layoutStyle: PropTypes.string
};

export default BestsellerCatItem;
