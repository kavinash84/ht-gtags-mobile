import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Image from 'hometown-components/lib/Img';
import Row from 'hometown-components/lib/Row';

@connect(({ bedlanding }) => ({
  bedlanding,
  textBanner: bedlanding.data.items.text.textBanner,
  bedBanner: bedlanding.data.items.text.bedBanner,
  stripes: bedlanding.data.items.text.stripes,
  offerBanner: bedlanding.data.items.text.offerBanner,
  duracucine: bedlanding.data.items.text.duracucine,
  bankOffer: bedlanding.data.items.text.bankOffer,
  whyUs: bedlanding.data.items.text.whyUs,
  store: bedlanding.data.items.text.store,
  solidbeds:bedlanding.data.items.text.solidbeds
}))
class BedLandingContainer extends Component {

    render() {  
      const { textBanner, bedBanner, stripes, duracucine, bankOffer, whyUs, store , offerBanner, solidbeds } = this.props;
        return ( 
            <Section p="0px" mb="0.5rem">
             {textBanner && (
             <Div>
             <Image width="70%" ml="15%" mt="15px" mb="-5px" src={textBanner.image} alt="Mid banner"/>
             </Div>
             )}

             <Div>
             {bedBanner.map(slide=>(
             <Div>
             <Link to={slide.url}>
                 <Image width="100%" height="auto" mt="20px" src={slide.image} alt="Welcome banner"/>
                 </Link>
             </Div>
           ))}
           </Div>

           <Row justifyContent="center" ml="-2px" mr="-10px" pt="15px">
             {solidbeds && solidbeds.map(slide=>(
             <Div style={{ width: '48%' }} height="100%" p="2px" mb="10px">
            <Div
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
               height="100%"
               width={1}
            >
            <Link to={slide.url}>
             <Image src={slide.image} alt='offer1' height="auto" width="95%" />
             </Link>
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
             
             {offerBanner && (
             <Div>
             <Image width="100%" mt="10px" src={offerBanner.image} alt="Mid banner"/>
             </Div>
             )}


             {stripes && (
             <Div>
             <Image width="100%" mt="5px" mb="5px" src={stripes.image} alt="Mid banner"/>
             </Div>
             )}
             
             <Link to="/store-locator">
                <Image m="auto"  src={store.image} alt="Store locator"/>
             </Link>
      
            </Section>
         );
    }
}
 
export default BedLandingContainer;