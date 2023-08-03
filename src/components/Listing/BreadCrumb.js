import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Img from 'hometown-components/lib/Img';

const styles = require('./BreadCrumb.scss');
const homeIcon = require('../../../static/pdp-icons/home.png');

const cleanTail = url => {
  if (url[url.length - 1] === '/') {
    return url.substring(0, url.length - 1);
  }
  return url;
};
const formatLink = url => {
  const paramLink = url.split('/').filter(z => z !== '');
  if (paramLink.length >= 4) {
    paramLink.splice(1, 1);
  }
  const newLink = paramLink.join('/');
  const sanitizedUrl = cleanTail(newLink);
  const newURL = sanitizedUrl.replace('catalog/', '');
  return newURL;
};

const BreadCrumb = ({ categoryDetails }) => {
  let link = '';
  return (
    <div className={styles.breadcrumbListContainer}>
      <div className={styles.homeList}>
        <Link to="/">
          <span>
            <img alt="Home" src={homeIcon} />
          </span>
        </Link>
      </div>
      <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbList}>
        {categoryDetails
          .filter(details => Object.keys(details).length > 0)
          .map((item, index) => {
            if (item) {
              link = `/${item.url_key}`;
              return (
                <li
                  key={item.id}
                  itemProp="itemListElement"
                  itemType="http://schema.org/ListItem"
                  itemScope
                  onClick={() => {
                    window.dataLayer.push({
                      event: 'pt_global_click_text_breadcrumb',
                      pagetype: '',
                      source_page_url: window.location.href,
                      previous_page_url: '',
                      destination_page_url: formatLink(link),
                      login_status: '',
                      user_id: '',
                      page_url: window.location.href,
                      banner_id: '',
                      click_text: item.name
                    });
                  }}
                >
                  <Link itemProp="item" to={`/${formatLink(link)}`}>
                    <span
                      itemProp="name"
                      className={index === categoryDetails.length - 1 ? `${styles.lastBreadCrumb}` : ''}
                    >
                      {item.name}
                    </span>
                    <meta itemProp="position" content={index + 1} />
                  </Link>
                </li>
              );
            }
            return null;
          })}
      </ul>
    </div>
  );
};

BreadCrumb.propTypes = {
  categoryDetails: PropTypes.array.isRequired
};
export default BreadCrumb;
