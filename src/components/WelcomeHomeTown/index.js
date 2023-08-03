import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Row from 'hometown-components/lib/Row';

import Image from 'hometown-components/lib/Img';
import Stripe from './Stripes';

@connect(({ exchange }) => ({
  exchange,
  mainBanner: exchange.data.items.text.mainBanner,
  offerBanner: exchange.data.items.text.offerBanner,
  mainOffers: exchange.data.items.text.mainOffers,
  duracucine: exchange.data.items.text.duracucine,
  bankOffer: exchange.data.items.text.bankOffer,
  whyUs: exchange.data.items.text.whyUs,
  store: exchange.data.items.text.store

}))
class WelcomeHome extends Component {

    render() {  
      const { mainBanner, offerBanner, mainOffers, duracucine, bankOffer, whyUs, store  } = this.props;
        return ( 
            <Section p="0px" mb="0.5rem">
             <Div>
                 <Image width="100%" height="auto" mt="20px" src={mainBanner.image} alt="Welcome banner"/>
             </Div>

             {offerBanner && (
             <Div>
             <Image width="100%" mt="25px" src={offerBanner.image} alt="Mid banner"/>
             </Div>
             )}

             <Row justifyContent="center" ml="-10px" mr="-10px" pt="25px">
             {mainOffers.map(slide=>(
             <Div style={{ width: '45%' }} height="100%" p="2px" mb="10px">
            <Div
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
               height="100%"
               width={1}
            >
             <Image src={slide.offer} alt='offer1' height="auto" width="95%" />
           </Div>
           </Div>
           ))}
           </Row>
             
             {duracucine &&(
              <Div pt="15px">
             <Image src={duracucine.image} width="170px"  m="auto" alt="Duracucine Logo" />
             <Text mt="5px" style={{ textAlign: 'center' }} fontSize="13px" lineHeight="1.2rem">
             Kitchens Perfected for Indian homes and lifestyle.
             </Text>
             </Div>
             )}
             
             {bankOffer && (
              <Div>
                 <Image width="100%" height="200px" mt="20px" src={bankOffer.image} alt="Welcome banner"/>
              
             </Div>
             )}
             {whyUs && (
              <Div>
                 <Image width="100%" height="auto" pl="5%" pr="5%" mt="20px" src={whyUs.image} alt="whyus banner"/>
              
             </Div>
             )}
             
             <Stripe/>
             <Div height="1.5rem" width="100%" bg="gray" mt="0.5rem" mb="0.5rem" >
             <Text fontSize="6.5px" ta="center" color="white" mb="0px" mt="0.4rem">
               FURNITURE |HOMEWARE |DECOR |HOME FASHION |TABLEWARE |MODULAR KITCHENS |DESIGN & BUILD
             </Text>
             </Div>
             
             <Link to="/store-locator">
                <Image m="auto" src={store.image} alt="Store locator"/>
             </Link>
      
            </Section>
         );
    }
}
 
export default WelcomeHome;