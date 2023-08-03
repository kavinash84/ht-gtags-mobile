import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Box from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';

@connect(({ homeInterior }) => ({
  homeInterior,
  letUsHelpu: homeInterior.data.items.text.letUsHelpu
}))
export default class LetUsHelp extends Component {
  render() {
    const { letUsHelpu } = this.props;
    return (
      <Section pr="15px" pl="0" pr="0px" mb="0px">
        <Div mb="10px" mt="20px" style={{ padding: '0px 25px' }}>
          <Heading
            fontFamily="medium"
            style={{ textAlign: 'left', color: '#323131' }}
            fontSize="20px"
            mt="0px"
            mb="10px"
          >
            {letUsHelpu.title}
          </Heading>
        </Div>

        <Row justifyContent="center" style={{ width: '100%', margin: 'auto' }}>
          {letUsHelpu.values.map(slide => (
            <Box style={{ width: '40%', margin: '0px 10px 10px' }}>
              <Link to={slide.url_key}>
                <Image data-src={slide.imgSrc} src={`${slide.imgSrc}?blur=30`} alt={slide.title} m={5} height="auto" width="100%" />
                <Text fontSize="10pt" color="label" mt="5px" style={{ textAlign: 'center', color: 'black' }}>
                  {slide.title}
                </Text>
              </Link>
            </Box>
          ))}
        </Row>
      </Section>
    );
  }
}
