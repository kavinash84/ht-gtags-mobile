import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Div from 'hometown-components/lib/Div';
import ImageShimmerMobile from 'hometown-components/lib/ImageShimmerMobile';

const styles = require('./Slider.scss');

const SquareCatItem = ({
  image, name, url, layoutStyle
}) => (
  <Div
    className={`${styles.sliderItem}
    ${layoutStyle === 'grid' ? styles.grid : ''}
    ${styles.square}`}
  >
    <Link className={styles.link} to={url}>
      <LazyLoad height={173}>
        <ImageShimmerMobile src={image} height="173px">
          {imageURL => <img alt={name} src={imageURL} />}
        </ImageShimmerMobile>
      </LazyLoad>
      <div className={styles.content}>
        <p className={styles.title}>{name}</p>
      </div>
    </Link>
  </Div>
);

SquareCatItem.defaultProps = {
  layoutStyle: 'slider',
  name: ''
};

SquareCatItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  layoutStyle: PropTypes.string
};

export default SquareCatItem;
