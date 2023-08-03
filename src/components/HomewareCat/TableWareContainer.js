import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu from "components/Menu";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
// import Container from 'hometown-components/lib/Container';
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import { Shimmer, BackgroundMasker } from "hometown-components/lib/Shimmer";
import NewUnboxBestSeller from "components/NewUnboxWidges/bestSeller";
// import BreadCrumb from './BreadCrumb';

/* ====== Selectors ====== */
import { getText } from "selectors/homepage";
import ShopByBrands from "./ShopByBrands";
import ShopByRooms from "./ShopByRooms";
import StyleYourHome from "./StyleHome";
import BestBuys from "./BestBuys";
import MainFurnitureSlider from "./MainSlider";
import Recommended from "./Recommended";
import ShopOurBestSeller from "./ShopOurBestSeller";
import BannerImage from "./BannerImage";
// import HomewareBreadCrumb from './HomewareBreadCrumb';
import Topbanner from "./Topbanner";
import ShopCollection from "./ShopCollection";
import LastInLine from "./LastInLine";
import BreadCrumb from "../../containers/Category/BreadCrumb";

const styles = require("./BreadCrumbHome.scss");

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
export default class TableWareContainer extends Component {
  getBgColor = comp => {
    switch (comp) {
      case 9:
        return "#F5F5F5";
        break;
      case 4:
        return "#F9F9F9";
        break;
      case 7:
        return "#F5EEEE";
        break;
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
            <BreadCrumb urlKey="tableware" name={pageTitle} />
          </div>
          {category && <MainFurnitureSlider data={category.main} mb="0" />}
          <Section pr="0" pl="0">
            <Row display="block" pt="1rem">
              <Div col={12}>
                {category &&
                  category.sections &&
                  category.sections.map((cat, index) => (
                    <div
                      key={String(index)}
                      style={{
                        background: this.getBgColor(cat.component),
                        width: "100%"
                      }}
                    >
                      {cat.component === 1 ? (
                        <Topbanner data={cat.data} component={cat.component} />
                      ) : (
                        ""
                      )}

                      {cat.component === 2 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <StyleYourHome
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}

                      {cat.component === 3 ? (
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

                      {cat.component === 4 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <BestBuys
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
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
                          <ShopCollection
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}

                      {cat.component === 6 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <div>
                            <BannerImage
                              alt={cat.title}
                              src={cat.image}
                              url={cat.url_key}
                            />
                            <div id="unbxd_category_top_sellers"></div>
                          </div>
                        </LazyLoad>
                      ) : (
                        ""
                      )}

                      {cat.component === 7 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <ShopOurBestSeller
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}

                      {cat.component === 8 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <ShopByBrands
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}

                      {cat.component === 9 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <LastInLine
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}

                      {cat.component === 10 ? (
                        <LazyLoad
                          placeholder={<PlaceHolderShimmer />}
                          height={150}
                        >
                          <Recommended
                            categoryName={cat.title}
                            data={cat.data}
                            component={cat.component}
                          />
                        </LazyLoad>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
              </Div>
            </Row>
          </Section>
          <NewUnboxBestSeller
            pageInfo={{
              pageType: "CATEGORY",
              catlevel1Name: "Tableware"
            }}
          />
        </div>
      </Section>
    );
  }
}

TableWareContainer.defaultProps = {
  category: [],
  seoInfo: {
    seo_text: ""
  }
};

TableWareContainer.propTypes = {
  category: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
