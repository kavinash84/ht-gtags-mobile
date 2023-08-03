import React from 'react';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';

const styles = require('./ModularKitchen.scss');

const WhyChooseUs = ({ whyChooseUs }) => (
  <Div mt="30px" mb="30px">
    <Div>
      <Img data-src={whyChooseUs.image} src={`${whyChooseUs.image}?blur=30`} alt={whyChooseUs.title} />
    </Div>
    <Div style={{ display: 'flex' }}>
      <Div
        style={{
          width: '85%',
          margin: 'auto',
          boxShadow: '0px 15px 30px #00000029',
          backgroundColor: '#FFFFFF',
          marginTop: '-50px'
        }}
      >
        <Heading
          pt="15px"
          color="#222222"
          fontSize="22px"
          ta="center"
          fontWeight="bold"
          style={{
            lineHeight: '31px'
          }}
          mb="10px"
        >
          {whyChooseUs.title}
        </Heading>
        <Text color="#888888" fontSize="14px" ta="center" pl="20px" pr="20px" mb="30px" style={{ lineHeight: '24px' }}>
          {whyChooseUs.description}
        </Text>
        <Div style={{ display: 'flex' }}>
          <div
            className={styles.gradient}
            style={{
              width: '90%',
              padding: '0px 20px 15px',
              margin: 'auto'
            }}
          >
            {whyChooseUs.data.map((val, index) => (
              <Text fontSize="16px" p="10px 0px" key={index} style={{ fontWeight: 'bold' }}>
                {val.text.split(' ')[0]}{' '}
                <span style={{ fontWeight: 'normal' }}>
                  {val.text
                    .split(' ')
                    .slice(1, val.text.split(' ').length)
                    .join(' ')}
                </span>
              </Text>
            ))}
          </div>
        </Div>
      </Div>
    </Div>
  </Div>
);

export default WhyChooseUs;
