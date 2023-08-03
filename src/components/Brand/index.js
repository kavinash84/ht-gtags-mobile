/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import Box from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
// import Heading from 'hometown-components/lib/Heading';

import BrandCollection from './BrandCollection';
import BrandCategories from './BrandCategories';

import { BASE_IMAGE_URL } from "helpers/Constants";

const styles = require('./lauraAshley.scss');

class Brand extends React.Component {
  state = {
    bannerImageLeft: `${BASE_IMAGE_URL}/media/cms/extras/1.jpg`,
    bannerImageRight: `${BASE_IMAGE_URL}/media/cms/extras/2.jpg`,
    bannerImageCenter: `${BASE_IMAGE_URL}/media/cms/extras/LA-mid-banner.jpg`,
    brandLogo: `${BASE_IMAGE_URL}/media/cms/extras/LA-logo.jpg`,
    CollectionData: [
      {
        content: 'Provencale',
        title:
          'A French country style range which looks great as a collection or used as individual pieces. Carefully constructed by skilled craftsmen and finished by hand.',
        imgUrl: `${BASE_IMAGE_URL}/media/cms/extras/Provencale.jpg`,
        url: '/furniture/laura-ashley/shop-by-collection/provencale'
      },
      {
        content: 'Milton',
        title:
          'Milton has a pure and timeless quality that makes it suitable for almost any living space. Made using traditional joints and craftsmenship, each piece is beautifully enhanced by a fine, oiled finish and antiqued pewter effect handles',
        imgUrl: `${BASE_IMAGE_URL}/media/cms/extras/Milton.jpg`,
        url: '/furniture/laura-ashley/shop-by-collection/milton'
      },
      {
        content: 'Henshaw',
        title:
          'Add drama to any room with Henshaw, featuring a hand-painted black finish and distressed edges rubbed back to reveal a golden colour beneath',
        imgUrl:  `${BASE_IMAGE_URL}/media/cms/extras/Henshaw.jpg`,
        url: '/furniture/laura-ashley/shop-by-collection/henshaw'
      },
      {
        content: 'Garrat',
        title:
          'Available in dark chestnut and honey, our ever popular Garrat range is stained to enhance the natural wood features, grain and colour variation. With antiqued brass effect handles and knobs, it will suit any home',
        imgUrl: `${BASE_IMAGE_URL}/media/cms/extras/Garrot.jpg`,
        url: '/furniture/laura-ashley/shop-by-collection/garrat'
      },
      {
        content: 'Keats',
        title:
          'The perfect balance between elegant design and traditional cabinet making, our Keats collection combines soft curves together with subtle features and details that are a true sign of quality construction',
        imgUrl:  `${BASE_IMAGE_URL}/media/cms/extras/Keats.jpg`,
        url: '/furniture/laura-ashley/shop-by-collection/keats'
      },
      {
        content: 'Dorset',
        title:
          'Classically elegant, this hand finished range features a gentle chalky finish that works perfectly with the ash tops, whilst contrast steel effect handles and hinges introduce a contemporary twist',
        imgUrl:  `${BASE_IMAGE_URL}/media/cms/extras/Dorset.jpg`,
        url: '/furniture/laura-ashley/shop-by-collection/dorset'
      }
    ],
    brandCategories: [
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/Sofas.jpg`,
        name: 'Sofas',
        url: '/furniture/laura-ashley/laura-ashley-sofas'
      },
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/dining-set.jpg`,
        name: 'Dining Sets',
        url: '/furniture/laura-ashley/laura-ashley-dining-sets'
      },
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/beds.jpg`,
        name: 'Beds',
        url: '/furniture/laura-ashley/laura-ashley-beds'
      },
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/Coffeetables.jpg`,
        name: 'Coffee Tables & End Tables',
        url: '/furniture/laura-ashley/LA-Coffee-tables-and-end-tables-Laura-Ashley'
      },
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/Sideboards.jpg`,
        name: 'Side Boards and Consoles',
        url: '/furniture/laura-ashley/sideboard-and-consoles'
      },
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/Wardrobes.jpg`,
        name: 'Wardrobe & Night Stands',
        url: '/furniture/laura-ashley/wardrobe-and-nightstand'
      },
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/Tableware.jpg`,
        name: 'Tableware',
        url: '/furniture/laura-ashley/Laura-Ashley-tableware'
      },
      {
        image_url: `${BASE_IMAGE_URL}/media/cms/extras/Fragrances.jpg`,
        name: 'Fragrances',
        url: '/furniture/laura-ashley/fragrances'
      }
    ]
  };
  render() {
    const {
      brandCategories,
      bannerImageLeft,
      bannerImageRight,
      bannerImageCenter,
      CollectionData,
      brandLogo
    } = this.state;
    return (
      <Box>
        <Box>
          <Row justifyContent="space-between" mr="5px" ml="2px" mt="30px">
            <div style={{ width: '49%' }}>
              <img src={bannerImageLeft} alt="" style={{ width: '100%' }} />
            </div>
            <div style={{ width: '49%' }}>
              <img src={bannerImageRight} alt="" style={{ width: '100%' }} />
            </div>
            <Box
              sx={{
                position: 'relative',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%'
              }}
            >
              <Box pl={0} pr={0} mt={30} className={styles.brandCollection}>
                {/* <Text textAlign="center" fontSize={60} mb={20}>
                  LAURA ASHLEY
                </Text>
                <Text textAlign="center" fontSize={30} mb={20}>
                  HOME
                </Text> */}
                <Image src={brandLogo} alt="" sx={{ width: '100%', marginBottom: '10px' }} />
                <p style={{ textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                  Discover our stunning collection from Laura Ashley, the quintessential British brand. With ornate
                  detailing, plush textures, sophisticated styles, timeless designs and rich colourways, this luxurious
                  collection ensures your home displays an extension of your personality.
                </p>
              </Box>
            </Box>
          </Row>
        </Box>
        <Box sx={{ width: '90%' }} mx="auto">
          <Image src={bannerImageCenter} alt="" sx={{ width: '100%' }} />
        </Box>

        <Box>
          <h2
            style={{
              color: '#474747',
              margin: '20px 0px',
              textAlign: 'center',
              fontSize: '1.2rem'
            }}
          >
            {' '}
            SHOP BY CATEGORY{' '}
          </h2>
        </Box>
        <Box mb={40}>
          <Box ml={25} mr={25} pr={0} pl={0} sx={{ flexWrap: 'wrap' }}>
            <BrandCategories brandCategories={brandCategories} />
          </Box>
        </Box>
        <Box my={50} textAlign="center">
          <h2
            style={{
              color: '#474747',
              margin: '20px 0px',
              textAlign: 'center',
              fontSize: '1.2rem'
            }}
          >
            {' '}
            SHOP OUR COLLECTIONS{' '}
          </h2>
        </Box>
        <Box mb={20}>
          <BrandCollection CollectionData={CollectionData} />
        </Box>
        <Box style={{ backgroundColor: '#F6F6F6', marginTop: '20px' }}>
          <Text style={{ textAlign: 'center' }} fontSize="1.5rem" pt={40} pb={10} color="#a4b9c8" letterSpacing="0.1em">
            ABOUT LAURA ASHLEY
          </Text>
          <Text
            style={{ textAlign: 'center', padding: '10px 30px' }}
            ml={40}
            mr={40}
            lineHeight={1.4}
            fontSize="0.8rem"
          >
            Laura Ashley is a quintessentially English lifestyle brand founded in 1954 by Bernard Ashley and his wife
            Laura Ashley. The brand prides itself on its rich design heritage and traditional values of quality and
            originality. Each piece is an inspiration in itself and the prints, designs and colours which feature in
            every Laura Ashley collection evoke the alluring beauty of the English countryside, for the way you live
            today.
          </Text>
        </Box>
      </Box>
    );
  }
}

export default connect(null)(Brand);
