import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import ReactStars from 'react-stars';

import './CategoryCarousel.css';

const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');

class CategoryItem extends React.Component {
  render() {
    const {
      image,
      name,
      url,
      discount,
      offerPrice,
      maxPrice,
      rating,
      coupon,
      couponSticker,
      subHeading,
      description
    } = this.props;
    console.log('vipin', this.props);
    return (
      <Box style={{ position: 'relative' }}>
        {image ? (
          <div style={{ position: 'relative', marginBottom: '25px' }}>
            <Image data-src={image} src={`${image}?blur=30`} alt={name} height="210px" width="100%" />
            {coupon && <div className="coupon">{coupon}</div>}
            {couponSticker && <div className="couponSticker">{couponSticker}</div>}
          </div>
        ) : null}
        {subHeading ? (
          <Text ta="left" style={{ fontWeight: 'bold' }} fontSize="16px" mt={[10, 10, 16]}>
            {subHeading}
          </Text>
        ) : null}
        {description ? (
          <Text
            ta="left"
            mt={[10, 10, 16]}
            lineHeight="1.5rem"
            style={{ color: '#383838', letterSpacing: '1px', height: '150px' }}
            fontWeight="bold"
            fontSize="14px"
          >
            {description}
          </Text>
        ) : null}
        {discount ? (
          <Text textAlign="center" variant="catSliderDiscount" mt={16}>
            {discount}
          </Text>
        ) : null}
        {name ? (
          <Text textAlign="center" sx={{ textTransform: 'uppercase', color: 'black' }} fontSize="0.7rem" mt={12} mb={3}>
            {`${name.slice(0, 20)}..`}
          </Text>
        ) : null}
        {maxPrice && offerPrice ? (
          <div>
            <p
              style={{
                fontSize: '0.7rem',
                textDecoration: 'line-through',
                textAlign: 'center',
                lineHeight: '1rem'
              }}
            >
              MRP: {maxPrice}
            </p>
            <p
              style={{
                fontSize: '0.8rem',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              OfferPrice: {offerPrice}
            </p>
          </div>
        ) : null}
        {rating ? (
          <div className="starContainer">
            <ReactStars classNames="reactStars" count={5} size={16} value={rating} half={false} color2="#f15a22" />
            <label style={{ fontSize: '0.8rem', paddingTop: '2px' }}>({rating})</label>
          </div>
        ) : null}
        {url ? (
          <Link
            to={url}
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              display: ' inline-block'
            }}
            onClick={() => {
              sessionStorage.setItem('ShopByRoomscroll', window.pageYOffset);

              window.dataLayer.push({
                event: 'pt_global_click_link_banner_click',
                pagetype: '',
                source_page_url: window.location.href,
                previous_page_url: '',
                destination_page_url: url,
                login_status: '',
                user_id: '',
                page_url: window.location.href,
                banner_id: '',
                click_text: subHeading
              });
            }}
          >
            EXPLORE
            <img
              style={{
                display: 'inline',
                marginBottom: '0px',
                marginLeft: '-8px',
                height: '10px',
                width: '40px'
              }}
              src={arrowForward}
              alt="Arrow"
            />
          </Link>
        ) : null}
      </Box>
    );
  }
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('ShopByRoomscroll');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem('ShopByRoomscroll');
      }, 2000);
    }
  };
}
CategoryItem.defaultProps = {
  image: '',
  name: '',
  url: '',
  discount: '',
  offerPrice: '',
  maxPrice: '',
  rating: 0,
  coupon: '',
  couponSticker: '',
  subHeading: '',
  description: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  discount: PropTypes.string,
  offerPrice: PropTypes.string,
  maxPrice: PropTypes.string,
  rating: PropTypes.number,
  coupon: PropTypes.string,
  couponSticker: PropTypes.string,
  subHeading: PropTypes.string,
  description: PropTypes.string
};
export default CategoryItem;
