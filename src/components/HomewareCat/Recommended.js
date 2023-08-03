import React from 'react';
import CategoryCarousel from './Carousel';

const adjustSlides = length => ({
  slidesToShow: 1.3,
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

const Recommended = ({ categoryName, data, component }) => {
  return (
    <div style={{ paddingBottom: '15px', position: 'relative', bottom:'-40px', marginTop: '-30px'}}>
      <div style={{ background: '#F7F0F0', width: '100%', height: '260px', position: 'absolute', bottom: '0' }}></div>
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

export default Recommended;
