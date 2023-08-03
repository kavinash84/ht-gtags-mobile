import React, { Component } from 'react';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import { getCities } from 'selectors/homepage';
import { connect } from 'react-redux';
import ReclinerLandingContainer from '../../components/ReclinerLanding';

@connect(({ stores }) => ({
  cities: getCities(stores),
  stores: stores
}))
class ReclinerLanding extends Component {
  render() {
    const { cities, stores } = this.props;

    return (
      <div>
        <Menu addToHomeBtn />
        <ReclinerLandingContainer />
        <Footer />
      </div>
    );
  }
}

export default ReclinerLanding;
