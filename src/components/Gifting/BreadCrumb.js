import React from 'react'
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

const homeIcon = require('../../../static/pdp-icons/home.png');
const nextIcon = require('../../../static/next.svg');

function BreadCrumb() {
    return (
        <div>
            <Div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '10px 1rem',
                backgroundColor: '#FFF8F4'
            }}>
                <Div style={{ width: '8%'}}>
                    <Link to="/">
                        <Img src={homeIcon} alt="home Icon" style={{ height: '1rem', width: 'auto'}} />
                    </Link>
                </Div>
                <Div style={{ width: '5%'}}>
                    <Img src={nextIcon} alt="Next arrow" style={{ height: '.8rem', width: 'auto'}} />
                </Div>
                <Div style={{ width: '10%'}}>
                    <Text style={{ color: 'orangered', fontWeight: 'bold'}} fontSize=".9rem" >Gifting</Text>
                </Div>
            </Div>
        </div>
    )
}

export default BreadCrumb
