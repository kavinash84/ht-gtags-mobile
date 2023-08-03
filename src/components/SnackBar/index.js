import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';

const styles = require('./index.scss');

const SnackBar = ({
  title, showRibbon, children, ribbonClass, ...rest
}) => (
  <Section
    bg="reloadRibbion"
    className={`${ribbonClass} ${showRibbon ? '' : styles.hideRibbon}`}
    mb="0"
    p="0"
    {...rest}
  >
    <Div pt="4px" pb="4px">
      <Text mt="0" mb="0" ta="center" color="white" fontSize="14px" fontFamily="light" lh="2">
        {title}
        {children}
      </Text>
    </Div>
  </Section>
);

SnackBar.propTypes = {
  title: PropTypes.string.isRequired,
  showRibbon: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  ribbonClass: PropTypes.string.isRequired
};

SnackBar.defaultProps = {
  showRibbon: true
};

export default SnackBar;
