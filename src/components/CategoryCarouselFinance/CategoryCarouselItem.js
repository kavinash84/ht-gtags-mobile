import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "hometown-components/lib/Div";
import Image from "hometown-components/lib/Img";
import Text from "hometown-components/lib/Text";

import "./CategoryCarousel.css";

class FinanceItem extends React.Component {
  render() {
    const { image, url, description, title } = this.props;

    return (
      <Box variant="section.catSliderItem" height="auto">
        <Link to={url}>
          <Box style={{ width: "90%" }}>
            <Box
              bg="white"
              style={{ height: "200px" }}
              pt="30px"
              pb="10px"
              pl="10px"
              pr="10px"
            >
              <Box style={{ height: "30px" }} pl="10px" pr="10px">
                <Image
                  data-src={image}
                  src={`${image}?blur=30`}
                  width="100%"
                  style={{ height: "40px", objectFit: "cover" }}
                />
              </Box>
              <Box pl="10px" mt="30px">
                <h5 fontSize="16px" mb="5px" style={{ color: "#323131" }}>
                  {title}
                </h5>
                <Text
                  fontSize="12px"
                  lineHeight="18px"
                  style={{ color: "#575757" }}
                >
                  {description}
                </Text>
              </Box>
            </Box>
          </Box>
        </Link>
      </Box>
    );
  }
}

FinanceItem.defaultProps = {
  image: "",
  description: "",
  title: "",
  url: ""
};

FinanceItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  discount: PropTypes.string,
  offerPrice: PropTypes.string,
  maxPrice: PropTypes.string,
  rating: PropTypes.number,
  coupon: PropTypes.string,
  couponSticker: PropTypes.string
};

export default FinanceItem;
