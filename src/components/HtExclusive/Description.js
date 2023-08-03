import React from 'react';
import PropTypes from 'prop-types';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';

import BannerTop from '../../../static/HT-Exclusive/BannerM01.jpg';

function Description(props) {
  //   const { imgUrl } = props;
  return (
    <Div>
      <Div>
        <Row justifyContent="center">
          <Img src={BannerTop} alt="" />
        </Row>
      </Div>
      <Div>
        <Row>
          <Div bg="#252525" m="10%" pl="3em" pr="3rem">
            <Text fontSize="16px" fontWeight="bold" color="#FFFFFF" pr="40px" pl="40px" textAlign="center">
              Everyday, In Everything We Do, We Seek:
            </Text>
          </Div>
        </Row>
      </Div>
    </Div>
  );
}

Description.propTypes = {
  //   imgUrl: PropTypes.string.isRequired
};

export default Description;
