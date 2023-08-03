import React from 'react';
import CategoryCarousel from './carousel';

const adjustSlides = length => ({
  slidesToShow: 1.2,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: '1px solid #848C7F'
      }}
    ></div>
  )
});

const ShopByRooms = ({ categoryName, data, component }) => {
  return (
    <div style={{ paddingBottom: '15px' }}>
      <CategoryCarousel
        categoryName={categoryName}
        data={data}
        settings={adjustSlides}
        styles={{ fontSize: '14pt', fontWeight: 600, fontFamily: 'medium' }}
        component={component}
      />
    </div>
  );
};

export default ShopByRooms;
