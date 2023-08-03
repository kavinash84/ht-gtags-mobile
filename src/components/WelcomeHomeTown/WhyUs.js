import React from 'react';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Row from 'hometown-components/lib/Row';

const WhyUs = () => {
    return ( 
        <Div style={{width: '90%', height: 'auto',marginLeft:'5%',backgroundColor:'gray', marginTop:'-25px'}}>
           <Text fontSize="24px" color="white" ta="center">
           WHY CHOOSE US
           </Text>
           <Row justifyContent="center">
            <Div style={{ width: '30%'}}>
            <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center', borderRight: '1.5px solid white' }}>45 Studios, <br></br> 27 Cities</Text>     
            </Div>
            <Div style={{ width: '30%'}}>
                <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center',borderRight: '1.5px solid white'  }}>15 Years <br></br> of Expertise</Text>
            </Div>
            <Div style={{ width: '30%' }}>
                <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center'}}>In-house <br></br> Kitchen Experts</Text>
            </Div>
           </Row>
           <Row justifyContent="center">
            <Div style={{ width: '30%'}}>
            <Div style={{  borderTop:'1.5px solid white', width: '70%', marginLeft:'15%'}}></Div>
            <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center', borderRight: '1.5px solid white' }}>40000+ Kitchens <br></br> Installed </Text>   
             
            </Div>
            <Div style={{ width: '30%'}}>
            <Div style={{  borderTop:'1.5px solid white', width: '70%', marginLeft:'15%'}}></Div>
                <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center',borderRight: '1.5px solid white'  }}>500+ Finishes <br></br>For Indian Kitchens</Text>
            </Div>
            <Div style={{ width: '30%' }}>
            <Div style={{  borderTop:'1.5px solid white', width: '70%', marginLeft:'15%'}}></Div>
                <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center'}}>10 Year <br></br>Warranty*</Text>
            </Div>
           </Row>
           <Row justifyContent="center">
            <Div style={{ width: '30%'}}>
            <Div style={{  borderTop:'1.5px solid white', width: '70%', marginLeft:'15%'}}></Div>
            <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center', borderRight: '1.5px solid white' }}>6 Free Service <br></br> Visits</Text>     
            </Div>
            <Div style={{ width: '30%'}}>
            <Div style={{  borderTop:'1.5px solid white', width: '70%', marginLeft:'15%'}}></Div>
                <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center',borderRight: '1.5px solid white'  }}>45 Days <br></br>Delivery</Text>
            </Div>
            <Div style={{ width: '30%' }}>
            <Div style={{  borderTop:'1.5px solid white', width: '70%', marginLeft:'15%'}}></Div>
                <Text style={{ color: 'white',fontSize:'10px', textAlign: 'center'}}>End to End <br></br> Project Management</Text>
            </Div>
           </Row>
        </Div>
     );
}
 
export default WhyUs;