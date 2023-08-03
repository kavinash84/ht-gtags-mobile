import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const SquareCatItem = ({
  image, name, url, layout, layoutStyle
}) => (
  <Div
    className={`${styles.sliderItem}
    ${layoutStyle === 'grid' ? styles.grid : ''}
    ${layout === 'square' ? styles.square : styles.round}`}
  >
    <Link className={styles.link} to={url}>
      <img src={image} alt={name} />
      <div className={styles.content}>
        <h6 className={styles.title}>{name}</h6>
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
  layout: PropTypes.string.isRequired,
  layoutStyle: PropTypes.string
};

export default SquareCatItem;
