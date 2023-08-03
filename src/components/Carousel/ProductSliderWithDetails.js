import React from "react";
import PropTypes from "prop-types";
import { formatAmount } from "utils/formatters";
import { formatProductURL } from "utils/helper";
import Section from "hometown-components/lib/Section";
import Heading from "hometown-components/lib/Heading";
import Container from "hometown-components/lib/Container";
import SlickSlider from "../SlickSlider";
import ProductSliderItem from "./ProductSliderItemWithDetails";

const styles = require("./Slider.scss");

const adjustSlides = {
  slidesToShow: 2,
  slidesToScroll: 2,
  className: "catSlider",
  infinite: false
};

const ProductSlider = ({ productSliderTitle, data, height }) => (
  <Section className={styles.prodSlider}>
    <div style={{ marginBottom: "5px" }}>
      <Container pr="10px" pl="10px">
        <Heading
          ta="center"
          fontSize="1.125rem"
          mt="0 !important"
          mb="0.625rem !important"
          color="secondary"
          fontFamily="light"
        >
          {productSliderTitle}
        </Heading>
      </Container>
    </div>
    <Container pr="10px" pl="10px">
      <SlickSlider settings={adjustSlides}>
        {data.map((item, index) => (
          <ProductSliderItem
            key={String(index)}
            name={item.meta.name}
            discPrice={
              item.meta.max_special_price &&
              formatAmount(item.meta.max_special_price)
            }
            price={formatAmount(item.meta.price)}
            saving={item.meta.max_saving_percentage}
            percentage={item.meta.max_saving_percentage}
            rating={item.reviews.rating}
            reviewsCount={item.reviews.count}
            image={`${item.image}-product_500.jpg`}
            url={`${formatProductURL(item.meta.name, item.meta.sku)}`}
            height={height}
          />
        ))}
      </SlickSlider>
    </Container>
  </Section>
);

ProductSlider.defaultProps = {
  productSliderTitle: "",
  data: [],
  height: "281px"
};

ProductSlider.propTypes = {
  productSliderTitle: PropTypes.string,
  data: PropTypes.array,
  height: PropTypes.string
};

export default ProductSlider;
