import React from 'react';
import { Link } from 'react-router-dom';

const BannerImage = ({ src, alt, url }) => {
  return (
    
    <div style={{ padding: '0px 15px'}}>
      <Link to={url}>
        <img data-src={src} src={`${src}?blur=30`} alt={alt} style={{ width: '100%' }} />
      </Link>
    </div>
  );
};

export default BannerImage;
