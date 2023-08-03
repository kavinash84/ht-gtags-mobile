import React, { Component } from "react";
import PropTypes from "prop-types";
import BoxHtV1 from "hometown-components/lib/Div";
import Title from "components/Title";
import Heading from "hometown-components/lib/Heading";
import SlickSlider from "components/SlickSlider";
import FinanceItem from "./CategoryCarouselItem";
// import CategoryCarouselItem from 'components/CategoryCarouselLook/CategoryCarouselItem';

const adjustSlides = length => ({
  slidesToShow: length >= 2 ? 1.5 : length,
  slidesToScroll: 1,
  // autoplaySpeed: 5000,
  autoplay: false,
  infinite: false,
  dots: true,
  arrows: false
});

export default class CategoryCarouselFinance extends Component {
  render() {
    const { easyFinance } = this.props;

    return (
      <BoxHtV1>
        <Heading
          ta="center"
          fontSize="22px"
          pt="10px"
          pl="20px"
          pr="20px"
          mb="10px"
          style={{
            color: "#323131",
            whiteSpace: "normal",
            fontFamily: "medium"
          }}
          lineHeight="30px"
        >
          {easyFinance.headerTitle}
        </Heading>
        <div
          style={{
            width: "30px",
            borderTop: "2px solid #222222",
            margin: "auto",
            marginBottom: "20px"
          }}
        />

        <SlickSlider settings={adjustSlides(12)} width="100%" mb="30px">
          {easyFinance.data.map(slide => (
            <div>
              <FinanceItem
                image={slide.url}
                title={slide.title || ""}
                url={slide.url_key}
                description={slide.desc}
              />
            </div>
          ))}
        </SlickSlider>
      </BoxHtV1>
    );
  }
}

CategoryCarouselFinance.defaultProps = {
  data: [],
  categoryName: ""
  // subTitle: ''
};

CategoryCarouselFinance.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
  // subTitle: PropTypes.string
};
