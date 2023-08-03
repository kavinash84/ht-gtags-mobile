import React from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import { Shimmer } from 'hometown-components/lib/Shimmer';
import { mapKey } from 'helpers/Constants';
import MapMarker from './MapMarker';

// const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');
// const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');

const Map = ({
  mapData, zoom, position, open, handleClick, selectedStore, currentLocation, gaVisitEvent
}) => (
  <GoogleMap zoom={parseInt(zoom, 10) || 16} center={position} options={{ mapTypeControl: false }}>
    {mapData.map(item => {
      const pos = item.position;
      return (
        <Marker
          position={pos}
          onClick={() => {
            handleClick(item.store, mapData, item.city);
          }}
        >
          <div>
            {open && selectedStore === item.store && (
              <InfoBox
                onCloseClick={() => {
                  handleClick(item.store, mapData, item.city);
                }}
                options={{
                  closeBoxURL: '',
                  enableEventPropagation: true,
                  pixelOffset: new window.google.maps.Size(-100, 165),
                  alignBottom: true
                }}
              >
                <MapMarker
                  store={item.store}
                  city={item.city}
                  address={item.address}
                  phone={item.phone}
                  position={item.position}
                  currentLocation={currentLocation}
                  gaVisitEvent={gaVisitEvent}
                />
              </InfoBox>
            )}
          </div>
        </Marker>
      );
    })}
  </GoogleMap>
);

Map.defaultProps = {
  position: {},
  mapData: [],
  selectedStore: '',
  currentLocation: {}
};
Map.propTypes = {
  position: PropTypes.object,
  zoom: PropTypes.number.isRequired,
  mapData: PropTypes.array,
  open: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedStore: PropTypes.string,
  currentLocation: PropTypes.object,
  gaVisitEvent: PropTypes.func.isRequired
};

const MapContainer = compose(
  withProps({
    /* eslint-disable max-len */
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: (
      <div style={{ height: '100%' }}>
        {/* <Shimmer height="450px" /> */}
        <div />
      </div>
    ),
    containerElement: <div style={{ height: '300px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => <Map {...props} />);

export default MapContainer;
