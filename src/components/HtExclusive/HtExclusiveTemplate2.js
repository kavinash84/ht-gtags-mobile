/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Div from 'hometown-components/lib/Div';
import Flex from 'hometown-components/lib/Row';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import HeadingH6 from 'hometown-components/lib/HeadingH6';

import Arrow from '../../../static/htexclusive/forward-arrow.svg';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate2({ data }) {
  const { mainTitle, subTitle, banner, imageCollection, link } = data;
  return (
    <Div>
      <Div bg="#F5F5F5" pt="10px" pb="10px">
        <h2 className={styles.templateTitle}>{mainTitle}</h2>
        <Link to={link}>
          <Flex justifyContent="center" alignItems="center">
            <Text mt="0px" mb="0px" className={styles.templateSubtitle}>
              {subTitle}
            </Text>
            <Image src={Arrow} ml="5px" height="10px" width="20px" />
          </Flex>
        </Link>
      </Div>
      <Div>
        <Image src={banner} alt="chester-furniture" />
      </Div>

      <Div>
        <Flex flexWrap="wrap" p="30px 30px">
          {imageCollection.map(arr => (
            <Div col="6" pb="20px">
              <Link to={arr.link} cursor="pointer">
                <Flex justifyContent="center" mr="0px" ml="0px">
                  <Image width="150px" height="150px" src={arr.image} alt={arr.alt} />
                </Flex>
                <Div py="10px">
                  <Text fontSize="13px" style={{ fontWeight: 'bold' }} ta="center">
                    {arr.title}
                  </Text>
                </Div>
              </Link>
            </Div>
          ))}
        </Flex>
      </Div>
    </Div>
  );
}
HtExclusiveTemplate2.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate2.defaultProps = {
  data: {
    mainTitle: '',
    subTitles: '',
    imageCollection: [],
    banner: ''
  }
};

export default HtExclusiveTemplate2;
