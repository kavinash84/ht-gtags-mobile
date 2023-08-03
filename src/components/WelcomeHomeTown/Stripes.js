import React from 'react';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Container from 'hometown-components/lib/Container';
import Text from 'hometown-components/lib/Text';

const styles = require('./Stripes.scss');

const Warranty = require('../../../static/pdp-icons/36-months-warranty-old.png');
const Emi = require('../../../static/pdp-icons/EMI-icon-old.png');
const Safe = require('../../../static/pdp-icons/Free-&-Safe-delivery-icon-old.png');
const ServiceCamp = require('../../../static/pdp-icons/service-camp-icon-old.png');
const freeinstallation = require('../../../static/pdp-icons/free-installation.png');

const Stripe = () => {

  return (
    <Div mt="15px">
      <Div className={styles.useflex}>
          <Div col="3" style={{display:'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}} >
            <Img src={Emi} height="40px" width="40px" m="auto" />
            <Text fontSize="7px" mt="0px" mb="0px" style={{lineHeight:"1.3"}} maxWidth="80px">
              EMI from ₹321
            </Text>
          </Div>
          <Div col="3" style={{display:'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
            <Img src={Warranty} height="40px" width="40px" m="auto" />
            <Text fontSize="7px" mt="0px" mb="0px" style={{lineHeight:"1.3"}} maxWidth="80px">
              12 Months Warranty
            </Text>
          </Div>
         
        <Div col="3" style={{display:'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
          <Img src={Safe} height="40px" width="40px" m="auto" />
          <Text fontSize="7px" mt="0px" mb="0px" style={{lineHeight:"1.3"}} maxWidth="80px">
            Free and Safe Delivery
          </Text>
        </Div>
          <Div col="3" style={{display:'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
            <Img src={freeinstallation} height="40px" width="40px" m="auto" />
            <Text fontSize="7px" mt="0px" mb="0px" style={{lineHeight:"1.3"}} maxWidth="80px">
              Free Installation
            </Text>
          </Div>
          {/* <Div col="3" style={{display:'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
            <Img src={ServiceCamp} height="40px" width="40px" m="auto" />
            <Text fontSize="7px" mt="0px" mb="0px" style={{lineHeight:"1.3"}} maxWidth="80px">
              4 Free Service Visits
            </Text>
          </Div> */}
          
      </Div>
    </Div>
  );
};
export default Stripe;
