import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PYK_URL } from 'helpers/Constants';
import Footer from 'components/Footer';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import ResponsiveModal from 'components/Modal';
import { sendData, getData } from 'redux/modules/services';

import Header from './Header';
import ModularKitchenFormModal from './ModularKitchenFormModal';

import './Slider.css';
import TopBanner from './topBanner';
import DesignByStyle from './designByStyle';
import DesignByRoom from './designByRoom';
import ServicesOffered from './servicesOffered';
import CustomerStories from './customarStories';
import ShopFurniture from './shopFurniture';
import DesignByRoomCommon from './DesignByRoomCommon';
import LetUsHelp from './letusHelp';

@connect(
  ({ services, homeInterior, userLogin, profile }) => ({
    homeInterior,
    livingRoom: homeInterior.data.items.text.livingRoom,
    Kitchen: homeInterior.data.items.text.Kitchen,
    bedRoom: homeInterior.data.items.text.bedRoom,
    isLoggedIn: userLogin.isLoggedIn,
    fullName: profile.data ? profile.data.full_name : undefined,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
export default class HomeInterior extends Component {
  state = {
    openModal: false,
    open: false,
    makeItOwnSelect: 'Organisers',
    organiser: true,
    handles: false,
    lights: false,
    countertops: false
  };
  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  handleModalWithSave = () => {
    this.setState({
      openModal: false,
      open: true
    });
  };

  render() {
    const { livingRoom, Kitchen, bedRoom, isLoggedIn, fullName, loading, loaded } = this.props;
    const correctIcon = require('../../../static/correct.svg');

    return (
      <Div display="block">
        <Header
          link={PYK_URL}
          text="Plan Your Kitchen"
          handleModal={this.handleModal}
          display={true}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
        />

        {/* Top banner*/}
        <TopBanner handleModal={this.handleModal} />

        {/* Services offered */}
        <ServicesOffered handleModal={this.handleModal} />

        {/* The Design And Build Advantage */}
        <DesignByStyle />

        {/* Design by room*/}
        <DesignByRoom />

        {/* Living Room */}
        <DesignByRoomCommon data={livingRoom} />

        {/* Kitchen Room */}
        <DesignByRoomCommon data={Kitchen} />

        {/* bedRoom Room */}
        <DesignByRoomCommon data={bedRoom} />

        {/* CustomerStories */}
        {/* <CustomerStories /> */}

        {/* shop furniture */}
        <ShopFurniture />

        {/* help u */}
        {/* <LetUsHelp /> */}

        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: 'mkModal' }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <ModularKitchenFormModal handleModalWithSave={this.handleModalWithSave} />
          </ResponsiveModal>

          {!loading && loaded ? (
            <ResponsiveModal
              classNames={{ modal: 'mkModal' }}
              onCloseModal={() => this.setState({ open: false })}
              open={this.state.open}
            >
              <Div
                mt="50px"
                p="50px 15%"
                style={{ backgroundColor: '#FFFFFF', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}
              >
                <Heading
                  ta="center"
                  fontSize="22px"
                  mb="50px"
                  mt="10px"
                  color="#000000"
                  style={{ whiteSpace: 'normal' }}
                >
                  Thank you for your Interest, Our Team will get in touch with you Shortly
                </Heading>
                <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" />
              </Div>
            </ResponsiveModal>
          ) : null}

          <Footer />
        </Section>
      </Div>
    );
  }
}

HomeInterior.defaultProps = {
  data: null
};
HomeInterior.propTypes = {
  data: PropTypes.object
};
