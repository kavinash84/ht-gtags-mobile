import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Box from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';

@connect(({ homeInterior }) => ({
  homeInterior,
  servicesOffered: homeInterior.data.items.text.servicesOffered
}))
export default class ServicesOffered extends Component {
  render() {
    const { servicesOffered, handleModal } = this.props;
    return (
      <Section pr="15px" pl="0" pr="0px" mb="0px">
        <Div mb="25px" mt="25px" style={{ padding: '0px 20px' }}>
          <Heading
            fontFamily="medium"
            style={{ textAlign: 'center', color: '#323131' }}
            fontSize="22px"
            mt="0px"
            mb="10px"
          >
            {servicesOffered.title}
          </Heading>
          <Text style={{ color: '#888888', marginBottom: '0px', textAlign: 'center' }}>
            {servicesOffered.description}
          </Text>
        </Div>

        <Row justifyContent="center" style={{ width: '100%', margin: 'auto' }}>
          {servicesOffered.values.map(slide => (
            <Box style={{ width: '40%', margin: '0px 10px 10px' }}>
              <Image data-src={slide.imgSrc} src={`${slide.imgSrc}?blur=30`} alt={slide.title} m={5} height="auto" width="100%" />
              <Text
                fontSize="10pt"
                color="label"
                mt="5px"
                style={{ textAlign: 'center', color: 'black', fontWeight: '600' }}
              >
                {slide.title}
              </Text>
            </Box>
          ))}
        </Row>
        <Div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '20px 25px' }}>
          <Button
            style={{
              borderColor: '#F47020',
              color: '#F47020',
              backgroundColor: '#FFFFFF',
              borderRadius: '5px'
            }}
            fontFamily="regular"
            height="50px"
            pl="8%"
            pr="8%"
            width="100%"
            onClick={handleModal}
          >
            Speak To Our Designer
          </Button>
        </Div>
      </Section>
    );
  }
}
