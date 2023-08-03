import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu from "components/Menu";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
import ResponsiveModal from "components/Modal";
import { Link } from "react-router-dom";
// import Container from 'hometown-components/lib/Container';
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import { Shimmer, BackgroundMasker } from "hometown-components/lib/Shimmer";
// import BreadCrumb from './BreadCrumb';

/* ====== Selectors ====== */
import { getText } from "selectors/homepage";
import ShopByCategories from "./shopByCategories";
import ShopByRooms from "./shopByRooms";
import GridSystem from "./gridSystem";
import ShopByEssentials from "./shopByEssentials";
import MainFurnitureSlider from "./mainSlider";
import NewAndNow from "./newAndNow";
import ShopOurBestSeller from "./shopOurBestSeller";
import BannerImage from "./bannerImage";
import Matteress from "./matteress";
// import FurnitureBreadCrumb from './furnitureBredCumb';
import BreadCrumb from "../../containers/Category/BreadCrumb";
import NewUnboxBestSeller from "components/NewUnboxWidges/bestSeller";

const styles = require("./BreadCrumb.scss");

const PlaceHolderShimmer = () => (
  <Div mb="1rem">
    <Shimmer height="168px">
      <BackgroundMasker width="20%" height="25px" left="0" />
      <BackgroundMasker width="20%" height="25px" right="0" />
      <BackgroundMasker width="100%" height="10px" left="0" top="25px" />
      <BackgroundMasker width="15px" height="153px" left="0" top="35px" />
      <BackgroundMasker
        width="15px"
        height="153px"
        left="calc(15px + 153px)"
        top="35px"
      />
      <BackgroundMasker
        width="15px"
        height="153px"
        left="calc(15px + 153px + 15px + 153px)"
        top="35px"
      />
    </Shimmer>
  </Div>
);

@connect(({ homepage: { menu }, category, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  categoryText: getText(category),
  seoInfo: data && data.seo && data.seo.items
}))
export default class FurniturContainer extends Component {

  getBgColor = comp => {
    switch (comp) {
      case 2:
        return "linear-gradient(to right, rgb(234, 234, 234), white)";
      case 5:
        return "#F9F9F9";
      case 13:
        return "#F5EEEE";
      default:
        return "#FFFFFF";
    }
  };
  render() {
    const {
      category,
      categoryText: { title: pageTitle }
    } = this.props;
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          <Menu backBtn={false} />
          <div className={styles.BreadCrumb_wrapper_main}>
            <BreadCrumb urlKey="furniture" name={pageTitle} />
          </div>

          {/* {category && category.sections && (
            <LazyLoad placeholder={<PlaceHolderShimmer />} height={240}> */}
          <MainFurnitureSlider data={category.main} mb="0" />
          {/* </LazyLoad>
          )} */}

          <Section pr="0" pl="0">
            <Row display="block" pt="1rem">
              <Div col={12}>
                {category && category.sections ? (
                  category.sections.map((cat, index) => (
                    <div
                      key={String(index)}
                      style={{
                        background: this.getBgColor(cat.component),
                        width: "100%"
                      }}
                    >
                      {cat.component === 1 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={390}
                        >
                          <ShopByCategories
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />{" "}
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                      {cat.component === 2 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <ShopByRooms
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                      {[3, 4, 6, 8, 9, 10, 11, 14].includes(cat.component) ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <GridSystem
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                      {cat.component === 12 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <Matteress
                            categoryName={cat.title}
                            component={cat.component}
                            url_key={cat.url_key}
                            src={cat.image}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                      {cat.component === 5 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <ShopByEssentials
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                      {cat.component === 7 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <NewAndNow
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                      {cat.component === 13 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <ShopOurBestSeller />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                      {[20, 30].includes(cat.component) ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <BannerImage
                            alt={cat.title}
                            src={cat.image}
                            url={cat.url_key}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                    </div>
                  ))
                ) : (
                  <LazyLoad placeholder={<PlaceHolderShimmer />} height={390}>
                    <div></div>
                  </LazyLoad>
                )}
              </Div>
            </Row>
          </Section>
          <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
            <NewUnboxBestSeller
              pageInfo={{
                pageType: "CATEGORY",
                catlevel1Name: "Furniture"
              }}
            />
          </LazyLoad>
        </div>
      </Section>
    );
  }
}

FurniturContainer.defaultProps = {
  category: [],
  seoInfo: {
    seo_text: ""
  }
};

FurniturContainer.propTypes = {
  category: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
