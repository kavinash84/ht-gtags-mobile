import React, { Component } from 'react';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';

const PinkishBG = require('../../../static/categories/pinkishBG.svg');

@connect(({ modularWardrobe }) => ({
  modularWardrobe,
  topBanner: modularWardrobe.data.items.text.topBanner
}))
export default class TopBanner extends Component {
  render() {
    const { topBanner } = this.props;
    return (
      <Div style={{ width: '100%' }}>
        <Div style={{ width: '100%' }}>
          <Img data-src={topBanner.image} src={`${topBanner.image}?blur=30`} height="auto" />
        </Div>
        <Div style={{ width: '100%', marginTop: '0px', display: 'flex', marginBottom: '20px' }}>
          <Div
            style={{
              textAlign: 'center',
              backgroundColor: 'white',
              paddingBottom: '20px',
              boxShadow: '0px 15px 30px #00000029'
            }}
          >
            <Text ta="center" fontSize="16px" color="#666666" width="50%" m="auto" pl="15%" pr="15%" pt="10px">
              {topBanner.description}
            </Text>
            <Button
              mt="10px"
              style={{
                borderColor: '#F47020',
                color: '#F47020',
                backgroundColor: '#FFFFFF',
                borderRadius: '5px'
              }}
              fontFamily="regular"
              height="50px"
              m="auto"
              pl="8%"
              pr="8%"
              onClick={this.props.handleModal}
            >
              Speak To Our Designer
            </Button>
          </Div>
        </Div>
      </Div>
    );
  }
}
