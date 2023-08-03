import React from "react";
import Image from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import { Link } from "react-router-dom";
import Text from 'hometown-components/lib/Text';

import "./Marquee.css";


const Categories = ({ data }) => {
    return (
        <Div style={{ width: '100%', margin: '10px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {data.map(slide => (
                <Div style={{ width: '17%', margin:"10px 3px"}}>
                    <Link to={slide.url_key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Image src={slide.imgSrc} alt='banner' style={{ width: '100%', maxWidth: '60px' }} />
                        <Text className="titleText">{slide.title}</Text>
                    </Link>
                </Div>
            ))}

        </Div>
    )
}

export default Categories;


