import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';

@connect(({ spaces }) => ({
  spaces,
  kidsCollection: spaces.data.items.text.kidsCollection
}))

export default class KidsCollection extends Component {

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
    const { kidsCollection } = this.props;
    return (
        <Div width="100%" height="auto" bg="#FFF8F4" mt="40px">
             <Div mb="20px" mt="35px">
              <Heading
                fontFamily="medium"
                style={{ textAlign: 'center', color: '#323131' }}
                fontSize="22px"
                mt="0px"
                mb="10px"
              >
                {kidsCollection.title}
              </Heading>
              <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
            </Div>
            <Link to={kidsCollection.url_key}
            onClick={() => {
                sessionStorage.setItem('HiscrollPosition', window.pageYOffset);
              }}>
            <Div mt="10px" pb="30px">
                <Image data-src={kidsCollection.image} src={`${kidsCollection.image}?blur=30`} alt="kids"/>
            </Div>
            </Link>
        </Div>
     );
}
 
}