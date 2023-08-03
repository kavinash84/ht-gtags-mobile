import React, { Component } from 'react';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import { getCities } from 'selectors/homepage';
import { connect } from 'react-redux';
import BedLandingContainer from '../../components/BedLanding';

@connect(
    ({ stores }) => ({
      cities: getCities(stores),
      stores: stores
    })
  )
class BedLanding extends Component {
    render() { 
      const {
          cities,
          stores
        } = this.props;

      return ( 
          <div>
            <Menu addToHomeBtn />
              <BedLandingContainer/>
              <Footer/>
          </div>
        );
    }
}
 
export default BedLanding;