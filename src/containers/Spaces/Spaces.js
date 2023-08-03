import React, { Component } from 'react'
import SpacesContainer from '../../components/Spaces';
import Div from 'hometown-components/lib/Div';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

class Spaces extends React.Component {
    render() { 
        return (
            <Div>
            <Menu addToHomeBtn />
                <SpacesContainer/>
                <Footer />
            </Div>
        );
    }
}
 
export default Spaces;