import React from 'react';
import PropTypes from 'prop-types';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';

const Title = ({
  title,
  subTitle,
  ta,
  fontSize = '1.125rem',
  color = 'rgba(0, 0, 0, 0.55)',
  mb = '0.75rem',
  fontWeight
}) => (
  <Div mb={mb} style={{ float: 'none' }}>
    <Text
      fontSize={fontSize}
      color={color}
      mt="0"
      lh="1.4"
      ta={ta}
      fontFamily="regular"
      mb={mb}
      ta={ta}
      fontWeight={fontWeight}
    >
      {title}
    </Text>
    {subTitle !== '' && (
      <Text fontSize="0.75rem" color="rgba(0, 0, 0, 0.6)" mt="3px" mb="0" ta="center" fontFamily="regular">
        {subTitle}
      </Text>
    )}
  </Div>
);

Title.defaultProps = {
  title: '',
  subTitle: '',
  ta: 'center'
};

Title.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  ta: PropTypes.string
};

export default Title;
