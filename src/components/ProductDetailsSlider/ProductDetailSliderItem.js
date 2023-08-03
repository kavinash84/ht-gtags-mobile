import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageShimmerMobile from 'hometown-components/lib/ImageShimmerMobile';
import Img from 'hometown-components/lib/Img';

// const styles = require('./ProductDetailSliderItem.scss');

// const ProductDetailSliderItem = ({ name, img }) => (
//   <div className={styles.pdSliderItem} key={img} heightXs={viewPostWidth}>
//     <ImageShimmerMobile src={img} height="355px">
//       {imageURL => <Img alt={name} src={imageURL} m="auto" width="100%" />}
//     </ImageShimmerMobile>
//   </div>
// );

class ProductDetailSliderItem extends Component {
  constructor(props) {
    super(props);
    this.state = { width: '355px' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }
  render() {
    const { name, img } = this.props;
    const styles = require('./ProductDetailSliderItem.scss');
    return (
      <div className={styles.pdSliderItem} key={img}>
        <ImageShimmerMobile src={img} height={`${this.state.width - 20}px`}>
          {imageURL => <Img alt={name} data-src={imageURL} src={`${imageURL}?blur=30`} m="auto" width="100%" />}
        </ImageShimmerMobile>
      </div>
    );
  }
}

ProductDetailSliderItem.defaultProps = {
  name: '',
  img: ''
};

ProductDetailSliderItem.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string
};

export default ProductDetailSliderItem;
