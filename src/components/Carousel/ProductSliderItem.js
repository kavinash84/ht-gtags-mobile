import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from 'hometown-components/lib/HeadingH3';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
import ImageShimmerMobile from 'hometown-components/lib/ImageShimmerMobile';

const styles = require('./Slider.scss');

const ProductSliderItem = ({
  image, name, url, height, percentage
}) => (
  <Div className={styles.prodSliderItemWithOutDetails} p="0 5px">
    <Link className={styles.link} to={url}>
      <ImageShimmerMobile src={image} height={height}>
        {imageURL => <Img alt={name} src={imageURL} width="100%" className={styles.prodImage} />}
      </ImageShimmerMobile>
      <Div className={styles.content}>
        <Heading color="white" fontFamily="regular" fontSize="0.75em" ta="center" pb="0" fontWeight="300">
          {name}
        </Heading>
      </Div>
      {percentage && percentage !== '' && (
        <Span fontSize="9px" fontFamily="regular" color="#FFF" p="5px 4px" className={styles.priceOff}>
          {percentage}% OFF
        </Span>
      )}
    </Link>
  </Div>
);

ProductSliderItem.defaultProps = {
  name: '',
  url: '',
  image: '',
  percentage: '',
  height: 0
};

ProductSliderItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.string,
  percentage: PropTypes.string
};

export default ProductSliderItem;
