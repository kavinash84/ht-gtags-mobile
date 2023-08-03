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

const Suggestions = ({ categoryName, data, component }) => {
  return (
    <div style={{ paddingBottom: '15px' }}>
      <CategoryCarousel
        categoryName={categoryName}
        data={data}
        settings={adjustSlides}
        styles={{ fontSize: '14pt', fontWeight: 600 }}
        component={component}
      />
    </div>
  );
};

export default Suggestions;
