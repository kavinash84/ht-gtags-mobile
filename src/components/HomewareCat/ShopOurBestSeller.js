import React from 'react';
import CategoryCarousel from './Carousel';

const adjustSlides = length => ({
  slidesToShow: 1.7,
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

const ShopOurBestSeller = ({ categoryName, data, component }) => {
  return (
    <div style={{ paddingBottom: '15px', marginTop: '40px'}}>
      <CategoryCarousel
        categoryName={categoryName}
        data={data}
        settings={adjustSlides}
        styles={{ fontSize: '14pt', fontWeight: 'normal' }}
        component={component}
      />
    </div>
  );
};

export default ShopOurBestSeller;
