import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';

const Grievance = () => (
  <Div type="block">
    <Section mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="400">
            GRIEVANCE
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section
      pt="1.25rem"
      pb="1.25rem"
      mb="0"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
      display="flex"
      of="auto"
      p="0"
    >
      <Container type="container" pr="1.5rem" pl="1.5rem">
        <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="1rem">
          <Div>
            <Heading mt="0" color="primary" fontSize="0.875rem" fontWeight="600" ellipsis={false}>
              GRIEVANCE
            </Heading>
            <Text color="#8d8d8d" fontSize="0.75rem" mb="1.5rem">
              At HomeTowm, it is our endeavor to provide the best in customer service. It is our priority to positively
              respond and address any concerns you may have at the earliest. To ensure this, our team is continuously
              working to provide you the best of support though a few concern/issues that are complex in nature may
              require additional time to resolve. Concerns not Addressed?
            </Text>
            <Text color="#8d8d8d" fontSize="0.75rem" mb="0">
              You may write to the Head of Customer Support at cshead@hometown.in if the ticket raised remains
              unattended / not responded for 72hours. While writing, please do quote original date of raising the issue
              and allied resolution offered by our customer support team. Please allow 24-48 hours for a resolution. We
              value every communication sent and look forward to speedily resolve it.
            </Text>
          </Div>
        </Section>
      </Container>
    </Section>
  </Div>
);

export default Grievance;
