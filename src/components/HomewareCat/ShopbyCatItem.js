import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';

const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');
const styles = require('./SliderHome.scss');

const getDetails = (component, name, style, data) => {
  switch (component) {
    case 4:
      return (
        <Div className={styles.content1}>
          <Text className={styles.name}>  {name.split("").length > 20 ? `${name.slice(0, 20)}....` : name}</Text>
          <Text className={styles.name}>
            <span style={{ color: data.price ? '' : 'white' }}>Starting</span> {data.price}
          </Text>
          <Text className={styles.shopnow}>SHOP NOW</Text>
        </Div>
      );
      break;
    case 10:
      return (
        <Div className={styles.content2}>
          <Text className={styles.name} mt={0}>
          {name.split("").length > 60 ? `${name.slice(0, 60)}....` : name}
          </Text>
        </Div>
      );
      break;
    default:
      return (
        <Div className={styles.content}>
          <div className={styles.title} style={style}>
            {name}
          </div>
        </Div>
      );
  }
};

const ShopbyCatItem = ({ image, name, url, layout, layoutStyle, style, component, data }) => {
  if (component === 5) {
    return (
      <Div
        className={`${styles.sliderItem}
      ${layoutStyle === 'grid' ? styles.grid : ''}
      ${layout === 'square' ? styles.square : styles.round} ${component === 5 ? styles.shadowBox : ''}`}
      >
        <div className={styles.shadowdBox}>
          <Link className={styles.link} to={url}>
            <img data-src={image} src={`${image}?blur=30`} alt={name} className={styles.curosalImg} />
            {getDetails(component, name, style, data)}
          </Link>
        </div>
      </Div>
    );
  }
  return (
    <Div
      className={`${styles.sliderItem}
    ${layoutStyle === 'grid' ? styles.grid : ''}
    ${layout === 'square' ? styles.square : styles.round} ${styles.extra_padding}`}
    >
      <Link className={styles.link} to={url}>
        <img data-src={image} src={`${image}?blur=30`} style={{maxHeight:'260px'}} alt={name} className={styles.curosalImg} />
        {getDetails(component, name, style, data)}
      </Link>
    </Div>
  );
};

ShopbyCatItem.defaultProps = {
  layoutStyle: 'slider',
  name: ''
};

ShopbyCatItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  layoutStyle: PropTypes.string
};

export default ShopbyCatItem;
