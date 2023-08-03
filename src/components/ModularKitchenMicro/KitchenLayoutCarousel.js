import React from 'react';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';

const arrowForward = require('../../../static/newHomepage/newForwardArrow.svg');

function KitchenLayoutCarousel({ image, title, description, handleModal }) {
  return (
    <div>
      <Img data-src={image} src={`${image}?blur=30`} alt={title} />
      <Div pl="30px" pr="30px">
        <Heading fontSize="20px" color="#323F38" ta="center" mt="20px" fontFamily="regular">
          {title}
        </Heading>
        <Text color="#999999" fontSize="14px" mb="30px" ta="center" style={{ lineHeight: '20px', height: '120px' }}>
          {description}
        </Text>
        <a onClick={handleModal}>
          <Heading ta="center" fontSize="13px" fontFamily="regular" color="#323F38">
            SPEAK TO OUR EXPERTS
            <img
              style={{
                display: 'inline',
                marginLeft: '-8px',
                height: '10px',
                width: '40px'
              }}
              src={arrowForward}
              alt="Arrow"
            />
          </Heading>
        </a>
      </Div>
    </div>
  );
}

export default KitchenLayoutCarousel;
