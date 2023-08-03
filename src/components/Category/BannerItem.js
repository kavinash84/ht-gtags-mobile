import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Link } from 'react-router-dom';

const styles = require('./Slider.scss');

const SquareCatItem = ({ image, name, url }) => (
  <Div className={styles.bannerItem}>
    <Link className={styles.link} to={url}>
      <img src={image} alt={name} />
      {name !== '' && (
        <div className={styles.content}>
          <h1 className={styles.title}>{name}</h1>
        </div>
      )}
    </Link>
  </Div>
);

SquareCatItem.defaultProps = {
  name: ''
};

SquareCatItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default SquareCatItem;
