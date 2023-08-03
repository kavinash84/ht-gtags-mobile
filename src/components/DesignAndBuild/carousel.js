import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import ShopbyCatItem from './shopbyCatItem';
import SlickSlider from '../SlickSlider';

import './Slider.css';

const DBCarousel = ({ data, settings, component }) => (
  <Section p="0" pt="0" mb="0">
    <Section pr="0" pl="0" mb="0">
      <Row display="block" pt="0" ml="0" mr="0">
        <div className="carousel-one">
          <SlickSlider settings={settings(data.length)}>
            {data.map((slide, index) => (
              <div key={String(index)}>
                <ShopbyCatItem data={slide} component={component} />
              </div>
            ))}
          </SlickSlider>
        </div>
      </Row>
    </Section>
  </Section>
);

DBCarousel.defaultProps = {
  data: []
};

DBCarousel.propTypes = {
  data: PropTypes.array
};

export default DBCarousel;
