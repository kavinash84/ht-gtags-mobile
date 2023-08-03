import React, { Component } from 'react';
// import { connect } from 'react-redux';

// @connect(
//   ({ homepage }) => ({
//     menu: homepage.menu.data
//   }),
//   null
// )
class FlipBook extends Component {
  render() {
    // const { menu } = this.props;
    // const found = menu.find(menuItem => menuItem.name === 'Festive Catalog') || '';
    return (
      <div>
        <iframe
          src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=1n54iind1j"
          width="100%"
          height="480"
          seamless="seamless"
          scrolling="no"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        {/* {found ? (
          <div>
            <a href={found.url_key} title={found.name} target="_blank">
              Please click here to download the Catalogue
            </a>
          </div>
        ) : null} */}
      </div>
    );
  }
}

export default FlipBook;
