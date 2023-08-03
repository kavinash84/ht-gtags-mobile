import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'hometown-components/lib/Container';
import NavBar from 'components/NavBar';
import SearchInput from 'components/Search/SearchInput';
import { withRouter } from 'react-router';
import MenuSidebar from './MenuSidebar';

const styles = require('./Menu.scss');

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

class Menu extends Component {
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
        {/* mt="80px" */}
        <Container pl="15px" pr="15px" mt={this.state.isOpen ? '80px' : '42px'}>
          <SearchInput />
          <NavBar />
        </Container>
      </div>
    );
  }
}

Menu.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Menu);
