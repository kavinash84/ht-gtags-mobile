import React, { Component } from 'react'
import GiftingComponent from 'components/Gifting';
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import BreadCrumb from 'components/Gifting/BreadCrumb';

export default class Gifting extends Component {
    render() {
        return (
            <div>
                <Menu />
                <BreadCrumb />
                <GiftingComponent />
                <Footer />
            </div>
        )
    }
}