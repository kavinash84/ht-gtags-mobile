import React, { Component } from 'react';
import Menu from 'components/OtherMenu';
import TrackOrderDetailsContainer from 'components/TrackOrder/TrackOrderDetails';

export default class TrackOrderDetails extends Component {
  render() {
    return (
      <div>
        <Menu />
        <TrackOrderDetailsContainer />
      </div>
    );
  }
}
