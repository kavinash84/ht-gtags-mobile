import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Arrivals from './Arrivals';
import ShopByCategory from './ShopCategory';
import ShopByCollection from './ShopCollection';
import KidsCollection from './KidsCollection';
import Image from 'hometown-components/lib/Img';
import SpaceSlider from './SpaceSlider';
import OfferZone from './OfferZone';

@connect(({ spaces }) => ({
  spaces,
  general: spaces.data.items.text.general,
  topBanner: spaces.data.items.text.topBanner,
  offerZone: spaces.data.items.text.offerZone
}))

class SpacesContainer extends React.Component {

  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('HiscrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem('HiscrollPosition');
      }, 2000);
    }
  };
    render() { 
      const { general, topBanner, offerZone } = this.props;
        return (
            <Section p="0" mb="0">
                {/* <MainFurnitureSlider data={category.main} mb="0" /> */}
                <SpaceSlider data={topBanner.values} mb="0" />
                <Arrivals/>
                <ShopByCategory/>
                <ShopByCollection/>
                <KidsCollection/>
                <Div>
                {general.values.map(slide => (
              <Link to={slide.url_key}
              onClick={() => {
                sessionStorage.setItem('HiscrollPosition', window.pageYOffset);
              }}>
              <Div mt="40px">
                <Image data-src={slide.imgSrc} alt="general"/>
            </Div>
            </Link>
            ))}
                </Div>

                <Div pl="30px" mt="40px" pr="30px" pt="30px" pb="20px" bg="#F9F9F9">
            <OfferZone  colSize="45%"  data={offerZone.values} />
          </Div>
            </Section>
            
        );
    }
}
 
export default SpacesContainer;