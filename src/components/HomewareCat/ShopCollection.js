import React from 'react';
import Div from 'hometown-components/lib/Div';
import Image from 'hometown-components/lib/Img';
import { Link } from 'react-router-dom';
import Heading from 'hometown-components/lib/Heading';

const ShopCollection = ({categoryName, data}) => {
    return ( 
      <Div mb="40px">
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
            {data.map(slide => (
            <Div mt="40px">
            <Link to={slide.url_key}>
                <Image src={slide.image} alt={slide.title}/>
                </Link>
            </Div>
            ))}
      </Div>
     );
}
 
export default ShopCollection;