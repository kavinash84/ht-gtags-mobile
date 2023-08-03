import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import SpacesCatitem from './SpacesCatitem';
import SlickSlider from '../SlickSlider';

import '../HomewareCat/SliderHome.scss';

const CategoryCarouselSpaces = ({ data, categoryName, settings, styles, component }) => (
  <Section p="0" pt="0" mb="0" className="catCarousel">
    <Section pr="0" pl="0" mb="0">
      {component === 5 ? (
        <Div mb="25px" mt="25px">
          <Heading
            fontFamily="medium"
            style={{ textAlign: 'center', color: '#323131' }}
            fontSize="22px"
            mt="0px"
            mb="10px"
          >
            Furniture Essentials <br /> For Your Home
          </Heading>
        </Div>
      ) : (
        <div>
           (
            <Div mb="25px" mt="25px">
              <Heading
                fontFamily="medium"
                style={{ textAlign: 'center', color: '#323131' }}
                fontSize="22px"
                mt="0px"
                mb="10px"
              >
                OfferZone
              </Heading>
              <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
            </Div>
          )
        </div>
      )}

      <Row display="block" pt="0" ml="0" mr="0">
        <div className="carousel-one carousel_two">
          <SlickSlider settings={settings(data.length)}>
            {data.map((slide, index) => (
              <div key={String(index)}>
                  <SpacesCatitem
                    image={slide.image}
                    name={slide.title}
                    url={slide.url_key}
                    data={slide}
                    layout="square"
                    style={styles}
                    component={component}
                  />
              </div>
            ))}
          </SlickSlider>
        </div>
      </Row>
    </Section>
  </Section>
);

CategoryCarouselSpaces.defaultProps = {
  data: [],
  categoryName: ''
};

CategoryCarouselSpaces.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
};

export default CategoryCarouselSpaces;
