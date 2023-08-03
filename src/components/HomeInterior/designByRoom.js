import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import { connect } from 'react-redux';

@connect(({ homeInterior }) => ({
  homeInterior,
  designByRoom: homeInterior.data.items.text.designByRoom
}))
export default class DesignByRoom extends Component {
  render() {
    const { designByRoom } = this.props;
    return (
      <Div style={{ backgroundColor: '#F5F5F5', padding: '30px 30px 20px', textAlign: 'center', marginTop: '10px' }}>
        <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: 'black' }}>
          {designByRoom.title}
        </Div>
        <Text style={{ color: '#888888', textAlign: 'center' }}>{designByRoom.description}</Text>
      </Div>
    );
  }
}
