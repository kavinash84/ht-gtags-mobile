import React, { Component } from 'react'
import WelcomeHomeOld from '../../components/WelcomeHomeTownOld';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import { getCities } from 'selectors/homepage';
import StoresCarousel from 'components/Stores';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';

@connect(
    ({ stores }) => ({
      cities: getCities(stores),
      stores: stores
    })
  )
class WelcomeHomeTownOld extends Component {
    render() { 
      const {
          cities,
          stores
        } = this.props;
      return ( 
          <div>
            <Menu addToHomeBtn />
              <WelcomeHomeOld/>
              {/* <LazyLoad height={168} once>
                <StoresCarousel cities={cities} />
              </LazyLoad> */}
              <Footer/>
          </div>
        );
    }
}
 
export default WelcomeHomeTownOld;