import React from 'react';
import PropTypes from 'prop-types';
// import Div from 'hometown-components-dev/lib/BoxHtV1';

import Div from 'hometown-components/lib/Div';

import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 2.2 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

function Slider({ collection, children }) {
  return (
    <Div>
      <Div p="15px">
        <SlickSlider settings={adjustSlides(12)}>
          {collection.length &&
            collection.map((slide, index) => (
              <Div key={String(index)}>
                {/* <Link to={slide.link}>
                  <Image src={slide.url} alt={`ht-exclusive-carousel-${index}`} />
                  <Text textAlign="center">{slide.name}</Text>
                </Link> */}
                {children}
              </Div>
            ))}
        </SlickSlider>
      </Div>
    </Div>
  );
}

Slider.propTypes = {
  collection: PropTypes.array,
  children: PropTypes.object.isRequired
};

Slider.defaultProps = {
  collection: []
};

export default Slider;
