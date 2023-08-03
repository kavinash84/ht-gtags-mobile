import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

const BrandCategories = ({ brandCategories }) => (
  <Fragment>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      {brandCategories.map(category => (
        <div style={{ width: '40%' }}>
          <Link to={category.url}>
            <Image src={category.image_url} width="100%" />
          </Link>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1rem',
              padding: '10px 0px',
              color: 'rgba(0,0,0,0.75)'
            }}
          >
            {category.name}
          </p>
        </div>
      ))}
    </div>
  </Fragment>
);

BrandCategories.propTypes = {
  brandCategories: PropTypes.array.isRequired
};

export default BrandCategories;
