import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'components/Menu';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
// import Container from 'hometown-components/lib/Container';
import { connect } from 'react-redux';
// import BreadCrumb from './BreadCrumb';

/* ====== Selectors ====== */
import { getText } from 'selectors/homepage';
import ShopByCategories from '../../components/furnitureCategories/shopByCategories';
import ShopByRooms from '../../components/furnitureCategories/shopByRooms';
import GridSystem from '../../components/furnitureCategories/gridSystem';
import ShopByEssentials from '../../components/furnitureCategories/shopByEssentials';
import MainFurnitureSlider from '../../components/furnitureCategories/mainSlider';
import NewAndNow from '../../components/furnitureCategories/newAndNow';
import ShopOurBestSeller from '../../components/furnitureCategories/shopOurBestSeller';
import BannerImage from '../../components/furnitureCategories/bannerImage';
import FurnitureBreadCrumb from './furnitureBredCumb';

const styles = require('./BreadCrumb.scss');

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
        return 'linear-gradient(to right, rgb(234, 234, 234), white)';
        break;
      case 5:
        return '#F9F9F9';
        break;
      case 13:
        return '#F5EEEE';
        break;
      default:
        return '#FFFFFF';
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
          <div className={styles.BreadCrumb_wrapper}>
            <FurnitureBreadCrumb urlKey="furniture" name={pageTitle} />
          </div>
          {category && <MainFurnitureSlider data={category.main} mb="0" />}
          <Section pr="0" pl="0">
            <Row display="block" pt="1rem">
              <Div col={12}>
                {category &&
                  category.sections &&
                  category.sections.map((cat, index) => (
                    <div key={String(index)} style={{ background: this.getBgColor(cat.component), width: '100%' }}>
                      {cat.component === 1 ? (
                        <ShopByCategories categoryName={cat.title} data={cat.data} component={cat.component} />
                      ) : (
                        ''
                      )}
                      {cat.component === 2 ? (
                        <ShopByRooms categoryName={cat.title} data={cat.data} component={cat.component} />
                      ) : (
                        ''
                      )}
                      {[3, 4, 6, 8, 9, 10, 11, 12, 14].includes(cat.component) ? (
                        <GridSystem categoryName={cat.title} data={cat.data} component={cat.component} />
                      ) : (
                        ''
                      )}
                      {cat.component === 5 ? (
                        <ShopByEssentials categoryName={cat.title} data={cat.data} component={cat.component} />
                      ) : (
                        ''
                      )}
                      {cat.component === 7 ? (
                        <NewAndNow categoryName={cat.title} data={cat.data} component={cat.component} />
                      ) : (
                        ''
                      )}
                      {cat.component === 13 ? (
                        <ShopOurBestSeller categoryName={cat.title} data={cat.data} component={cat.component} />
                      ) : (
                        ''
                      )}
                      {[20, 30].includes(cat.component) ? (
                        <BannerImage alt={cat.title} src={cat.image} url={cat.url_key} />
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
              </Div>
            </Row>
          </Section>
        </div>
      </Section>
    );
  }
}

FurniturContainer.defaultProps = {
  category: [],
  seoInfo: {
    seo_text: ''
  }
};

FurniturContainer.propTypes = {
  category: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  seoInfo: PropTypes.object
};
