import React, { Component } from 'react';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import { getCities } from 'selectors/homepage';
import { connect } from 'react-redux';
import SofaLandingContainer from '../../components/SofaLanding';

@connect(
    ({ stores }) => ({
      cities: getCities(stores),
      stores: stores
    })
  )
class SofaLanding extends Component {
    render() { 
      const {
          cities,
          stores
        } = this.props;

      return ( 
          <div>
            <Menu addToHomeBtn />
              <SofaLandingContainer/>
              <Footer/>
          </div>
        );
    }
}
 
export default SofaLanding;