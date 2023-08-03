import React, { Component } from 'react';
import SlickSlider from 'components/SlickSlider';
import Div from 'hometown-components/lib/Div';

const styles = require('./TextCarousel.scss');

export class TextCarousel extends Component {
//   state = {
//     textData: [
//       {
//         text: 'Free Delivery'
//       },
//       {
//         text: 'Free Installation'
//       },
//       {
//         text: 'Four Free Service camps'
//       },
//       {
//         text: 'Free and Safe Delivery'
//       }
//     ]
//   };
  render() {
    const { textData } = this.props;
    return (
      <Div m="0px" mb="0px">
        <SlickSlider mb="0px">
          {textData.map(slide => (
            <div className={styles.example1}>
              <h3>{slide.text}</h3>
            </div>
          ))}
        </SlickSlider>
      </Div>
    );
  }
}

export default TextCarousel;
