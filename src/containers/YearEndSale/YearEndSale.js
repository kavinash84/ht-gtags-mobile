import React, { Component } from 'react';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import { getCities } from 'selectors/homepage';
import { connect } from 'react-redux';
import YearEndSaleContainer from '../../components/YearEndSale';

@connect(
    ({ stores , homepage : {categories} }) => ({
      cities: getCities(stores),
      stores: stores,
      homepageCategories: categories.data
    })
  )
class YearEndSale extends Component {
    render() { 
      const {
          cities,
          stores,
          homepageCategories
        } = this.props;

      return ( 
          <div>
            <Menu addToHomeBtn />
              <YearEndSaleContainer/>
              <Footer/>
          </div>
        );
    }
}
 
export default YearEndSale;