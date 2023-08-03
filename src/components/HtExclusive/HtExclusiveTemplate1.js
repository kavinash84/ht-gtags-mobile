/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Flex from 'hometown-components/lib/Row';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

import Heading from 'hometown-components/lib/Heading';

import Separator from '../../../static/htexclusive/separator.svg';
import Arrow from '../../../static/htexclusive/forward-arrow.svg';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate1({ data }) {
  const { mainTitle, subTitles, description, banner, headerTitle, headerSubtitle, headerLink } = data;
  return (
    <Div>
      {headerTitle && headerSubtitle && (
        <Div bg="#F5F5F5" pt="10px" pb="10px">
          <h2 className={styles.templateTitle}>{mainTitle}</h2>
          <Link to={headerLink}>
            <Flex justifyContent="center" alignItems="center">
              <Text mt="0" mb="0" className={styles.templateSubtitle}>
                {headerSubtitle}
              </Text>
              <Image src={Arrow} ml="5px" height="10px" width="20px" />
            </Flex>
          </Link>
        </Div>
      )}
      <Div>
        <Image src={banner} alt="chester-furniture" />
      </Div>

      <Div className={styles.desContainer}>
        <Flex justifyContent="center">
          <Div bg="#252525" style={{ width: '80%' }}>
            <Div p="20px 20%">
              <h2 className={styles.descriptionTitle}>{mainTitle}</h2>
            </Div>
            <Flex pb="25px" px="1.5rem" justifyContent="space-between">
              <Div col="3" px="0" py="0" textAlign="center">
                <h2 className={styles.subTitlesBold}>{subTitles[0].boldText}</h2>
                <span className={styles.subTitlesLight}>{subTitles[0].normalText}</span>
              </Div>
              <Flex>
                <Image src={Separator} alt="seperator" />
              </Flex>
              <Div col="3" px="0" py="0">
                <h2 className={styles.subTitlesBold}>{subTitles[1].boldText}</h2>
                <span className={styles.subTitlesLight}>{subTitles[1].normalText}</span>
              </Div>
              <Flex>
                <Image src={Separator} alt="seperator" />
              </Flex>
              <Div col="3" px="0" py="0">
                <h2 className={styles.subTitlesBold}>{subTitles[2].boldText}</h2>
                <span className={styles.subTitlesLight}>{subTitles[2].normalText}</span>
              </Div>
            </Flex>
          </Div>
        </Flex>
        <Div pl="33px" pr="33px">
          <div className={styles.descriptionText}>{description}</div>
        </Div>
      </Div>
    </Div>
  );
}
HtExclusiveTemplate1.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate1.defaultProps = {
  data: {
    mainTitle: '',
    subTitles: [],
    description: '',
    banner: '',
    headerSubtitle: '',
    headerTitle: ''
  }
};

export default HtExclusiveTemplate1;
