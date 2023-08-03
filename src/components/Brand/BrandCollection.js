import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from 'hometown-components/lib/Img';
import Box from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
// import Col from 'hometown-components/lib/ColHtV1';
import Text from 'hometown-components/lib/Text';

import styles from './lauraAshley.scss';

const BrandCard = ({
  imgUrl, title, content, odd, url
}) => (
  <Link to={url} target="_blank">
    <Row className={styles.CollectionRow} my={10}>
      <Box pl={0} pr={0}>
        <Box className={styles.CollectionCard}>
          <Image width="100%" src={imgUrl} alt="Card image cap" />
        </Box>
      </Box>
      <Box>
        <Box className={styles.CollectionCard}>
          <Text style={{ textAlign: 'center' }} fontSize="2rem" mb={10} color="#a4b9c8">
            {content}
          </Text>

          <Text style={{ textAlign: 'center' }} fontSize="1rem" pl={10} pr={10} lineHeight={1.2} letterSpacing="0.1em">
            {title}
          </Text>
          <Text fontSize="1.3rem" mt={20} style={{ textDecoration: 'underline', textAlign: 'center' }}>
            SHOP {content.toUpperCase()}
          </Text>
        </Box>
      </Box>
    </Row>
  </Link>
);

const BrandCollection = ({ CollectionData }) => (
  <Box>
    <Box className={styles.CollectionSteps}>
      <Box className="container">
        <Box className="body">
          {CollectionData.map((item, index) => (
            <BrandCard
              key={String(index)}
              content={item.content}
              title={item.title}
              imgUrl={item.imgUrl}
              odd={index % 2 !== 0}
              url={item.url}
            />
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

BrandCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  odd: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};
BrandCollection.propTypes = {
  CollectionData: PropTypes.array.isRequired
};

export default BrandCollection;
