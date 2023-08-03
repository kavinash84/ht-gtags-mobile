/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Div from 'hometown-components-dev/lib/BoxHtV1';
// import Image from 'hometown-components-dev/lib/ImageHtV1';
// import Text from 'hometown-components-dev/lib/TextHtV1';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';

import Div from 'hometown-components/lib/Div';
import Flex from 'hometown-components/lib/Row';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import SlickSlider from '../SlickSlider';

import Slider from './Slider-copy';

const styles = require('./HtExclusive.scss');

const adjustSlides = length => ({
  slidesToShow: length >= 3 ? 1.5 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

function HtExclusiveTemplate3({ data }) {
  const { mainTitle, description, banner, collection } = data;
  return (
    <Div>
      <Div>
        <Image className={styles.avatar} src={banner} alt="chester-furniture" />
      </Div>

      <Div pl="8%" pr="8%">
        <Heading color="black" fontFamily="medium" fontSize="16px" ta="center" mb="0px">
          {mainTitle}
        </Heading>
        <div className={styles.descriptionText} style={{ fontSize: '14px' }}>
          {description}
        </div>
      </Div>

      <Div pl="5px" pr="30px">
        <SlickSlider settings={adjustSlides(12)}>
          {collection.length &&
            collection.map((slide, index) => (
              <Div key={String(index)} p="20px">
                <Link to={slide.link}>
                  <Image src={slide.url} alt={`ht-exclusive-carousel-${index}`} />
                  <Text ta="center">{slide.name}</Text>
                </Link>
              </Div>
            ))}
        </SlickSlider>
      </Div>
    </Div>
  );
}
HtExclusiveTemplate3.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate3.defaultProps = {
  data: {
    mainTitle: '',
    description: '',
    collection: [],
    banner: ''
  }
};

export default HtExclusiveTemplate3;
