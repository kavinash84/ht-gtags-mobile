import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SliderItem extends React.Component {
  render() {
    const { title, image, url, onClick, target } = this.props;
    if (!target && !url) {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a title={title} rel="noopener noreferrer">
          <img data-src={image} src={`${image}?blur=30`} alt={title} width='100%' height='220px'/>
        </a>
      );
    } else if (target) {
      return (
        <a
          href={url}
          title={title}
          target={target}
          rel="noopener noreferrer"
          onClick={onClick}
        >
          <img data-src={image} src={`${image}?blur=30`} alt={title} width='100%' height='220px' />
        </a>
      );
    }
    return (
      <Link
        to={url}
        onClick={() => {
          sessionStorage.setItem("Bannerscroll", window.pageYOffset);
          onClick();
        }}
      >
        <img data-src={image} src={`${image}?blur=30`} alt={title} width='100%' height='220px' />
      </Link>
    );
  }
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("Bannerscroll");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("Bannerscroll");
      }, 2000);
    }
  };
}
SliderItem.defaultProps = {
  title: "",
  image: "",
  target: ""
};

SliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
export default SliderItem;
