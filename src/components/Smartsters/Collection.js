import React from "react";
import Image from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import { Link } from "react-router-dom";

const Collection = ({ collection }) => {
    return (
        <Div style={{ width: '100%', margin: '0px auto' }}>
            {collection.values.map(slide => (
                <Link
                    to={slide.url_key}
                >
                    <Div mt="40px" >
                        <Image data-src={slide.imgSrc} src={`${slide.imgSrc}?blur=30`} alt="general" style={{ width: "100%" }} />
                    </Div>
                </Link>
            ))}
        </Div>
    )
}

export default Collection;


