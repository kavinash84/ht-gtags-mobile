import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Span from 'hometown-components/lib/Span';
import Heading from 'hometown-components/lib/HeadingH3';
import Rating from 'hometown-components/lib/Rating';
import ImageShimmerMobile from 'hometown-components/lib/ImageShimmerMobile';
import Img from 'hometown-components/lib/Img';
import Theme from 'hometown-components/lib/Theme';
import { Link } from 'react-router-dom';

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
const ProductItem = ({
  image, name, url, discPrice, price, rating, reviewsCount, percentage, height
}) => (
  <Div className={styles.prodSliderItem} p="0">
    <Link className={styles.link} to={url}>
      <ImageShimmerMobile src={image} height={height}>
        {imageURL => <Img alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
      </ImageShimmerMobile>
      <div className={styles.content}>
        <Heading mb="5px" color={Theme.colors.text} fontFamily="medium" fontSize="0.9375em" ta="center">
          {name}
        </Heading>

        <Div mb="0px" ta="center">
          <Span mr="0.625rem" color={Theme.colors.text} fontSize="0.875em" fontFamily="medium">
            {' '}
            Rs.{discPrice || price}{' '}
          </Span>
          {discPrice && (
            <Span mr="0" fontSize="0.75em" fontFamily="medium">
              {' '}
              <s>Rs.{price}</s>
            </Span>
          )}
          {rating > 0 && (
            <Span ml="0.625rem">
              <Rating color={judgeColor(rating)} rating={parseFloat(rating).toFixed(1)}>
                ★ {rating}
              </Rating>
              <Span mr="0.625rem" fontSize="0.75rem" lh="1.7" va="text-top" color={Theme.colors.textExtraLight}>
                ({reviewsCount})
              </Span>
            </Span>
          )}
        </Div>
        <Div mb="0px" ta="center">
          {' '}
          {percentage && (
            <Span fontSize="0.75rem" fontFamily="medium">
              Savings
              <Span mr="0px" fontSize="0.75rem" border="none" fontFamily="medium" va="bottom">
                {' '}
                ({percentage}
                %)
              </Span>
            </Span>
          )}
        </Div>
      </div>
    </Link>
  </Div>
);

ProductItem.defaultProps = {
  image: '',
  name: '',
  percentage: '',
  rating: 0,
  price: '',
  discPrice: '',
  reviewsCount: 0,
  height: 0
};

ProductItem.propTypes = {
  url: PropTypes.string.isRequired,
  discPrice: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  reviewsCount: PropTypes.number,
  percentage: PropTypes.string,
  height: PropTypes.string
};

export default ProductItem;
