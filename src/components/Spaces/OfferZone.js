import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import SlickSlider from 'components/SlickSlider';
import OfferItems from './OfferItems';
import Div from 'hometown-components/lib/Div';

import './SliderHome.css';

const adjustSlides = length => ({
  slidesToShow: length >= 2 ? 1.5 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: true,
   customPaging: i => (
    <div
      style={{
        borderTop: '1px solid #848C7F'
      }}
    ></div>
  )
});

export default class OfferZone extends Component {
  render() {
    const { data, categoryName } = this.props;
    return (
      <BoxHtV1>
        {(categoryName !== '' || categoryName !== null) && (
            <Div mb="20px" mt="10px">
              <Heading
                fontFamily="medium"
                style={{ textAlign: 'center', color: '#323131' }}
                fontSize="22px"
                mt="0px"
                mb="10px"
              >
                Offer Zone
              </Heading>
              <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
            </Div>
        )}
        <div className="carousel-one carousel_two">
        <SlickSlider settings={adjustSlides(12)} width="100%" mb="30px">
          {data.map(slide => (
            <div>
              <OfferItems image={slide.imgSrc} alt="offers"  url_key={slide.url_key} />
            </div>
          ))}
        </SlickSlider>
        </div>
      </BoxHtV1>
    );
  }
}

OfferZone.defaultProps = {
  data: [],
  categoryName: ''
  // subTitle: ''
};

OfferZone.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
  // subTitle: PropTypes.string
};