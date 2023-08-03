import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SpaceItems = ({
  title, image, url, onClick, target
}) => {
  if (!target && !url) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a title={title} rel="noopener noreferrer">
        <img data-src={image} src={`${image}?blur=30`} alt={title} width="100%" />
      </a>
    );
  } else if (target) {
    return (
      <a href={url} title={title} target={target} rel="noopener noreferrer" onClick={onClick}>
        <img data-src={image} src={`${image}?blur=30`} alt={title} width="100%" />
      </a>
    );
  }
  return (
    <Link to={url} onClick={onClick}>
      <img data-src={image} src={`${image}?blur=30`} alt={title} width="100%" />
    </Link>
  );
};

SpaceItems.defaultProps = {
  title: '',
  image: '',
  target: ''
};

SpaceItems.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default SpaceItems;
