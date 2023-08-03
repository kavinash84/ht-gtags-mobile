import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import MenuSidebar from "./MenuSidebar";

const styles = require("./Menu.scss");

const navigateToCategory = history => category => {
  history.push({
    pathname: `${category.pathname}`,
    search: `${category.search}`,
    state: {
      query: `${category.search}`,
      path: `${category.pathname}`,
      pincode: window.getPincode(),
      pinSetByUser: window.isPincodeFilter()
    }
  });
};

class ReviewMenu extends Component {
  state = {
    isOpen: false
  };
  handleMargin = data => {
    this.setState({
      isOpen: data
    });
  };

  componentDidMount() {
    const { history } = this.props;
    if (window) {
      window.HTCATEGORY = {};
      window.HTCATEGORY.navigateToCategory = navigateToCategory(history);
    }
  }
  render() {
    const { ...rest } = this.props;
    return (
      <div className={styles.menuWrapper}>
        <MenuSidebar {...rest} handleMargin={this.handleMargin} />
      </div>
    );
  }
}

ReviewMenu.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ReviewMenu);
