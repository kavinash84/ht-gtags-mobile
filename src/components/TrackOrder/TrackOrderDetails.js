import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Span from 'hometown-components/lib/Span';
import { Label } from 'hometown-components/lib/Label';
import Heading from 'hometown-components/lib/Heading';
import Theme from 'hometown-components/lib/Theme';
import Img from 'hometown-components/lib/Img';

const styles = require('./TrackOrderDetails.scss');
const Step1Icon = require('../../../static/basket.png');
const Step2Icon = require('../../../static/checked.png');

const TrackOrderDetails = () => (
  <Div type="block">
    <Section mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="400">
            ORDER TRACKING
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
    >
      <Container type="container" pr="0.5rem" pl="0.5rem">
        <div className={styles.trackOrderModalWrapper}>
          <Row mr="0" ml="0" pl="0" pr="0">
            <Div className={styles.trackOrderStats} bg={Theme.colors.primary} pt="1rem" pb="1rem" p="1rem 1rem">
              <Div>
                <Label color="yellowDark" fontSize="0.875rem" fontWeight="600">
                  Shipped Via :
                  <Span mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </Span>
                </Label>
              </Div>
              <Div>
                <Label color="yellowDark" fontSize="0.875rem" fontWeight="600">
                  Status :
                  <Span mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </Span>
                </Label>
              </Div>
              <Div>
                <Label color="yellowDark" fontSize="0.875rem" fontWeight="600">
                  Expected Date :
                  <Span mt="-2px" ml="5px" va="baseline" color="#FFF">
                    xxxx
                  </Span>
                </Label>
              </Div>
            </Div>
          </Row>
          <Row mr="0" ml="0" mt="1.5rem" mb="1rem" pl="0" pr="0">
            <Div className={`${styles.processBlock} ${styles.completed}`}>
              <div className={styles.processImg}>
                <Img src={Step1Icon} alt="" m="auto" />
              </div>
              <Label color={Theme.colors.secondary} fontSize="1rem" fontWeight="medium" mt="0" mb="0">
                Ordered
              </Label>
            </Div>
            <Div className={`${styles.processBlock} ${styles.completed}`}>
              <div className={styles.processImg}>
                <Img src={Step1Icon} alt="" m="auto" />
              </div>
              <Label color={Theme.colors.secondary} fontSize="1rem" fontWeight="medium" mt="0" mb="0">
                In Transit
              </Label>
            </Div>
            <Div className={`${styles.processBlock}`}>
              <div className={styles.processImg}>
                <Img src={Step2Icon} alt="" m="auto" />
              </div>
              <Label color={Theme.colors.secondary} fontSize="1rem" fontWeight="medium" mt="0" mb="0">
                Pick Up
              </Label>
            </Div>
            <Div className={`${styles.processBlock}`}>
              <div className={styles.processImg}>
                <Img src={Step2Icon} alt="" m="auto" />
              </div>
              <Label color={Theme.colors.secondary} fontSize="1rem" fontWeight="medium" mt="0" mb="0">
                Delivered
              </Label>
            </Div>
          </Row>
        </div>
      </Container>
    </Section>
  </Div>
);

export default TrackOrderDetails;
