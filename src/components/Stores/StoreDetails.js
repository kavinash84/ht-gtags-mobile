import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import { BASE_IMAGE_URL } from "helpers/Constants";

export default class StoreDetails extends Component {
  render() {
    const { store } = this.props;
    return (
      <Div type="block">
        <Section display="flex" pt="2.5rem" pb="2.5rem" mb="0" height="auto">
          <Container type="container" pr="0" pl="0">
            <Row display="block" mr="0" ml="0" mb="1.25rem  ">
              <Div col="12">
                <Img src={`${BASE_IMAGE_URL}/media/cms/extras/storedemoimg.jpg`} alt="Stores" width="100%" />
              </Div>
            </Row>
            <Row display="block" mr="0" ml="0">
              <Div col="12" mb="0.625rem">
                <Heading fontSize="0.875rem" mb="0.625rem" color="secondary">
                  STORE ADDRESS
                </Heading>
                <Text fontSize="0.75em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.address || null}
                </Text>
                <Text fontSize="0.75em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.city || null}, {store.state || null}, {store.pincode || null}
                </Text>
              </Div>
              <Div col="12" mb="0.625rem">
                <Heading fontSize="0.875rem" mb="0.625rem" color="secondary">
                  TIMING
                </Heading>
                <Text fontSize="0.75em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.timings || null}
                </Text>
              </Div>
              <Div col="12">
                <Heading fontSize="0.875rem" mb="0.625rem" color="secondary">
                  PHONE
                </Heading>
                <Text fontSize="0.75em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.phone || null}
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}
StoreDetails.defaultProps = {
  store: {}
};

StoreDetails.propTypes = {
  store: PropTypes.object
};
