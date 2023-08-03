import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';

const prevIcon = require('../../../static/left-arrow.png');
const nextIcon = require('../../../static/right-arrow.png');

const styles = require('./ProductZoom.scss');

export default class ProductZoom extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    currentImage: 0,
    previousDisabled: true,
    nextDisabled: false
  };

  setDisable = () => {
    if (this.state.currentImage === this.props.images.length - 1) {
      this.setState({
        nextDisabled: true,
        previousDisabled: false
      });
    } else if (this.state.currentImage === 0) {
      this.setState({
        previousDisabled: true,
        nextDisabled: false
      });
    } else {
      this.setState({
        previousDisabled: false,
        nextDisabled: false
      });
    }
  };

  setCurrentImage = name => {
    if (name === 'previous' && !this.state.previousDisabled > 0) {
      this.setState(
        {
          currentImage: this.state.currentImage - 1
        },
        this.setDisable
      );
    }
    if (name === 'next' && !this.state.nextDisabled) {
      this.setState(
        {
          currentImage: this.state.currentImage + 1
        },
        this.setDisable
      );
    }
  };
  changeImage = e => {
    const { name } = e.target;
    this.setCurrentImage(name);
  };
  componentWillMount() {
    const { startimage } = this.props;
    this.setState(
      {
        currentImage: startimage
      },
      this.setDisable
    );
  }

  render() {
    const { images } = this.props;
    const { currentImage, nextDisabled, previousDisabled } = this.state;
    return (
      <div className={styles.prodZoomView}>
        <Row ml="0" mr="0">
          <Div col="12">
            {
              <div className={styles.imgSliderContainer}>
                {images.length > 0 &&
                  !previousDisabled && (
                  <button name="previous" className={styles.previous} onClick={this.changeImage}>
                    <Img name="previous" width="40px" height="40px" src={prevIcon} alt="Prev" />
                  </button>
                )}
                <div className={styles.imageContainer}>
                  <img src={images && images[currentImage] && `${images[currentImage].url}.jpg?mode=fill&dpr=2.0&h=376`} alt="" />
                </div>
                {images.length > 0 &&
                  !nextDisabled && (
                  <button name="next" className={styles.next} onClick={this.changeImage}>
                    <Img name="next" width="40px" height="40px" src={nextIcon} alt="Next" />
                  </button>
                )}
              </div>
            }
          </Div>
        </Row>
      </div>
    );
  }
}
ProductZoom.defaultProps = {
  images: [],
  startimage: 0
};
ProductZoom.propTypes = {
  images: PropTypes.array,
  startimage: PropTypes.number
};
