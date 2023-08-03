import React from "react";
import Image from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import { Link } from "react-router-dom";


const Signup = ({ signup }) => {

    return (
        <Div style={{ width: '90%', margin: '0px 5%' }}>
            <Link to={signup.url_key} target='_blank' style={{ width: '100%', padding: '20px 0px', margin: '0 auto' }}>
                <Image src={signup.image} alt='signup' />
            </Link>
        </Div>
    )
}

export default Signup;


