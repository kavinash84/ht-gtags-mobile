import React, { Component } from 'react'
import Wrapper from 'hometown-components/lib/Wrapper';
import MatressesContainer from 'components/Matresses';
import Menu from 'components/Menu';
import Footer from 'components/Footer';

export class Matresses extends Component {

    render() {
        return (
            <Wrapper>
                <Menu />
                <MatressesContainer history={this.props.history} />
                <Footer />
            </Wrapper>
        )
    }
}

export default Matresses
