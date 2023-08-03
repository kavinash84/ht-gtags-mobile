import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Image from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';

@connect(({ spaces }) => ({
  spaces,
newArrivals: spaces.data.items.text.newArrivals
}))

export default class Arrivals extends Component {

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
    const { newArrivals } = this.props;
    return ( 
        <Div>
             <Div mb="25px" mt="50px">
              <Heading
                fontFamily="medium"
                style={{ textAlign: 'center', color: '#323131' }}
                fontSize="22px"
                mt="0px"
                mb="10px"
              >
                New Arrivals
              </Heading>
              <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
            </Div>
            <Link to={newArrivals.url_key}
            onClick={() => {
                sessionStorage.setItem('HiscrollPosition', window.pageYOffset);
              }}>
            <Div mt="0px">
                <Image data-src={newArrivals.image} src={`${newArrivals.image}?blur=30`} alt="arrival"/>
            </Div>
            </Link>
        </Div>
     );
}
}
