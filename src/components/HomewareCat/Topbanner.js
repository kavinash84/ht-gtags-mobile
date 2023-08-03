import React from 'react';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';

const Topbanner = ({ data }) => {
    return ( 
        <Row justifyContent="center" ml="3px" mr="3px" pt="0px">
         {data.map(slide => (
        <Div style={{ width: '45%' }} height="100%" p="2px" mb="10px">
        <Link to={slide.url_key}>
       <Div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}
          height="100%"
          width={1}
       >
        <Image data-src={slide.image} src={`${slide.image}?blur=30`} alt='offer1' height="auto" width="95%" />
      </Div>
      </Link>
      </Div>
      ))}
    </Row>
     );
}
 
export default Topbanner;