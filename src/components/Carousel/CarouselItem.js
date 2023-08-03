import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from 'utils/formatters';

const styles = require('./Slider.scss');

const CarouseItem = ({
  img,
  contentStatus,
  typeOfSlider,
  price,
  discountPrice,
  rating,
  ratingCount,
  name,
  title,
  url
}) => (
  <div className={typeOfSlider === 'productSlider' ? styles.prodSliderItem : typeOfSlider}>
    <a className={styles.link} href={url}>
      <img src={img} alt={title} />
      {contentStatus && (
        <div className={styles.content}>
          <p className={styles.title}>{name}</p>
          {typeOfSlider === 'productSlider' && (
            <div>
              <div className={`${styles.priceWrapper} taLeft`}>
                <span className={styles.discPrice}>Rs.{formatAmount(price)}</span>
                <span className={styles.price}>Rs.{formatAmount(price)}</span>
                <span className={styles.saving}>Discount ( {discountPrice}% )</span>
              </div>
              <div className={styles.rating}>
                {rating} ({ratingCount})
              </div>
            </div>
          )}
        </div>
      )}
    </a>
  </div>
);

CarouseItem.defaultProps = {
  title: '',
  name: '',
  url: '',
  img: '',
  price: '',
  discountPrice: '',
  rating: 0,
  ratingCount: 0
};

CarouseItem.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
  discountPrice: PropTypes.string,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  contentStatus: PropTypes.bool.isRequired,
  typeOfSlider: PropTypes.string.isRequired
};

export default CarouseItem;
