import React, { Component } from 'react';
import './TextCarousel.css';
import SlickSlider from 'components/SlickSlider';
import Div from 'hometown-components/lib/Div';

export class TextCarousel extends Component {
  // state = {
  //   textData: [
  //     {
  //       text: "Free Delivery"
  //     },
  //     {
  //       text: "Free Installation"
  //     },
  //     {
  //       text: "Four Free Service camps"
  //     },
  //     {
  //       text: "Free and Safe Delivery"
  //     }
  //   ]
  // };
  render() {
    const { data } = this.props;
    return (
      <Div m="0px" mb="0px">
        <SlickSlider mb="0px">
          {data.map(slide => (
            <div className="example1">
              <h3>{slide.marq}</h3>
            </div>
          ))}
        </SlickSlider>
      </Div>
    );
  }
}

export default TextCarousel;
