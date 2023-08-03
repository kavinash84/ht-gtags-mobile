import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import { connect } from 'react-redux';

const styles = require('./ModularKitchen.scss');

@connect(({ designBuild }) => ({
  designBuild,
  beginJourney: designBuild.data.items.text.beginJourney
}))
export default class BeginJourney extends Component {
  render() {
    const { beginJourney } = this.props;
    return (
      <Div style={{ backgroundColor: '#F5EEEE', padding: '20px 0px 0px 30px', textAlign: 'left', margin: '40px 0px' }}>
        <Div style={{ width: '100%', display: 'flex' }}>
          <Div style={{ width: '60%', padding: '5px 0px 30px' }}>
            <Div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '10px', color: 'black' }}>
              {beginJourney.title}
            </Div>
            <Button
              mt="20px"
              style={{
                borderColor: '#F47020',
                color: '#F47020',
                borderRadius: '5px'
              }}
              fontFamily="regular"
              height="50px"
              m="auto"
              pl="5%"
              pr="5%"
              onClick={this.props.handleModal}
            >
              Speak to our Expert
            </Button>
          </Div>
          <Div style={{ width: '40%' }}>
            <img data-src={beginJourney.imageSrc} src={`${beginJourney.imageSrc}?blur=30`} alt={beginJourney.title} style={{ width: '100%', height: '100%' }} />
          </Div>
        </Div>
      </Div>
    );
  }
}
