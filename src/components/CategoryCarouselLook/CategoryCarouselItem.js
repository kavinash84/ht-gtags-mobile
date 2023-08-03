import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "hometown-components/lib/Div";
import Image from "hometown-components/lib/Img";
import Text from "hometown-components/lib/Text";
import ReactStars from "react-stars";

import "./CategoryCarousel.css";

class CategoryItem extends React.Component {
  render() {
    const {
      image,
      name,
      url,
      discount,
      offerPrice,
      maxPrice,
      rating,
      coupon,
      couponSticker
    } = this.props;
    if (url) {
      return (
        <Box variant="section.catSliderItem" height="auto">
          <Link to={url}>
            {image ? (
              <div style={{ position: "relative" }}>
                <Image
                  data-src={image}
                  src={`${image}?blur=30`}
                  alt={name}
                  height="189px"
                  width="90%"
                />
                {coupon && <div className="coupon">{coupon}</div>}
                {couponSticker && (
                  <div className="couponSticker">{couponSticker}</div>
                )}
              </div>
            ) : null}

            {discount ? (
              <Text
                textAlign="center"
                variant="catSliderDiscount"
                mt={[10, 10, 16]}
              >
                {discount}
              </Text>
            ) : null}
            {name ? (
              <Text
                textAlign="left"
                color="#323F38"
                fontSize="12px"
                lineHeight="1.2rem"
                mt="12px"
                mb="3px"
                pr="20px"
                style={{ height: "60px", fontWeight: "bold" }}
              >
                {name.split("").length > 50 ? `${name.slice(0, 70)}....` : name}
              </Text>
            ) : null}
            {maxPrice && offerPrice ? (
              <div>
                <p
                  style={{
                    fontSize: "0.7rem",
                    textDecoration: "line-through",
                    textAlign: "center",
                    lineHeight: "1rem"
                  }}
                >
                  MRP: {maxPrice}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    textDecoration: "none",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  OfferPrice: {offerPrice}
                </p>
              </div>
            ) : null}
            {rating ? (
              <div className="starContainer">
                <ReactStars
                  classNames="reactStars"
                  count={5}
                  size={16}
                  value={rating}
                  half={false}
                  color2="#f15a22"
                />
              </div>
            ) : null}
          </Link>
        </Box>
      );
    }
    return (
      <Box variant="section.catSliderItem" sx={{ position: "relative" }}>
        {image ? (
          <div style={{ position: "relative" }}>
            <Image src={image} alt={name} height="160px" width="auto" />
            {coupon && <div className="coupon">{coupon}</div>}
            {couponSticker && (
              <div className="couponSticker">{couponSticker}</div>
            )}
          </div>
        ) : null}
        {discount ? (
          <Text textAlign="center" variant="catSliderDiscount" mt={16}>
            {discount}
          </Text>
        ) : null}
        {name ? (
          <Text
            textAlign="left"
            color="#323F38"
            fontSize="0.9rem"
            lineHeight="1.2rem"
            mt={12}
            mb={3}
          >
            {name.split("").length > 50 ? `${name.slice(0, 50)}....` : name}
          </Text>
        ) : null}
        {maxPrice && offerPrice ? (
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                textDecoration: "line-through",
                textAlign: "center",
                lineHeight: "1rem"
              }}
            >
              MRP: {maxPrice}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                textDecoration: "none",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              OfferPrice: {offerPrice}
            </p>
          </div>
        ) : null}
        {rating ? (
          <div className="starContainer">
            <ReactStars
              classNames="reactStars"
              count={5}
              size={16}
              value={rating}
              half={false}
              color2="#f15a22"
            />
            <label style={{ fontSize: "0.8rem", paddingTop: "2px" }}>
              ({rating})
            </label>
          </div>
        ) : null}
      </Box>
    );
  }
  // componentDidMount() {
  //   this.handleScrollPosition();
  // }

  // handleScrollPosition = () => {
  //   const scrollPosition = sessionStorage.getItem("GetThelookscroll");
  //   if (scrollPosition) {
  //     window.scrollTo(0, parseInt(scrollPosition));
  //     setTimeout(function() {
  //       sessionStorage.removeItem("GetThelookscroll");
  //     }, 2000);
  //   }
  // };
}

CategoryItem.defaultProps = {
  image: "",
  name: "",
  url: "",
  discount: "",
  offerPrice: "",
  maxPrice: "",
  rating: 0,
  coupon: "",
  couponSticker: ""
};

CategoryItem.propTypes = {
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

export default CategoryItem;
