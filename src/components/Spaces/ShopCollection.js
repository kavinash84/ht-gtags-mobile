import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';

@connect(({ spaces }) => ({
  spaces,
  shopCollection: spaces.data.items.text.shopCollection
}))

export default class ShopByCollection extends Component {

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
    const { shopCollection } = this.props;
    return ( 
        <Div>
             <Div mb="-5px" mt="25px">
              <Heading
                fontFamily="medium"
                style={{ textAlign: 'center', color: '#323131' }}
                fontSize="22px"
                mt="0px"
                mb="10px"
              >
               {shopCollection.title}
              </Heading>
              <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
            </Div>
            <Div>
            {shopCollection.values.map(slide => (
              <Link to={slide.url_key}
              onClick={() => {
                sessionStorage.setItem('HiscrollPosition', window.pageYOffset);
              }}>
              <Div mt="40px">
                <Image data-src={slide.imgSrc} src={`${slide.imgSrc}?blur=30`} alt="collection"/>
            </Div>
            </Link>
            ))}
            </Div>
            
        </Div>
     );
}
}