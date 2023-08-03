import React from "react";
import Image from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import { Link } from "react-router-dom";


const TopBanner = ({ topBanner }) => {
    return (
        <Div style={{ width: '100%', margin: '30px auto' }}>
            <Link to={topBanner.url_key}>
                <Image src={topBanner.image} alt='banner' style={{ width: '100%' }} />
            </Link>
        </Div>
    )
}

export default TopBanner;


