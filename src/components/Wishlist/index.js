import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "redux/modules/wishlist";
import Container from "hometown-components/lib/Container";
import Div from "hometown-components/lib/Div";
import Heading from "hometown-components/lib/Heading";
import Product from "hometown-components/lib/Product";
import Row from "hometown-components/lib/Row";
import Section from "hometown-components/lib/Section";
import { formatProductURL } from "utils/helper";
import { setProductPosition } from "redux/modules/productdetails";
import { formatAmount } from "utils/formatters";
import AddToCart from "../AddToCart";

const styles = require("./Wishlist.scss");

const getProductImage = url => {
  const pp = `${url.split("/").slice(-1)}`;
  return url.replace(pp, "1-product_500.jpg");
};

const mapStateToProps = ({ pincode }) => ({
  selectedPincode: pincode.selectedPincode
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...actionCreators, productPosition: setProductPosition },
    dispatch
  );

const onClick = (list, dispatcher) => sku => e => {
  e.preventDefault();
  dispatcher(list, sku);
};

const isInWishList = (list, id) => list.includes(id);

const Wishlist = ({
  list,
  toggleWishList,
  wishList,
  loadingList,
  productPosition,
  selectedPincode
}) => (
  <Div type="block">
    <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
      <Container type="container" pr="1rem" pl="1rem">
        <Row display="block" mr="0" ml="0">
          <Heading
            fontSize="1.25rem"
            color="textDark"
            mb="0px"
            mt="0px"
            fontFamily="light"
          >
            Wishlist
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section
      minHeight="calc(100vh - 106px)"
      display="flex"
      pt="1.25rem"
      mb="0"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
    >
      {/* eslint-disable max-len */}

      <Container type="container" pr="0.5rem" pl="0.5rem">
        {list.map(item => (
          <Row
            display="block"
            mr="0"
            ml="0"
            mb="15px"
            key={item.product_info.id}
          >
            <div className={styles.productWrapper}>
              {item.product_info.soldout ? (
                <Product
                  key={item.product_info.id_catalog_config}
                  name={item.product_info.name}
                  price={item.product_info.price}
                  // cutprice={item.product_info.special_price}
                  // saving={item.product_info.discount_percent}
                  image={item.product_info.image}
                  sku={item.wishlist_info.configurable_sku}
                  onClick={onClick(list, toggleWishList)}
                  isWishList={isInWishList(
                    wishList,
                    item.wishlist_info.configurable_sku
                  )}
                  // skuLoading={isInWishList(loadingList, item.wishlist_info.configurable_sku)}
                  // rating={0}
                  // reviewsCount={0}
                  // savingAmount={
                  //   item.product_info.special_price
                  //     ? formatAmount(
                  //         Number(item.product_info.price) -
                  //           Number(item.product_info.special_price)
                  //       )
                  //     : 0
                  // }
                  setProductPosition={productPosition}
                  // deliveredBy={
                  //   item.wishlist_info.delivery_details &&
                  //   item.wishlist_info.delivery_details[0].value
                  // }
                  pincode={selectedPincode}
                  productURL={formatProductURL(
                    item.product_info.name || "",
                    item.wishlist_info.configurable_sku || ""
                  )}
                  imgHeight="340px"
                />
              ) : (
                <Product
                  key={item.product_info.id}
                  name={item.product_info.data.name}
                  price={item.product_info.netprice}
                  cutprice={item.product_info.cutprice}
                  saving={item.product_info.saving}
                  image={getProductImage(item.product_info.images[0].path)}
                  sku={item.product_info.data.sku}
                  onClick={onClick(list, toggleWishList)}
                  isWishList={isInWishList(
                    wishList,
                    item.product_info.data.sku
                  )}
                  skuLoading={isInWishList(
                    loadingList,
                    item.product_info.data.sku
                  )}
                  rating={item.product_info.data.reviews.rating.toFixed(1)}
                  reviewsCount={item.product_info.data.reviews.count}
                  savingAmount={
                    item.product_info.data.max_special_price
                      ? formatAmount(
                          Number(item.product_info.data.max_price) -
                            Number(item.product_info.data.max_special_price)
                        )
                      : 0
                  }
                  setProductPosition={productPosition}
                  deliveredBy={
                    item.wishlist_info.delivery_details &&
                    item.wishlist_info.delivery_details[0].value
                  }
                  pincode={selectedPincode}
                  productURL={formatProductURL(
                    item.product_info.data.name,
                    item.product_info.data.sku
                  )}
                  imgHeight="340px"
                />
              )}
              <Div mt="0" p="0.25rem 0.125rem 0.5rem">
                {item.product_info.soldout ? (
                  <AddToCart
                    simpleSku=""
                    sku=""
                    itemId=""
                    isSoldOut={true}
                    configId=""
                  />
                ) : (
                  <AddToCart
                    simpleSku={Object.keys(item.product_info.data.simples)[0]}
                    sku={item.product_info.data.sku}
                    itemId={item.product_info.id}
                    isSoldOut={item.product_info && item.product_info.soldout}
                    configId={item.product_info.data.config_id}
                  />
                )}
              </Div>
            </div>
          </Row>
        ))}
      </Container>
    </Section>
  </Div>
);

Wishlist.defaultProps = {
  wishList: [],
  list: [],
  loadingList: [],
  selectedPincode: ""
};

Wishlist.propTypes = {
  toggleWishList: PropTypes.func.isRequired,
  wishList: PropTypes.array,
  list: PropTypes.array,
  productPosition: PropTypes.func.isRequired,
  loadingList: PropTypes.array,
  selectedPincode: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
