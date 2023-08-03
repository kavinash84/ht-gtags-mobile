import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
// import Img from 'hometown-components/lib/Img';
// import ImageShimmer from 'hometown-components/lib/ImageShimmer';
// import { formatAmount } from 'utils/formatters';
// import { getImageURL } from 'utils/helper';

const styles = require('./MyCases.scss');

const CaseBlock = ({ item, getMapping }) => (
  <Div className={styles.myOrdersWrapper}>
    <Row type="block" m="0" mb="1rem">
      <Div col="6">
        <Heading fontSize="1rem" color="textDark" mb="0px" mt="0px" fontFamily="regular">
          CASE No. {item.caseNumber || 'NA'}
        </Heading>
      </Div>
      <Div col="6">
        <Heading fontSize="1rem" color="textDark" mb="0px" mt="0px" fontFamily="regular">
          STATUS. {item.status || 'NA'}
        </Heading>
      </Div>
    </Row>
    <Row type="block" m="0" mb="0.5rem">
      <Div col="12">
        <Text mt="0" mb="0.3125rem" fontSize="0.875rem" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
          Created Date
        </Text>
        <Text mt="0" mb="0.3125rem" fontSize="0.8125rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
          {item.CreatedDate || ''}
        </Text>
      </Div>
      <Div col="6">
        <Text mt="0" mb="0.3125rem" fontSize="0.875rem" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
          SUBJECT
        </Text>
        <Text mt="0" mb="0.3125rem" fontSize="0.8125rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
          {item.subject || ''}
        </Text>
      </Div>
      <Div col="6">
        <Text mt="0" mb="0.3125rem" fontSize="0.875rem" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
          TYPE
        </Text>
        <Text mt="0" mb="0.3125rem" fontSize="0.8125rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
          {item.type || ''}
        </Text>
      </Div>
      <Div col="6">
        <Text mt="0" mb="0.3125rem" fontSize="0.875rem" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
          CATEGORY
        </Text>
        <Text mt="0" mb="0.3125rem" fontSize="0.8125rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
          {getMapping(item.category, item.subcategory, 'cat')}
        </Text>
      </Div>
      <Div col="6">
        <Text mt="0" mb="0.3125rem" fontSize="0.875rem" color="rgba(0, 0, 0, 0.7)" fontFamily="regular">
          SUBCATEGORY
        </Text>
        <Text mt="0" mb="0.3125rem" fontSize="0.8125rem" color="rgba(0, 0, 0, 0.6)" fontFamily="regular">
          {getMapping(item.category, item.subcategory, 'subcat')}
        </Text>
      </Div>
    </Row>
  </Div>
);

CaseBlock.propTypes = {
  item: PropTypes.object.isRequired,
  getMapping: PropTypes.func.isRequired
};
export default CaseBlock;
