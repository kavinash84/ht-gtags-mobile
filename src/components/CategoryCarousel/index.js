import React from "react";
import PropTypes from "prop-types";
import Section from "hometown-components/lib/Section";
import Heading from "hometown-components/lib/Heading";
import CategoryCarouselContainer from "hometown-components/lib/CategoryCarousel";
import CategoryCarouselItem from "hometown-components/lib/CategoryCarousel/CategoryCarouselItem";

const styles = require("./index.scss");

const OFFER_ID = 5;

const CategoryCarousel = ({ data, categoryName, colSize, id }) => (
  <Section p="20px 0 0" pt="10px" mb="0">
    {(categoryName !== "" || categoryName !== null) && (
      <div className={styles.head}>
        <div className="container">
          <div className={styles.title}>
            <Heading
              ta="center"
              mt="0 !important"
              mb="0.625rem !important"
              color="secondary"
              fontFamily="light"
            >
              {categoryName}
            </Heading>
          </div>
        </div>
      </div>
    )}
    <CategoryCarouselContainer>
      {data.map((category, index) => (
        <CategoryCarouselItem
          key={String(index)}
          colSize={colSize}
          name={category.info.name}
          image={category.image_url}
          url={
            OFFER_ID === id || OFFER_ID === parseInt(id, 10)
              ? ""
              : category.info.url_key
          }
          typeOfSlider="catSlider"
        />
      ))}
    </CategoryCarouselContainer>
  </Section>
);

CategoryCarousel.defaultProps = {
  data: [],
  categoryName: "",
  colSize: "100%",
  id: ""
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  colSize: PropTypes.string,
  id: PropTypes.string
};

export default CategoryCarousel;
