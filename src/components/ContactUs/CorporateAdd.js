import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';

const mapIcon = require('../../../static/map-icon-primary.svg');

const CorporateAdd = () => (
  <Div type="block">
    <Section mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="400">
            REGISTERED OFFICE
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section
      pt="1.25rem"
      mb="0"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
      display="flex"
      height="calc(100vh - 92px)"
      of="auto"
      p="0"
    >
      <Container type="container" pr="1.5rem" pl="1.5rem">
        <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="0.625rem">
          <Div>
            <Heading mt="0" mb="0" color="primary" fontSize="1rem" fontWeight="600">
              <Img display="inline-block" va="bottom" mr="0.3125rem" src={mapIcon} alt="Address" width="22px" />
              REGISTERED <br /> AND CORPORATE OFFICE
            </Heading>
            <Text color="#8d8d8d" fontSize="0.875rem" mb="0" ml="0.3125rem" mt="0.625rem">
              Praxis Home Retail Limited (“PHRL”),
              <br />
              (f/k/a Praxis Home Retail Private Limited),
              <br />
              iThink Techno Campus,
              <br />
              Jolly Board Tower D, Ground Floor,
              <br />
              Kanjurmarg (East), Mumbai 400042
              <br />
              CIN - L52100MH2011PLC212866
            </Text>
          </Div>
        </Section>
      </Container>
    </Section>
  </Div>
);

export default CorporateAdd;
