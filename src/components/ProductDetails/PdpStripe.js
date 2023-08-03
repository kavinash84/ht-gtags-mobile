import React from 'react';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Text from 'hometown-components/lib/Text';

const styles = require('./PdpStripe.scss');

const Warranty = require('../../../static/pdp-icons/36-months-warranty.png');
const Emi = require('../../../static/pdp-icons/EMI-icon.png');
const Safe = require('../../../static/pdp-icons/Free-&-Safe-delivery-icon.png');
const Noquestion = require('../../../static/pdp-icons/No-questions-asked-returns.png');
const ServiceCamp = require('../../../static/pdp-icons/service-camp-icon.png');
const freeinstallation = require('../../../static/pdp-icons/free-installation.png');

const Stripes = ({
  emi,
  isEmiAvailable,
  warrantyPeriod,
  fkCatalogSupplier,
  brand,
  freeVisit,
  freeInstallation,
  children,
  isFurniture
}) => {
  const isFurnitureCategory = fkCatalogSupplier === '38';
  const noQuestionsAsked = isFurnitureCategory && brand === 'HomeTown';

  return (
    <Div>
      {/* <div className={styles.dots} /> */}
      <Container className={styles.useflex}>
        {isEmiAvailable ? (
          <Div col="3">
            <Img src={Emi} height="25px" width="auto" m="auto" />
            <Text fontSize="9px" mt="0" ta="center" maxWidth="80px">
              EMI from ₹{emi} {children}
            </Text>
          </Div>
        ) : null}
        {warrantyPeriod && warrantyPeriod !== 'None' ? (
          <Div col="3">
            <Img src={Warranty} height="25px" width="auto" m="auto" />
            <Text fontSize="9px" mt="0" ta="center" maxWidth="80px">
              {warrantyPeriod} Warranty
            </Text>
          </Div>
        ) : null}
        {/* {noQuestionsAsked ? (
          <Div col="3">
            <Img src={Noquestion} height="50px" width="50px" m="auto" />
            <Text fontSize="9px" mt="0" ta="center" maxWidth="80px" lineHeight="13px">
              No Questions asked Cancellation
            </Text>
          </Div>
        ) : null} */}
        {isFurniture ? (
          <Div col="3">
            <Img src={Safe} height="25px" width="auto" m="auto" />
            <Text fontSize="9px" mt="0" ta="center" maxWidth="80px" lineHeight="13px">
              Free and Safe Delivery
            </Text>
          </Div>
        ) : null}
        {freeInstallation === 'Yes' ? (
          <Div col="3">
            <Img src={Noquestion} height="25px" width="auto" m="auto" />
            <Text fontSize="9px" mt="0" ta="center" maxWidth="80px" lineHeight="13px">
              Free Installation
            </Text>
          </Div>
        ) : null}
        {/* {freeVisit === 'Yes' ? (
          <Div col="3">
            <Img src={ServiceCamp} height="25px" width="auto" m="auto" />
            <Text fontSize="9px" mt="0" ta="center" maxWidth="80px" lineHeight="13px">
              4 Free Service Visits
            </Text>
          </Div>
        ) : null} */}
      </Container>
      {/* <div className={styles.dots} /> */}
    </Div>
  );
};
export default Stripes;
