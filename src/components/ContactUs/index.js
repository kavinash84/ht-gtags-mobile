import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';

const phoneIcon = require('../../../static/phone-icon-primary.svg');
const mailIcon = require('../../../static/email-primary.svg');
const styles = require('./ContactUs.scss');

const ContactUs = () => (
  <Div type="block">
    <Section mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="400">
            Help Center
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
        <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="1rem">
          <Div>
            <Heading mt="0" color="textDark" fontSize="0.875rem" fontWeight="600">
              HOMETOWN CARE
            </Heading>
            <Text color="#8d8d8d" fontSize="0.75rem" mb="0">
              We would love to hear from you! Reach out to us through any of the modes below, and we shall respond at
              the earliest.
            </Text>
          </Div>
        </Section>
        <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="0.625rem">
          <Div>
            <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontWeight="500">
              <Img display="inline-block" va="bottom" mr="0.3125rem" src={phoneIcon} alt="Phone" width="22px" />
              Call Us
            </Heading>
            <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.3125rem">
              TollFree – 08069252525 <br />
              10.00 a.m. to 8.00 p.m., 365days
            </Text>
          </Div>
        </Section>
        <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="0.625rem">
          <Div>
            <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontWeight="500">
              <Img display="inline-block" va="bottom" mr="0.3125rem" src={mailIcon} alt="Phone" width="22px" />
              E-mail Us
            </Heading>
            <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.3125rem">
              <a href="mailto:Care@hometown.in">Care@hometown.in</a> <br />
              We shall respond in 24working hours.
            </Text>
          </Div>
        </Section>
        {/* <Link to="/service-request" className="text-primary">
          <Section
            boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)"
            bg="white"
            display="block"
            height="50px"
            mb="0.625rem"
            mr="-1.5rem"
            ml="-1.5rem"
            className={styles.contactusLinkList}
          >
            <Div pl="0.75rem" pr="0.75rem">
              RAISE A SERVICE REQUEST
              <Span float="right" color="#757575" fontSize="1.25rem">
                ❯
              </Span>
            </Div>
          </Section>
        </Link> */}
        {/* <Link to="/feedback" className="text-primary">
          <Section
            boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)"
            bg="white"
            display="block"
            height="50px"
            mb="0.625rem"
            mr="-1.5rem"
            ml="-1.5rem"
            className={styles.contactusLinkList}
          >
            <Div pl="0.75rem" pr="0.75rem">
              FEEDBACK
              <Span float="right" color="#757575" fontSize="1.25rem">
                ❯
              </Span>
            </Div>
          </Section>
        </Link> */}
        <Link to="/grievance" className="text-primary">
          <Section
            boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)"
            bg="white"
            display="block"
            height="50px"
            mb="0.625rem"
            mr="-1.5rem"
            ml="-1.5rem"
            className={styles.contactusLinkList}
          >
            <Div pl="0.75rem" pr="0.75rem">
              GRIEVANCE
              <Span float="right" color="#757575" fontSize="1.25rem">
                ❯
              </Span>
            </Div>
          </Section>
        </Link>
        <Section
          boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)"
          bg="white"
          display="block"
          height="50px"
          mb="0.625rem"
          mr="-1.5rem"
          ml="-1.5rem"
          className={styles.contactusLinkList}
        >
          <Div pl="0.75rem" pr="0.75rem">
            <Link to="/corporate-address" className="text-primary">
              REGISTERED OFFICE
              <Span float="right" color="#757575" fontSize="1.25rem">
                ❯
              </Span>
            </Link>
          </Div>
        </Section>
      </Container>
    </Section>
  </Div>
);

export default ContactUs;
