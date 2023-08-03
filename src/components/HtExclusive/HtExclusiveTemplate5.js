/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
// import Div from 'hometown-components-dev/lib/BoxHtV1';
// import Flex from 'hometown-components-dev/lib/FlexHtV1';
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
  slidesToShow: length >= 3 ? 2 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
});

function HtExclusiveTemplate4({ data }) {
  const { headerTitle, collection } = data;
  return (
    <Div>
      <Div bg="#F5EEEE" py="20">
        <Heading color="black" ta="center" mb="0">
          {headerTitle}
        </Heading>
        <Flex justifyContent="center">
          <Div className={styles.horizontalSeperator} />
        </Flex>
        <Div>
          <Div pl="0px" pr="30px">
            <SlickSlider settings={adjustSlides(12)}>
              {collection.length &&
                collection.map((slide, index) => (
                  <Div key={String(index)} p="10px">
                    <Div className={styles.paymentOptions}>
                      <Div pt={'20px'} pb={'10px'}>
                        <Image width="110px" src={slide.url} alt="bank-option" />
                      </Div>
                      <Div>
                        <Text as="h2" fontSize="14px" fontWeight="bold" mt="0" mb="0">
                          {slide.title}
                        </Text>
                        <Text as="span" fontSize="12px" mt="0" mb="0">
                          {slide.desc}
                        </Text>
                      </Div>
                    </Div>
                  </Div>
                ))}
            </SlickSlider>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}
HtExclusiveTemplate4.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate4.defaultProps = {
  data: {
    mainTitle: '',
    subTitles: '',
    imageCollection: [],
    banner: ''
  }
};

export default HtExclusiveTemplate4;
