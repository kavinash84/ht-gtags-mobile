import React from 'react';
import { Link } from 'react-router-dom';

const BannerImage = ({ src, alt, url }) => {
  return (
    <div style={{ padding: '15px' }}>
      <Link to="/furniture/living-room-furniture"
      onClick={()=>{
        window.dataLayer.push({
          event: 'pt_global_click_link_banner_click',
          pagetype: '',
          source_page_url: window.location.href,
          previous_page_url: '',
          destination_page_url: '/furniture/living-room-furniturel',
          login_status: '',
          user_id: '',
          page_url: window.location.href,
          banner_id: '',
          click_text: alt || ""
        });
      }}
      >
        <img data-src={src} src={`${src}?blur=30`} alt={alt} style={{ width: '100%' }} />
      </Link>
    </div>
  );
};

export default BannerImage;
