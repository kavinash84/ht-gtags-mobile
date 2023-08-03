import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Image from 'hometown-components/lib/Img';
import Row from 'hometown-components/lib/Row';

@connect(({ yearendsale }) => ({
  yearendsale,
  textBanner: yearendsale.data.items.text.textBanner,
  mainOffers: yearendsale.data.items.text.mainOffers,
  stripes: yearendsale.data.items.text.stripes,
  offerBanner: yearendsale.data.items.text.offerBanner,
  duracucine: yearendsale.data.items.text.duracucine,
  bankOffer: yearendsale.data.items.text.bankOffer,
  whyUs: yearendsale.data.items.text.whyUs,
  store: yearendsale.data.items.text.store,
  solidbeds: yearendsale.data.items.text.solidbeds
}))
class YearEndSaleContainer extends Component {

  render() {
    const { textBanner, mainOffers, stripes, duracucine, bankOffer, whyUs, store, offerBanner, solidbeds } = this.props;
    return (
      <Section p="0px" mb="0.5rem">
        {textBanner && (
          <Div>
            <Image width="100%" mt="5px" mb="-10px" src={textBanner.image} alt="Mid banner" />
          </Div>
        )}

        <Row justifyContent="center" ml="-15px" mr="-15px" pt="25px">
          {mainOffers.map(slide => (
            <Div style={{ width: '45%' }} height="100%" p="2px">
              <Div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
                width={1}
              >
                <Image src={slide.offer} alt='offer1' height="auto" width="100%" />
              </Div>
            </Div>
          ))}
        </Row>

        <Row justifyContent="center" ml="-2px" mr="-10px" pt="15px">
          {solidbeds && solidbeds.map(slide => (
            <Div style={{ width: '48%' }} height="100%" p="2px" mb="10px">
              <Div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
                height="100%"
                width={1}
              >

                <Image src={slide.image} alt='offer1' height="auto" width="95%" />

              </Div>
            </Div>
          ))}
        </Row>

        {duracucine && (
          <Div pt="15px">
            <Image src={duracucine.image} width="170px" m="auto" alt="Duracucine Logo" />
            <Text mt="5px" style={{ textAlign: 'center' }} fontSize="13px" lineHeight="1.2rem">
              Kitchens Perfected for Indian homes and lifestyle.
            </Text>
          </Div>
        )}

        {whyUs && (
          <Div>
            <Image width="100%" height="auto" mt="0px" src={whyUs.image} alt="whyus banner" />
          </Div>
        )}

        {bankOffer && (
          <Div>
            <Image width="100%" mt="5px" src={bankOffer.image} alt="Welcome banner" />
          </Div>
        )}


        {offerBanner && (
          <Div>
            <Image width="0%" mt="10px" src={offerBanner.image} alt="Mid banner" />
          </Div>
        )}


        {stripes && (
          <Div>
            <Image width="100%" mb="5px" src={stripes.image} alt="Mid banner" />
          </Div>
        )}

        <Link to="/store-locator">
          <Image m="auto" src={store.image} alt="Store locator" />
        </Link>

      </Section>
    );
  }
}

export default YearEndSaleContainer;