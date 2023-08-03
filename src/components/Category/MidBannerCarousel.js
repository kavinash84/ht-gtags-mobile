import React from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Title from 'components/Title';
import BannerItem from './BannerItem';

const MidBannerCarousel = ({ data, categoryName }) => (
  <Section p="0" pt="0" mb="1rem" className="catCarousel">
    <Container pr="0" pl="0">
      <Title title={categoryName} subTitle="" />
      <Row display="block" pt="0" ml="-5px" mr="-5px">
        {data.map((slide, index) => (
          <div key={String(index)}>
            <BannerItem image={slide.m_image} name={slide.title} url={slide.url_key} />
          </div>
        ))}
      </Row>
    </Container>
  </Section>
);

MidBannerCarousel.defaultProps = {
  data: [],
  categoryName: ''
};

MidBannerCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
};

export default MidBannerCarousel;
