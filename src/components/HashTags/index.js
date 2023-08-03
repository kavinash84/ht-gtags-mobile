import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';
import Span from 'hometown-components/lib/Span';

const styles = require('./HashTags.scss');

const HashTags = ({ data }) => (
  <Div>
    <Container pr="0" pl="0">
      <Section p="3.5rem 20%" mt="1rem" mb="1.5rem" className={styles.hashTags} bg="hashTags">
        <Row>
          <Div>
            <Text ta="center" color="rgba(255, 255, 255, 0.75)" fontSize="1.8em" fontFamily="light" mb="0" mt="0">
              Shop by #hashtags
            </Text>
            <Text ta="center" color="rgba(255, 255, 255, 0.75)" fontSize="1em" fontFamily="light" mb="2rem" mt="0">
              Exploring products couldn’t be easier than this
            </Text>
          </Div>
        </Row>
        <Row>
          <Div ta="center">
            {data.map(hashtag => (
              <Link to={hashtag.url_key} key={hashtag.id}>
                <Span p="5px 10px" fontFamily="light" color="#ffefd1bd" fontSize="0.875rem" display="inline-block">
                  #{hashtag.name}
                </Span>
              </Link>
            ))}
          </Div>
        </Row>
      </Section>
    </Container>
  </Div>
);

HashTags.propTypes = {
  data: PropTypes.array.isRequired
};

export default HashTags;
