import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';

const styles = require('./SliderHome.scss');

const BestsellerCatItem = ({ image, name, url, layout, layoutStyle, price, mrp, off, code }) => (
  <Div
    className={`${styles.sliderItem}
    ${layoutStyle === 'grid' ? styles.grid : ''}
    ${layout === 'square' ? styles.square : styles.round}`}
  >
    <Link className={styles.link} to={url}>
      <img style={{maxHeight:'138px'}} data-src={image} src={`${image}?blur=30`} alt={name} className={styles.curosalImg}/>
      <Div className={styles.content3}>
        <Text className={styles.name}>
        {name.split("").length > 45 ? `${name.slice(0, 45)}....` : name}
        </Text>
        <Text className={styles.byHT}>By Hometown</Text>
        {price !== mrp ? (
          <Text className={styles.price}>
          {price}
          <span className={styles.mrp}>{mrp}</span>
          {off &&
          <span className={styles.offer}>{off} Off</span>
          }
        </Text>
        ):(
          <Text className={styles.price}>
          {price}
          </Text>
        )}
        
        {code ?(
        <Text className={styles.off}>
          Get Extra{off} off | <span className={styles.code}>Use {code}</span>
        </Text>
        ) : (
          <div style={{height:'18px'}}></div>
        )
        }
      </Div>
    </Link>
  </Div>
);

BestsellerCatItem.defaultProps = {
  layoutStyle: 'slider',
  name: ''
};

BestsellerCatItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  layoutStyle: PropTypes.string
};

export default BestsellerCatItem;
