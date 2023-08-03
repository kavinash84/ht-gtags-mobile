import React from 'react';
import ProductCarousel from 'components/Carousel/ProductSlider';
// import ProductCarousel from 'components/Carousel/ProductSliderWithDetails';
import Carousel from './Carousel';
import GridLayout from './GridLayout';
import MidBannerCarousel from './MidBannerCarousel';

const CommonLayout = (component, categoryName, data, grid = 3) => {
  if (component !== 5) {
    switch (component) {
      case 1:
        return <Carousel categoryName={categoryName} data={data} layout="square" />;
      case 2:
        return <Carousel categoryName={categoryName} data={data} layout="round" />;
      case 3:
        return <GridLayout categoryName={categoryName} data={data} layout="square" layoutStyle="grid" col={grid} />;
      case 4:
        return <GridLayout categoryName={categoryName} data={data} layout="round" layoutStyle="grid" col={grid} />;
      // case 5:
      //   return <ProductCarousel pb="1.5rem" productSliderTitle={categoryName} data={data} />;
      default:
        return <MidBannerCarousel categoryName={categoryName} data={data} />;
    }
  }
};

export default CommonLayout;
