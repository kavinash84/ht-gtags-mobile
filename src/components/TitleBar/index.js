import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'hometown-components/lib/Heading';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import { Link } from 'react-router-dom';

const styles = require('./TitleBar.scss');

const TitleBar = ({ title, productCount }) => (
  <Section mb="0.625rem" p="1rem 1.25rem" bg="bg" mt="5px">
    <Container type="container" pr="0" pl="0">
      <Row display="block" mr="0" ml="0" mb="7px">
        <Div col="9">
          <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
            <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
              <Link itemProp="item" to="/">
                <span itemProp="name">Home</span>
                <meta itemProp="position" content="1" />
              </Link>
            </li>
            <li itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
              <Link itemProp="item" to="/">
                <span itemProp="name">{title}</span>
                <meta itemProp="position" content="2" />
              </Link>
            </li>
          </ul>
        </Div>
      </Row>
      <Row display="block" mr="0" ml="0" mb="0">
        <Heading fontSize="1.125rem" color="text" mt="0" mb="0" pb="2px" fontFamily="regular">
          {title} {productCount && `(${productCount})`}
        </Heading>
      </Row>
    </Container>
  </Section>
);

TitleBar.defaultProps = {
  title: '',
  productCount: ''
};

TitleBar.propTypes = {
  title: PropTypes.string,
  productCount: PropTypes.string
};

export default TitleBar;
