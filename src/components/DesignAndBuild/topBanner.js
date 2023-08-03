import React, { Component } from 'react';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';

const PinkishBG = require('../../../static/categories/pinkishBG.svg');

@connect(({ designBuild }) => ({
  designBuild,
  topBanner: designBuild.data.items.text.topBanner
}))
export default class TopBanner extends Component {
  render() {
    const { topBanner } = this.props;
    return (
      <Div style={{ width: '100%' }}>
        <Div style={{ width: '100%' }}>
          <Img data-src={topBanner.image} src={`${topBanner.image}?blur=30`} height="auto" />
        </Div>
        <Div style={{ width: '100%', marginTop: '-125px', display: 'flex', marginBottom: '20px' }}>
          <Div
            style={{
              margin: '20px',
              textAlign: 'center',
              backgroundColor: 'white',
              paddingBottom: '20px',
              boxShadow: '0px 15px 30px #00000029'
            }}
          >
            <Div>
              <Img src={PinkishBG}  height="auto" />
              <Div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <Text ta="center" style={{ lineHeight: '18px', marginTop: '-19px', color: 'black', fontSize: '28px' }}>
                  Design And Build
                </Text>
              </Div>
            </Div>
            <Text
              ta="center"
              fontSize="24px"
              style={{ lineHeight: '18px', color: 'black', fontWeight: 'bold', marginTop: '10px' }}
            >
              at Home<span style={{ color: '#F15922' }}>Town</span>
            </Text>
            <Text
              ta="center"
              fontSize="18px"
              color="#666666"
              mt="23px"
              ml="20px"
              mr="20px"
              style={{ lineHeight: 1.3 }}
            >
              {topBanner.description}
            </Text>
            <Button
              mt="20px"
              style={{
                borderColor: '#F47020',
                color: '#F47020',
                backgroundColor: '#FFFFFF',
                borderRadius: '5px'
              }}
              fontFamily="regular"
              height="50px"
              m="auto"
              pl="5%"
              pr="5%"
              onClick={this.props.handleModal}
            >
              Book a Consultation
            </Button>
          </Div>
        </Div>
      </Div>
    );
  }
}
