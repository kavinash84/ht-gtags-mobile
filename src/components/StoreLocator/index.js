import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';
import { notifSend } from 'redux/modules/notifs';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import PropTypes from 'prop-types';
import { gaVisitEvent } from 'redux/modules/stores';
import { getDestination, getStores } from 'selectors/location';
import { getDistanceBetweenPoints } from 'utils/helper';
import Map from './Map';

const LoaderIcon = require('../../../static/refresh.svg');
const styles = require('./StoreLocator.scss');

const mapDispatchToProps = dispatch => bindActionCreators({ gaVisitEvent }, dispatch);
const mapStateToProps = ({ storelocator: { locationLoaded, locationLoading, data } }) => ({
  locationLoaded,
  locationLoading,
  data
});
class StoreLocator extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 21.821027, lng: 78.415743 }, // Default Centre of
      zoomlevel: 5,
      open: false,
      currentList: [],
      currentState: null,
      selectedStore: '',
      selectCity: false,
      nearMe: [],
      isLoading: false,
      currentLocation: {}
    };
    this.setCurrentList = this.setCurrentList.bind(this);
    this.GEORADIUS_OFFLINE = 120;
    this.GEORADIUS_ONLINE = 100000;
  }
  componentWillMount() {
    const { data } = this.props;
    if (data && data.items && data.items.text) {
      const mapData = data.items.text;
      this.setState({
        currentList: mapData
      });
    }
  }
  setCurrentList(elements) {
    const { nearMe } = this.state;
    const rawData = {};
    const rawIds = [];
    nearMe.forEach((item, i) => {
      const { distance = {}, duration = {} } = elements[i];
      if (distance.value && item.id && distance.value < this.GEORADIUS_ONLINE) {
        rawData[item.id] = {
          disText: distance.text || '',
          disValue: distance.value || '',
          duration: duration.text || ''
        };
        rawIds.push(item.id);
      }
    });
    const { data } = this.props;
    const stores = getStores(data);
    // const filteredStores = stores.filter(item => rawIds.indexOf(item.id) !== -1);
    const currentList = [];
    stores.forEach(item => {
      //eslint-disable-line
      const { id = '' } = item;
      if (rawData[id]) {
        currentList.push({
          ...item,
          ...rawData[id]
        });
      }
    });
    currentList.sort((a, b) => {
      const point1 = parseInt(a.disText || '', 10);
      const point2 = parseInt(b.disText || '', 10);
      return point1 - point2;
    });
    let lat = 0;
    currentList.map(item => {
      lat += item.position.lat;
      return 0;
    });
    lat /= currentList.length;
    let lng = 0;
    currentList.map(item => {
      lng += item.position.lng;
      return 0;
    });
    lng /= currentList.length;
    this.setState({
      currentList,
      position: { lat, lng },
      zoomlevel: 11,
      open: false
    });
  }
  getGoogleLatLng = locations => {
    const result = [];
    locations.forEach(location => {
      const { position: item } = location;
      if (item.lat && item.lng && window && window.google) {
        result.push(new window.google.maps.LatLng(item.lat, item.lng));
      }
    });
    return result;
  };
  nearByStores = (currentLocation, destinations) => {
    const { lat: lat1, lng: lng1 } = currentLocation;
    const stores = [];
    destinations.forEach(pos => {
      const { position } = pos;
      const { lat: lat2, lng: lng2 } = position;
      const dis = getDistanceBetweenPoints(lat1, lng1, lat2, lng2);
      const distance = Number(dis.toFixed(0));
      if (lat2 && lng2 && distance <= this.GEORADIUS_OFFLINE) {
        stores.push(pos);
      }
    });
    return stores;
  };
  setError = msg => {
    const { dispatch } = this.context.store;
    dispatch(notifSend({
      type: 'error',
      msg,
      dismissAfter: 4000
    }));
  };
  locationSuccess = position => {
    const lat = position.coords.latitude || '';
    const lng = position.coords.longitude || '';
    const { data: stores } = this.props;
    // setLocation(lat, lng);
    if (lat && lng && window && window.google) {
      const destinations = getDestination(stores);
      const nearByDestinations = this.nearByStores({ lat, lng }, destinations);
      const googleLatLng = this.getGoogleLatLng(nearByDestinations);
      const matrix = new window.google.maps.DistanceMatrixService();
      this.setState(
        {
          currentLocation: { lat, lng },
          nearMe: nearByDestinations,
          isLoading: true
        },
        () => {
          matrix.getDistanceMatrix(
            {
              origins: [new window.google.maps.LatLng(lat, lng)],
              destinations: googleLatLng,
              travelMode: window.google.maps.TravelMode.DRIVING
            },
            (response, status) => {
              if (status === 'OK') {
                this.setState({ isLoading: false }, () => {
                  const rows = response && response.rows ? response.rows[0] : {};
                  const elements = rows.elements || [];
                  this.setCurrentList(elements);
                });
              } else {
                this.setError('Error in getting near by stores, please try again !');
              }
            }
          );
        }
      );
    }
  };
  locationError = error => {
    const { code } = error;
    switch (code) {
      case 1:
        this.setError(`We need location permission, to fetch stores near you !
          Please provide permission by visiting Settings>location`);
        break;
      case 2:
        this.setError('Not able to detect current location, please select from the drop down!');
        break;
      case 3:
        this.setError('Location not available, please try after some time !');
        break;
      default:
    }
  };
  detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
    } else {
      this.setError('Unable to detect the current location !');
    }
  };
  handleClick = (store, mapData, city) => {
    const details = mapData.filter(item => item.store === store)[0];
    const { position } = details;
    const { open } = this.state;
    this.setState({
      position,
      open: !open,
      zoomlevel: 16,
      selectedStore: store
    });
    const { gaVisitEvent: recordStoreVisit } = this.props;
    recordStoreVisit({
      city,
      store,
      event: 'event storelocator',
      category: 'Storelocator'
    });
  };

  handleSelectState = (state, mapData) => {
    const currentList = mapData.filter(item => item.state === state);
    let lat = 0;
    currentList.map(item => {
      lat += item.position.lat;
      return 0;
    });
    lat /= currentList.length;
    let lng = 0;
    currentList.map(item => {
      lng += item.position.lng;
      return 0;
    });
    lng /= currentList.length;
    this.setState({
      currentList,
      position: { lat, lng },
      currentState: state,
      zoomlevel: 8,
      open: false,
      currentStore: false
    });
  };

  handleSelectCity = (city, list) => {
    const currentList = list.filter(item => item.city === city);
    let lat = 0;
    currentList.map(item => {
      lat += item.position.lat;
      return 0;
    });
    lat /= currentList.length;
    let lng = 0;
    currentList.map(item => {
      lng += item.position.lng;
      return 0;
    });
    lng /= currentList.length;
    this.setState({
      currentList,
      position: { lat, lng },
      zoomlevel: 11,
      open: false,
      currentStore: true
    });
  };

  render() {
    const { data, gaVisitEvent: recordGAEvent } = this.props;
    const mapData = data.items.text;
    const {
      position,
      zoomlevel,
      open,
      currentList,
      currentState,
      currentStore,
      selectedStore,
      isLoading,
      selectCity,
      currentLocation
    } = this.state;
    let stateList = mapData.map(item => item.state);
    let cityList = mapData.filter(item => item.state === currentState).map(item => item.city);
    cityList = cityList.filter((item, pos) => cityList.indexOf(item) === pos);
    stateList = stateList.filter((item, pos) => stateList.indexOf(item) === pos);
    return (
      <Div type="block" mt="24px">
        <Section bg="white" mb="0.3125rem" p="0.5rem" pr="0.5rem" pl="0.5rem">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontWeight="400">
                Store Locator
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section pt="0" p="0" mb="0" bg="lightGray">
          <Row display="block" mr="0" ml="0" mb="0">
            <Div className={styles.filterWrapper}>
              <button
                style={{ marginBottom: '4px', marginRight: '10px' }}
                onClick={e => {
                  e.preventDefault();
                  this.setState({ selectCity: true });
                }}
                className={styles.selectLocation}
              >
                Select Store
              </button>
              <button
                style={{ marginBottom: '4px' }}
                onClick={e => {
                  e.preventDefault();
                  this.detectUserLocation();
                }}
                className={styles.selectLocation}
              >
                {isLoading && <Img className="spin" src={LoaderIcon} display="inline" width="20px" va="sub" />}
                Store Near Me
              </button>
              {selectCity && (
                <select onChange={e => this.handleSelectState(e.target.value, mapData)}>
                  <option value={null} key="state">
                    SELECT STATE
                  </option>
                  {stateList.map(item => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}

              {selectCity && currentState && (
                <select onChange={e => this.handleSelectCity(e.target.value, mapData)}>
                  <option value={null} key="state">
                    SELECT CITY
                  </option>
                  {cityList.map(item => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}

              {currentStore && (
                <select onChange={e => this.handleClick(e.target.value, mapData)}>
                  <option value={null} key="store">
                    SELECT STORE
                  </option>
                  {currentList.map((item, index) => (
                    <option value={item.store} key={String(index)}>
                      {item.store}
                    </option>
                  ))}
                </select>
              )}
            </Div>
            <Div className={styles.googleMapWrapper}>
              <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '200px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                position={position}
                zoom={zoomlevel}
                mapData={mapData}
                open={open}
                handleClick={this.handleClick}
                selectedStore={selectedStore}
                currentLocation={currentLocation}
                gaVisitEvent={recordGAEvent}
              />
            </Div>
          </Row>
        </Section>
      </Div>
    );
  }
}
StoreLocator.propTypes = {
  data: PropTypes.object.isRequired,
  gaVisitEvent: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreLocator);
