import React from 'react';
import CategoryCarousel from './carousel';

const adjustSlides = length => ({
  slidesToShow: 1.5,
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
    <div style={{ paddingBottom: '5px', paddingTop:'5px', backgroundColor:'#FFFFFF' }}>
      {/* <CategoryCarousel
        categoryName={categoryName}
        data={data}
        settings={adjustSlides}
        styles={{ fontSize: '14pt', fontWeight: 'normal' }}
        component={component}
      /> */}
      <div id="unbxd_category_top_sellers"></div>
    </div>
  );
};

export default ShopOurBestSeller;
