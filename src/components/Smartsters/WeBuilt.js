import React from "react";
import Image from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';


const WeBuilt = ({ weBuilt }) => {
    return (
        <Div style={{ width: '100%', margin: '50px auto' }}>
            <Image src={weBuilt.image} alt='banner' style={{ width: '100%' }} />
        </Div>
    )
}

export default WeBuilt;


