import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import SquareCatItem from './SquareCatItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 2 ? 2 : length,
  slidesToScroll: 2,
  autoplay: false,
  infinite: true
});

const CategoryCarousel = ({ data, categoryName, subTitle }) => (
  <Section p="0" pt="0" mb="1rem" className="catCarousel">
    <Container pr="5px" pl="5px">
      <Title title={categoryName} subTitle={subTitle} pr="5px" pl="5px" />
      <Row display="block" pt="0" ml="0" mr="0">
        <SlickSlider mb="0" settings={adjustSlides(data.length)}>
          {data.map((slide, index) => (
            <div key={String(index)}>
              <SquareCatItem name={slide.info.name} image={slide.image_url} url={`${slide.info.url_key}`} />
            </div>
          ))}
        </SlickSlider>
      </Row>
    </Container>
  </Section>
);

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: '',
  subTitle: ''
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  subTitle: PropTypes.string
};

export default CategoryCarousel;
