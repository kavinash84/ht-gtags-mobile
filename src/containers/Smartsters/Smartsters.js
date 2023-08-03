import React, { Component } from "react";
import Menu from 'components/Menu';
import Footer from 'components/Footer';
import SmartstersContainer from "../../components/Smartsters";


class Smartsters extends React.Component {
  render() {
    return (
      <div>
        <Menu addToHomeBtn />
        <SmartstersContainer />
        <Footer />
      </div>
    );
  }
}

export default Smartsters;
