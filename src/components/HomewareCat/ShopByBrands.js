import React from 'react';
import CategoryCarousel from './Carousel';
import './SliderHome.css';
import Div from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';

const adjustSlides = length => ({
  slidesToShow: 1.8,
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

const ShopByBrands = ({ categoryName, data, component, src, url, subtitle }) => {
  return (
    <div style={{ paddingBottom: '10px'}}>
      <CategoryCarousel
        categoryName={categoryName}
        data={data}
        settings={adjustSlides}
        styles={{ fontSize: '14pt', fontWeight: 600 }}
        component={component}
      />
      {/* <Div mb="30px">
          <Div mb="0px" mt="40px">
              <Heading
                fontFamily="medium"
                style={{ textAlign: 'center', color: '#323131' }}
                fontSize="22px"
                mt="0px"
                mb="5px"
              >
                {categoryName}
              </Heading>
              <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
            </Div>
            <Div mt="40px">
            <Link to={url}>
                <Image src={src} alt={subtitle} height="auto" width="50%" ml="25%" />
                <Text fontSize="18px" color="black" mt="10px" style={{ textAlign: 'center' }}>
                  {subtitle}
                </Text>
                </Link>
            </Div>
      </Div> */}
    </div>
  );
};

export default ShopByBrands;
