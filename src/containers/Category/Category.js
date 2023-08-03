import React, { Component } from "react";
import PropTypes from "prop-types";
import Menu from "components/Menu";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Row from "hometown-components/lib/Row";
import Container from "hometown-components/lib/Container";
import Button from "hometown-components/lib/Buttons";
import Theme from "hometown-components/lib/Theme";
import { connect } from "react-redux";
import Footer from "components/Footer";
import Helmet from "react-helmet";
import CommonLayout from "components/Category/CommonLayout";
import UnbxdTopSellers from "components/Category/UnbxdTopSellers";
import MainSlider from "components/MainSlider";
import SeoContent from "components/SeoContent";
import BreadCrumb from "./BreadCrumb";
import { Redirect } from "react-router-dom";
// import FurniturContainer from './furnitureContainer';
import FurniturContainer from "components/furnitureCategories/furnitureContainer";
import HomewareContainer from "components/HomewareCat/HomewareContainer";
import KitchenWareContainer from "components/HomewareCat/KitchenWareContainer";
import FurnishingContainer from "components/HomewareCat/FurnishingContainer";
import TableWareContainer from "components/HomewareCat/TableWareContainer";
import NewUnboxBestSeller from "components/NewUnboxWidges/bestSeller";

/* ====== Selectors ====== */
import { getText } from "selectors/homepage";

@connect(({ homepage: { menu }, category, category: { data } }) => ({
  menu: menu.data,
  category: data && data.items && data.items.text,
  categoryText: getText(category),
  seoInfo: data && data.seo && data.seo.items
}))
export default class Category extends Component {
  state = {
    showmore: true
  };
  handleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };

  render() {
    const {
      category,
      seoInfo,
      categoryText: { title: pageTitle },
      match: {
        params: { category: currentCategory }
      }
    } = this.props;
    const { showmore } = this.state;
    return (
      <Section p="0" mb="0">
        <Helmet
          title={`${(seoInfo && seoInfo.page_title) ||
            (currentCategory && currentCategory.toUpperCase())}`}
        >
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
        </Helmet>
        {currentCategory === "furniture" ? (
          <FurniturContainer />
        ) : currentCategory === "home-decor" ? (
          <HomewareContainer />
        ) : // ) : currentCategory === "kitchenware" ? (
        //   <KitchenWareContainer />
        currentCategory === "home-furnishings" ? (
          <FurnishingContainer />
        ) : currentCategory === "tableware-kitchenware" ? (
          <TableWareContainer />
        ) : currentCategory === "tableware" ? (
          <Redirect to="/tableware-kitchenware" />
        ) : currentCategory === "kitchenware" ? (
          <Redirect to="/tableware-kitchenware" />
        ) : (
          <div>
            <div className="wrapper">
              <Menu backBtn={false} />
              {category && <MainSlider data={category.main} mb="0" />}

              {/* Breadcrumb */}
              <Section display="flex" p="15px 1rem" mb="0" bg="sectionBgDark">
                <BreadCrumb urlKey={currentCategory} name={pageTitle} />
              </Section>
              <Container pr="0" pl="0">
                <Row display="block" pt="1rem" ml="5px" mr="5px">
                  <Div col={12}>
                    {category &&
                      category.sections &&
                      category.sections.map((cat, index) => (
                        <div key={String(index)}>
                          {CommonLayout(
                            cat.component,
                            cat.title,
                            cat.data,
                            cat.grid
                          )}
                        </div>
                      ))}
                  </Div>
                </Row>
                {category && (
                  <NewUnboxBestSeller
                    pageInfo={{
                      pageType: "CATEGORY",
                      catlevel1Name: category.title
                    }}
                  />
                )}
              </Container>
            </div>
            {/* eslint-disable react/no-danger */}
          </div>
        )}

        {seoInfo && seoInfo.seo_text && (
          <SeoContent>
            <div
              dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }}
              className={showmore ? "showLessSeo" : "showMoreSeo"}
            />
            <Button
              pl="0"
              pr="0"
              mb="0"
              size="block"
              ta="left"
              color={Theme.colors.primary}
              btnType="link"
              fontSize="0.875rem"
              className="seoMoreBtn"
              onClick={this.handleShowMore}
            >
              {showmore ? "Show More..." : "Show Less"}
            </Button>
          </SeoContent>
        )}

        <Footer />
      </Section>
    );
  }
}

Category.defaultProps = {
  category: [],
  seoInfo: {
    seo_text: ""
  }
};

Category.propTypes = {
  category: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
