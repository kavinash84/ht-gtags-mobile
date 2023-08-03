import React, { Component } from 'react';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';

@connect(({ designBuild }) => ({
  designBuild,
  stepsToHome: designBuild.data.items.text.stepsToHome
}))
export default class StepsToHome extends Component {
  render() {
    const { stepsToHome } = this.props;
    return (
      <Div mt="20px" mb="50px">
        <Div style={{ height: '315px' }}>
          <Img
            data-src={stepsToHome.image}
            alt={stepsToHome.title}
            height="auto"
            style={{ height: '100%', width: 'auto', margin: 'auto' }}
          />
        </Div>

        <Div style={{ display: 'flex' }}>
          <Div
            m="auto"
            mt="-50px"
            style={{
              width: '80%',
              border: '1px solid #FCE1D1',
              borderRadius: '5px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 5px 10px #0000001A'
            }}
            p="10px 30px"
            pb="30px"
          >
            <Heading
              ta="center"
              color="#1D1D1D"
              fontSize="22px"
              fontFamily="regular"
              style={{ whiteSpace: 'normal', lineHeight: '31px' }}
            >
              {stepsToHome.title}
            </Heading>
            <Div p="0px 20px" pr="0px">
              {stepsToHome.texts.map((val, index) => (
                <Div key={index} style={{ display: 'flex' }}>
                  <Div
                    mt="5px"
                    mb="5px"
                    style={{
                      width: '25px',
                      height: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#E0DFDF',
                      borderRadius: '50%',
                      fontSize: '14px'
                    }}
                    mr="15px"
                    fontSize="12px"
                  >
                    {val.number}
                  </Div>
                  <Div fontSize="14px" mt="8px" mb="5px">
                    {val.value}
                  </Div>
                </Div>
              ))}
              <div
                style={{
                  height: '180px',
                  width: '1px',
                  border: '1px dashed #E0DFDF',
                  marginTop: '10px',
                  marginLeft: '10px'
                }}
              ></div>
            </Div>
            <Div ta="center" mt="30px">
              <Button
                type="button"
                btnType="custom"
                p="8px 12px"
                bg="white"
                color="#F47020"
                style={{ fontSize: '14px' }}
                onClick={this.props.handleModal}
              >
                Speak to our Experts
              </Button>
            </Div>
          </Div>
        </Div>
      </Div>
    );
  }
}
