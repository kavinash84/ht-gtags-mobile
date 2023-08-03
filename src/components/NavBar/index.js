import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label } from 'hometown-components/lib/Label';

// const { SITE_URL } = process.env;
const styles = require('./NavBar.scss');

const mapStateToProps = ({ homepage }) => ({
  data: homepage.menu.data
});

const NavBar = ({ data }) => (
  <div className={styles.navBar}>
    <div className={styles.navBarSlider}>
      {data
        ? data
            .filter(menu => menu.visibility === 'on')
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(menuItem => {
              if (menuItem.url_key.startsWith('http')) {
                if (menuItem.name === 'Festive Catalog') {
                  return (
                    <Link
                      to="/flipBook"
                      target="_blank"
                      onClick={() => {
                        window.dataLayer.push({
                          event: 'pt_global_click_link_header_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: '/flipBook',
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: menuItem.name
                        });
                      }}
                    >
                      Festive Catalog
                    </Link>
                  );
                } else {
                  return (
                    <a href={menuItem.url_key} title={menuItem.name} target="_blank">
                      {menuItem.name}
                    </a>
                  );
                }
              }
              if (menuItem.hasOwnProperty('target')) {
                if (menuItem.target === '_blank') {
                  return (
                    <Link
                      key={menuItem.id}
                      to={`/${menuItem.url_key}`}
                      title={menuItem.name}
                      target="_blank"
                      onClick={() => {
                        console.log('menu item clicked');
                        window.dataLayer.push({
                          event: 'pt_global_click_link_header_menu',
                          pagetype: '',
                          source_page_url: window.location.href,
                          previous_page_url: '',
                          destination_page_url: menuItem.url_key,
                          login_status: '',
                          user_id: '',
                          page_url: '',
                          banner_id: '',
                          click_text: menuItem.name
                        });
                      }}
                    >
                      {menuItem.name === 'Hot Deals' ? (
                        <Fragment>
                          <Label className={styles.newLabel}>New</Label>
                          {menuItem.name}
                        </Fragment>
                      ) : (
                        menuItem.name
                      )}
                    </Link>
                  );
                }
              }
              return (
                <Link
                  key={menuItem.id}
                  to={`/${menuItem.url_key}`}
                  title={menuItem.name}
                  onClick={() => {
                    console.log('menu item clicked');
                    window.dataLayer.push({
                      event: 'pt_global_click_link_header_menu',
                      pagetype: '',
                      source_page_url: window.location.href,
                      previous_page_url: '',
                      destination_page_url: menuItem.url_key,
                      login_status: '',
                      user_id: '',
                      page_url: '',
                      banner_id: '',
                      click_text: menuItem.name
                    });
                  }}
                >
                  {menuItem.name === 'Hot Deals' ? (
                    <Fragment>
                      <Label className={styles.newLabel}>New</Label>
                      {menuItem.name}
                    </Fragment>
                  ) : (
                    menuItem.name
                  )}
                </Link>
              );
            })
        : null}
    </div>
  </div>
);

NavBar.defaultProps = {
  data: []
};

NavBar.propTypes = {
  data: PropTypes.array
};

export default connect(mapStateToProps)(NavBar);
