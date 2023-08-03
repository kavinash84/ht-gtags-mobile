import React from 'react';
import Section from 'hometown-components/lib/Section';
// import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Box from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';
import { Link } from 'react-router-dom';

const StyleYourHome = ({ categoryName, data, component }) => {
  return (
    <Section p="0" pt="0" className="catCarousel" mb="0">
      <Section pr="15px" pl="0" mb="0px">
        {component === 14 ? (
          <Div mb="15px" mt="10px">
            <Heading
              fontFamily="medium"
              style={{ textAlign: 'left', color: '#323131' }}
              fontSize="22px"
              mt="10px"
              mb="-10px"
              ml="10%"
            >
              {categoryName}
            </Heading>
          </Div>
        ) : (
          <Div mb="15px" mt="10px" ml="10px">
            <Heading
              fontFamily="medium"
              style={{ textAlign: 'center', color: '#323131' }}
              fontSize="22px"
              mt="0px"
              mb="10px"
            >
              {categoryName}
            </Heading>
            <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
          </Div>
        )}

        <Row justifyContent="center" style={{ width: '100%', margin: 'auto 0 auto 7px' }}>
          {data.map(slide => (
            <Box style={{ width: '40%', margin: '5px 10px' }}>
              <Link to={slide.url_key}>
                <Image data-src={slide.image} src={`${slide.image}?blur=30`} alt={slide.title} m={5} height="auto" width="100%" />
                <Text fontSize="14px" color="label" mt="5px" style={{ textAlign: 'center' }}>
                  {slide.title}
                </Text>
              </Link>
            </Box>
          ))}
        </Row>
      </Section>
    </Section>
  );
};

export default StyleYourHome;
