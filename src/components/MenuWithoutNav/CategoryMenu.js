import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// const { SITE_URL } = process.env;

class CategoryDropDown extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    categoryName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    childLength: PropTypes.number.isRequired,
    toggleSideBar: PropTypes.func.isRequired
  };
  state = {
    open: false
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const styles = require('./MenuSidebar.scss');
    const { open } = this.state;
    const { children, categoryName, childLength, url, toggleSideBar } = this.props;
    return (
      <li className={open ? styles.active : ''}>
        {childLength === 0 ? (
          <div>
            {url.startsWith('https') ? (
              <a href={url} title={categoryName} onClick={toggleSideBar} target="_blank">
                {categoryName}
              </a>
            ): (
              <Link to={`/${url}`} title={categoryName} onClick={toggleSideBar}>
                {categoryName}
              </Link>
            )}
          </div>
        ) : (
          <button onClick={this.handleClick}>
            {categoryName}
            <span>❯</span>
          </button>
        )}
        {children}
      </li>
    );
  }
}

const CategoryMenu = ({ menu, toggleSideBar }) => (
  <ul>
    {menu &&
      menu
        .filter(cat => cat.visibility === 'on')
        .map(category => (
          <CategoryDropDown
            categoryName={category.name}
            childLength={(category.children && category.children.length) || 0}
            url={category.url_key}
            key={category.url_key}
            toggleSideBar={toggleSideBar}
          >
            <ul>
              {category.children && category.children.length
                ? category.children
                    .filter(subcat => subcat.visibility === 'on')
                    .map(submenu => {
                      if (submenu.url_key.startsWith('http')) {
                        return (
                          <a href={submenu.url_key} title={submenu.name} target="_blank">
                            {submenu.name}
                          </a>
                        );
                      } else {
                        return (
                          <CategoryDropDown
                            categoryName={submenu.name}
                            childLength={(submenu.children && submenu.children.length) || 0}
                            url={submenu.url_key}
                            key={submenu.id}
                            toggleSideBar={toggleSideBar}
                          >
                            <ul>
                              {submenu.children && submenu.children.length
                                ? submenu.children
                                    .filter(subcat => subcat.visibility === 'on')
                                    .map(level3 => (
                                      <li key={level3.id}>
                                        <Link to={`/${level3.url_key}`} title={level3.name} onClick={toggleSideBar}>
                                          {level3.name}
                                        </Link>
                                      </li>
                                    ))
                                : null}
                            </ul>
                          </CategoryDropDown>
                        )
                      }
                    })
                : null}
            </ul>
          </CategoryDropDown>
        ))}
    <li>
      <Link
        to="/modular-kitchens/"
        title="Modular Kitchens"
        // target="_blank"
        rel="noopener noreferrer"
        onClick={toggleSideBar}
      >
        Modular Kitchens
      </Link>
    </li>
    <li>
      <Link to="/design-build" title="Design & Build" target="_blank" rel="noopener noreferrer" onClick={toggleSideBar}>
        Design & Build
      </Link>
    </li>
    <li>
      <Link to="/bulk-order" title="Bulk Order" onClick={toggleSideBar}>
        Bulk Order
      </Link>
    </li>
  </ul>
);

CategoryMenu.defaultProps = {
  menu: []
};

CategoryMenu.propTypes = {
  menu: PropTypes.array,
  toggleSideBar: PropTypes.func.isRequired
};

export default CategoryMenu;
