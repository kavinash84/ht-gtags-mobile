import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components/lib/Div';
// import Title from 'components/Title';
import Heading from 'hometown-components/lib/Heading';
import SlickSlider from 'components/SlickSlider';
import CategoryCarouselItem from 'components/CategoryCarouselLook/CategoryCarouselItem';

const adjustSlides = length => ({
  slidesToShow: length >= 2 ? 1.5 : length,
  slidesToScroll: 1,
  // autoplaySpeed: 5000,
  autoplay: false,
  infinite: false,
  dots: true,
  arrows: false
});

export default class CategoryCarousel extends Component {
  render() {
    const { categoryName, getTheLook } = this.props;

    return (
      <BoxHtV1>
        <Heading fontFamily="medium" style={{ textAlign: 'left', color: '#323131' }} fontSize="20px" mt="0px" mb="10px">
          {getTheLook.mainTitle}
        </Heading>

        <SlickSlider settings={adjustSlides(12)} width="100%" mb="30px">
          {getTheLook.data.map(slide => (
            <div>
              <CategoryCarouselItem image={slide.image} name={slide.title || ''} url={slide.url_key} />
            </div>
          ))}
        </SlickSlider>
      </BoxHtV1>
    );
  }
}

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: ''
  // subTitle: ''
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
  // subTitle: PropTypes.string
};
