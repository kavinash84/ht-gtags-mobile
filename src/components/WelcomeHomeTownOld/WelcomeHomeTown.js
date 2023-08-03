import React, { Component } from 'react'
import WelcomeHome from '../../components/WelcomeHomeTown';
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
class WelcomeHomeTown extends Component {
    render() { 
      const {
          cities,
          stores
        } = this.props;
      return ( 
          <div>
            <Menu addToHomeBtn />
              <WelcomeHome/>
              {/* <LazyLoad height={168} once>
                <StoresCarousel cities={cities} />
              </LazyLoad> */}
              <Footer/>
          </div>
        );
    }
}
 
export default WelcomeHomeTown;