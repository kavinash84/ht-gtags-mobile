import React from "react";
import PropTypes from "prop-types";
import { formatAmount } from "utils/formatters";
import { formatProductURL } from "utils/helper";
import Section from "hometown-components/lib/Section";
import HeadingH6 from "hometown-components/lib/HeadingH6";
import Row from "hometown-components/lib/Row";
import Container from "hometown-components/lib/Container";
import SlickSlider from "../SlickSlider";
import ProductSliderItem from "./ProductSliderItem";

const styles = require("./Slider.scss");

const settings = {
  className: "catSlider",
  showIndicators: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  infinite: true
};

const ProductSlider = ({ productSliderTitle, data, height }) => (
  <Section className={styles.prodSlider}>
    <div style={{ marginBottom: "5px" }}>
      <Container pr="5px" pl="5px">
        <HeadingH6
          ta="center"
          fontSize="1.125rem"
          mt="0 !important"
          mb="1rem !important"
          color="secondary"
          fontFamily="light"
        >
          {productSliderTitle}
        </HeadingH6>
      </Container>
    </div>
    <Container pr="5px" pl="5px">
      <Row ml="0" mr="0">
        <SlickSlider settings={settings}>
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
      </Row>
    </Container>
  </Section>
);

ProductSlider.defaultProps = {
  productSliderTitle: "",
  data: [],
  height: "168px"
};

ProductSlider.propTypes = {
  productSliderTitle: PropTypes.string,
  data: PropTypes.array,
  height: PropTypes.string
};

export default ProductSlider;
