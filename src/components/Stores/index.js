import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
// import Title from 'components/Title';
import Section from "hometown-components/lib/Section";
import Container from "hometown-components/lib/Container";
import Row from "hometown-components/lib/Row";
import Div from "hometown-components/lib/Div";
import Heading from "hometown-components/lib/Heading";
import { bindActionCreators } from "redux";
// import { hyphenedString } from 'utils/helper';
import { filterStoreList } from "selectors/homepage";
import { setCity, gaVisitEvent } from "redux/modules/stores";
import { loadStores } from "redux/modules/stores";
import StoresCarouselItem from "./StoresCarouselItem";
import StoreListItem from "./StoreListItem";
import SlickSlider from "../SlickSlider";

// @connect(({ stores }) => ({
//   filteredStores: filterStoreList(stores),
//   stores
// }),)

const mapStateToProps = ({ stores }) => ({
  filteredStores: filterStoreList(stores),
  stores2: stores,
  stores
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSelectedCity: setCity, gaVisitEvent }, dispatch);

class StoresCarousel extends Component {
  state = {
    activeSlide: "AHMEDABAD",
    selectedStores: []
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  nextClick = e => {
    const { cities } = this.props;
    const actSlide = cities[e];
    this.setState({ activeSlide: actSlide });
  };
  componentDidMount() {
    const { dispatch } = this.context.store;
    dispatch(loadStores());
  }
  render() {
    const settings1 = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false,
      afterChange: this.nextClick
    };
    const settings2 = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false
      // afterChange: this.nextClick
    };
    const { cities, stores2, gaVisitEvent } = this.props;
    return (
      <Section p="0" pt="1rem" pb="0" mb="0" className="storeCarousel">
        <Container pr="0" pl="0" bg="">
          <Row type="block" m="0" mb="5px">
            {/* <Title title="Stores" subTitle="" /> */}
            <div
              style={{
                backgroundImage: "linear-gradient(to bottom, #EDEDED99, white)",
                margin: "0px 40px",
                width: "100%"
              }}
            >
              <Heading
                mb="5px"
                fontFamily="medium"
                fontSize="22px"
                m="auto"
                style={{ textAlign: "center", color: "#222222" }}
              >
                Stores
              </Heading>
            </div>
          </Row>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginBottom: "10px"
            }}
          />
          <Row type="block" m="0" mb="0.5rem">
            <Div col={12} p="0 0.75rem 0.5rem">
              <SlickSlider settings={settings1}>
                {cities.map((city, index) => (
                  <div key={String(index)}>
                    <StoresCarouselItem city={city} />
                  </div>
                ))}
              </SlickSlider>
              {stores2.data && (
                <SlickSlider settings={settings2}>
                  {stores2.data.items.text
                    .filter(
                      item => item.city.toUpperCase() === this.state.activeSlide
                    )
                    .map((store, index) => (
                      <StoreListItem
                        key={String(index)}
                        city={store.city}
                        store={store.store}
                        address={store.address}
                        pincode={store.pincode}
                        state={store.state}
                        phone={store.phone}
                        gaVisitHandler={gaVisitEvent}
                        url={
                          store.meta.url.length > 0
                            ? store.meta.url
                            : `/store/${hyphenedString(
                                store.city
                              ).toLowerCase()}/${hyphenedString(
                                store.store
                              ).toLowerCase()}`
                        }
                      />
                    ))}
                </SlickSlider>
              )}
            </Div>
          </Row>
        </Container>
      </Section>
    );
  }
}

StoresCarousel.defaultProps = {
  cities: []
};

StoresCarousel.propTypes = {
  cities: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresCarousel);
