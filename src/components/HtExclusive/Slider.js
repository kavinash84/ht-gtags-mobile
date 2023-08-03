import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Div from 'hometown-components-dev/lib/BoxHtV1';
// import Image from 'hometown-components-dev/lib/ImageHtV1';
// import Text from 'hometown-components-dev/lib/TextHtV1';

import Div from 'hometown-components/lib/Div';
import Flex from 'hometown-components/lib/Row';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';

import SlickSlider from '../SlickSlider';

const arrowForward = require('../../../static/htexclusive/forward-arrow.svg');

const adjustSlides = length => ({
  slidesToShow: length >= 2 ? 1.5 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

function Slider({ collection }) {
  return (
    <Div>
      <Div pl="30px" pr="40px">
        <SlickSlider settings={adjustSlides(12)}>
          {collection.length &&
            collection.map((slide, index) => (
              <Div key={String(index)}>
                <Link to={slide.link}>
                  <Image src={slide.url} alt={`ht-exclusive-carousel-${index}`} />
                  <Text
                    ta="left"
                    fontSize="11px"
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}
                  >
                    {slide.name}
                    <img
                      style={{
                        display: 'inline',
                        // marginBottom: '-3px',
                        marginLeft: '-5px',
                        height: '10px',
                        width: '40px'
                      }}
                      src={arrowForward}
                      alt="Arrow"
                    />
                  </Text>
                </Link>
              </Div>
            ))}
        </SlickSlider>
      </Div>
    </Div>
  );
}

Slider.propTypes = {
  collection: PropTypes.array
};

Slider.defaultProps = {
  collection: []
};

export default Slider;
