import React, { Component } from 'react';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Button from 'hometown-components/lib/Buttons';

@connect(({ modularWardrobe }) => ({
  modularWardrobe,
  newWardrobe: modularWardrobe.data.items.text.newWardrobe
}))
export default class NewWardrobe extends Component {
  render() {
    const { newWardrobe } = this.props;
    return (
      <Div mt="60px" mb="50px">
        <Div>
          <Img data-src={newWardrobe.image} src={`${newWardrobe.image}?blur=30`} alt={newWardrobe.title} height="auto" />
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
              {newWardrobe.title}
            </Heading>
            <Div p="0px 10px" pr="0px">
              {newWardrobe.texts.map((val, index) => (
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
                      fontSize: '12px',
                     fontWeight:'bold'
                    }}
                    mr="15px"
                    fontSize="12px"
                  >
                    {val.number}
                  </Div>
                  <Div mt="8px" mb="5px" style={{fontSize:'14px', color:'#323131'}}>
                    {val.value}
                  </Div>
                </Div>
              ))}
              <div
                style={{
                  height: '120px',
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
