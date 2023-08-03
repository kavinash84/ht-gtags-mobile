import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import { formatAmount } from 'utils/formatters';

import './CategoryCarousel.css';

const ParentsPickItem = ({
  image,
  name,
  brand,
  url,
  delivery,
  id,
  specialPrice,
}) => {

  return (
    <Box p="10px" bg="white" style={{ position: 'relative', borderRadius: '5px', height: 'auto', boxShadow: "0px 5px 15px #00000029" }}>
      {id === 2 ? <Box bg="#F7F0F0" height="100px" m="-12px" mb="-100px" style={{ width: '115%' }} /> : null}

      {url ? (
        <Link to={url}>

          {/* Product Image */}
          {image ? (
            <div style={{ position: 'relative' }}>
              <Image data-src={image} src={`${image}?blur=30`} alt={name} height="auto" width="100%" m="auto" style={{ border: '2px solid #FAF4F2' }} />
              {/* {id === 1 ? <div className="coupon">Ends Today</div> : null}
              {id === 2 && coupon ? <div className="coupon">Ends on {couponEndDate}</div> : null} */}
            </div>
          ) : null}


          {/* Product Name */}
          {name ? (
            <Text
              ta="left"
              fontSize="12px"
              mt="12px"
              mb="0"
              lineHeight="1.2rem"
              style={{ fontWeight: 'bold', color: '#222222', height: '40px' }}
            >
              {name.split('').length > 50 ? `${name.slice(0, 50)}....` : name}
            </Text>
          ) : null}

          {/* Product Brand */}
          {brand ? (
            <Text
              ta="left"
              fontSize="12px"
              mt="0px"
              mb="0"
              lineHeight="1.3rem"
              style={{
                fontWeight: 'bold',
                color: 'gray'
              }}
            >
              By {brand.split('').length > 50 ? `${brand.slice(0, 50)}....` : brand}
            </Text>
          ) : null}

          {/* Product Price */}
          <div>
            <p className="mrpCsp">
              <span className="cspMobile">Price: ₹{formatAmount(specialPrice)}</span>
            </p>
          </div>

          {/* Product Delivery */}
          {delivery ? (
            <Text
              ta="left"
              fontSize="11px"
              style={{
                fontWeight: 'bold',
                color: 'gray'
              }}
              lineHeight="1.3rem"
            >
              {delivery}
            </Text>
          ) : null}
        </Link>
      ) : null}
    </Box>
  );
};
ParentsPickItem.defaultProps = {
  image: '',
  name: '',
  url: '',
  coupon: '',
  id: 0,
  toDate: '',
  specialPrice: 0,
  percentage: 0,
  fixedValue: 0,
  off: 0
};

ParentsPickItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  coupon: PropTypes.string,
  id: PropTypes.number,
  toDate: PropTypes.string,
  specialPrice: PropTypes.any,
  percentage: PropTypes.any,
  fixedValue: PropTypes.number,
  off: PropTypes.number
};

export default ParentsPickItem;
