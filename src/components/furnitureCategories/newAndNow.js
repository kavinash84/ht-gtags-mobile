import React from 'react';
import CategoryCarousel from './carousel';

const adjustSlides = length => ({
  slidesToShow: 1,
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

const NewAndNow = ({ categoryName, data, component }) => {
  return (
    <div style={{ paddingBottom: '15px', position: 'relative' }}>
       <div style={{ background: '#F7F0F0', width: '100%', height: '160px', position: 'absolute', bottom: '0' }}></div>
      <CategoryCarousel
        categoryName={categoryName}
        data={data}
        settings={adjustSlides}
        styles={{ fontSize: '14pt', fontWeight: 'normal' , padding:'0px'}}
        component={component}
      />
    </div>
  );
};

export default NewAndNow;
