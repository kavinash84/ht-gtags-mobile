import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./MapMarker.scss');
const storeStyle = require('./StoreLocator.scss');

const openLocationWindow = (position, currentLocation) => {
  const { lat = '', lng = '' } = currentLocation;
  const baseUrl = 'http://maps.google.com/?';
  const origin = `saddr=${lat},${lng}`;
  const destination = `&daddr=${position.lat}, ${position.lng}`;
  const mapURL = `${baseUrl}${origin}${destination}`;
  window.open(mapURL, '_blank');
};
const MapMarker = ({
  city, store, address, phone, position, currentLocation, gaVisitEvent
}) => (
  <div className={styles.mapMarker}>
    <div>{store}</div>
    <div>{address}</div>
    <div>{phone}</div>
    <div>
      <button
        onClick={e => {
          e.stopPropagation();
          gaVisitEvent({
            city,
            store,
            event: 'event storelocator',
            category: 'Storelocator - Location'
          });
          openLocationWindow(position, currentLocation);
        }}
        className={storeStyle.directionBtn}
      >
        Direction
      </button>
    </div>
  </div>
);
MapMarker.defaultProps = {
  currentLocation: {}
};
MapMarker.propTypes = {
  city: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  currentLocation: PropTypes.object,
  gaVisitEvent: PropTypes.func.isRequired
  // position: PropTypes.object.isRequired
};
export default MapMarker;
