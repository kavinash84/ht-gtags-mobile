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

import Slider from './Slider';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate4({ data }) {
  const { headerTitle, mainTitle, description, banner, collection } = data;
  return (
    <Div>
      {headerTitle && (
        <Div bg="#F5F5F5" py="20">
          <Heading color="black" fontFamily="medium" fontSize="20px" ta="center" mb="0">
            {headerTitle}
          </Heading>
          <Flex justifyContent="center">
            <Div className={styles.horizontalSeperator} />
          </Flex>
        </Div>
      )}
      <Div>
        <Image src={banner} alt="chester-furniture" />
      </Div>

      <Div pl="33px" pr="33px" mt="15px">
        <Heading color="black" fontFamily="medium" fontSize="16px" ta="center" mb="0">
          {mainTitle}
        </Heading>
        <div className={styles.descriptionText} style={{ fontSize: '14px' }}>
          {description}
        </div>
      </Div>
      <Div>
        <Slider collection={collection} />
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
