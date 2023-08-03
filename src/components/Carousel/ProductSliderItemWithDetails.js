import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from 'hometown-components/lib/HeadingH3';
import Div from 'hometown-components/lib/Div';
import Span from 'hometown-components/lib/Span';
import Rating from 'hometown-components/lib/Rating';
import Theme from 'hometown-components/lib/Theme';
import Img from 'hometown-components/lib/Img';
import ImageShimmerMobile from 'hometown-components/lib/ImageShimmerMobile';

const styles = require('./Slider.scss');

const judgeColor = rating => {
  if (!rating) {
    return '';
  }
  rating = parseInt(rating, 10);
  if (rating < 2) {
    return '#dc3545';
  }
  if (rating >= 2 && rating < 3) {
    return '#f5a623';
  }
  if (rating >= 3) {
    return '#28a745';
  }
};

const ProductSliderItem = ({
  image, price, discPrice, rating, name, url, percentage, height
}) => (
  <Div className={styles.prodSliderItem} p="0 5px">
    <Link className={styles.link} to={url}>
      <Div>
        <ImageShimmerMobile src={image} height={height}>
          {imageURL => <Img alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
        </ImageShimmerMobile>
        {rating > 0 && (
          <Span className={styles.ratingWithDetails} ml="0.625rem">
            <Rating color={judgeColor(rating)} rating={parseFloat(rating).toFixed(1)}>
              ★ {rating}
            </Rating>
          </Span>
        )}
      </Div>

      <Div className={styles.content}>
        <Heading mb="2px" color={Theme.colors.text} fontFamily="light" fontSize="0.75rem" ta="center" mt="0.3125rem">
          {name}
        </Heading>
        <Div mb="0px" ta="center">
          <Span mr="5px" color={Theme.colors.text} fontFamily="medium" fontSize="0.875rem">
            {' '}
            Rs.{discPrice || price}{' '}
          </Span>
          {discPrice && (
            <Span mr="0" fontFamily="regular" fontSize="0.75rem" color={Theme.colors.prodText}>
              {' '}
              <s>Rs.{price}</s>
            </Span>
          )}
        </Div>
        <Div mt="3px" mb="0px" ta="center">
          {' '}
          {percentage && (
            <Span fontSize="0.75rem" fontFamily="regular">
              Savings
              <Span mr="0px" fontSize="0.75rem" border="none" fontFamily="regular" va="initial">
                {' '}
                ({percentage}%)
              </Span>
            </Span>
          )}
        </Div>
      </Div>
    </Link>
  </Div>
);

ProductSliderItem.defaultProps = {
  name: '',
  url: '',
  image: '',
  price: '',
  discPrice: '',
  rating: 0,
  percentage: '',
  height: 0
};

ProductSliderItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  discPrice: PropTypes.string,
  rating: PropTypes.number,
  percentage: PropTypes.string,
  height: PropTypes.string
};

export default ProductSliderItem;
