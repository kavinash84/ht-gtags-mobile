import React from 'react';
import { Link } from 'react-router-dom';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';

const styles = require('./Slider.scss');

const Matteress = ({ src, alt, url_key , categoryName}) => {
  return (
    <div style={{ padding: '0px', paddingBottom: '50px'}}>
     <Div mb="25px" mt="25px" ml="10px">
            <Heading
              fontFamily="medium"
              style={{ textAlign: 'center', color: '#323131' }}
              fontSize="22px"
              mt="0px"
              mb="10px"
            >
              {categoryName}
            </Heading>
            <div style={{ width: '30px', borderTop: '2px solid #222222', margin: 'auto' }} />
          </Div>

      <Link to={url_key}>
        <img data-src={src} src={`${src}?blur=30`} alt={alt} style={{ width: '80%' , marginLeft:'10%', height: '250px' }} />
      </Link>
      <div
          style={{  zIndex: -1 , backgroundColor:'#F9F9F9', height:'200px', marginTop:'-130px'}}
        
        />
      </div>
  );
};

export default Matteress;