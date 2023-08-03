import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Image from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';

@connect(({ spaces }) => ({
  spaces,
shopCategory: spaces.data.items.text.shopCategory
}))

export default class ShopByCategory extends Component {

  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem('HiscrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem('HiscrollPosition');
      }, 2000);
    }
  };

  render() {
    const { shopCategory } = this.props;
    return ( 
        <Section p="0" pt="0" className="catCarousel" mb="0">
      <Section pr="15px" pl="0" mb="0px">
         
          <Div mb="25px" mt="40px" ml="10px">
            <Heading
              fontFamily="medium"
              style={{ textAlign: 'center', color: '#323131' }}
              fontSize="22px"
              mt="0px"
              mb="10px"
            >
              {shopCategory.title}
            </Heading>
            <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
          </Div>

        <Row justifyContent="center" style={{ width: '100%', margin: 'auto', marginLeft: '8px' }}>
          {shopCategory.values.map(slide => (
            <Div style={{ width: '40%', margin: '10px 15px' }}>
              <Link to={slide.url_key}
              onClick={() => {
                sessionStorage.setItem('HiscrollPosition', window.pageYOffset);
              }}>
                <Image data-src={slide.imgSrc} src={`${slide.imgSrc}?blur=30`} alt={slide.title} m={5} height="auto" width="100%" />
                <Text fontSize="10pt" color="label" mt="5px" style={{ textAlign: 'center' }}>
                 {slide.title}
                </Text>
              </Link>
            </Div>
            ))}
        </Row>
      </Section>
    </Section>
       
     );
}
}