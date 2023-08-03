import React from 'react';
// import PropTypes from 'prop-types';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';

const arrowHomeScreen = require('../../../static/arrow-homescreen.svg');
const MoreIcon = require('../../../static/more-white.svg');

const AddToHomescreen = () => (
  <Div className="addToHomeModalWrapper" ta="left">
    <Img ml="auto" position="relative" top="12px" width="100px" height="100px" src={arrowHomeScreen} alt="" />
    <Heading fontSize="1rem" color="white" mb="0.625rem" mt="0">
      Add HomeTown to Homescreen
    </Heading>
    <Text color="white" mt="0" fontSize="0.875rem">
      Tap
      <Img
        position="relative"
        top="3px"
        display="inline-block"
        height="10px"
        src={MoreIcon}
        fontSize="1rem"
        alt=":"
      />{' '}
      to braing up your browser menu and <br />
      seelct 'Add to homescreen' to pin the <br />
      Hometown web app
    </Text>
    <Button mt="0.625rem" btnType="custom" color="textExtraLight" bg="white" p=".375rem 1.75rem">
      Got it
    </Button>
  </Div>
);

AddToHomescreen.propTypes = {
  // onclick: PropTypes.func.isRequired
};

export default AddToHomescreen;
