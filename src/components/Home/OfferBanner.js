import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';

const OfferBanner = ({ image, url, target }) => (
  <Section mt="0.625rem" mb="2rem" p="0">
    <Container pr="0" pl="0">
      <Row ml="0" mr="0">
        <Div>
          {target ? (
            <a href={url} target={target} rel="noopener noreferrer">
              <Img src={image} alt="" />
            </a>
          ) : (
            <Link to={url}>
              <Img src={image} alt="" />
            </Link>
          )}
        </Div>
      </Row>
    </Container>
  </Section>
);

OfferBanner.defaultProps = {
  image: '',
  url: '',
  target: ''
};

OfferBanner.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string
};

export default OfferBanner;
