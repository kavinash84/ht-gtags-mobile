import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = require('./BreadCrumb.scss');
const arrowForward = require('../../../static/categories/ht-home.svg');

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

const BreadCrumb = ({ urlKey, name }) => {
  let link = `/${urlKey}`;
  return (
    <div className={styles.breadcrumbListContainer}>
      <div className={styles.homeListmain}>
        <Link to="/">
          <span>
            <img alt="Home" src={arrowForward} />
          </span>
        </Link>
      </div>
      <ul itemScope itemType="http://schema.org/BreadcrumbList" className={styles.breadCrumbListMain}>
        <li
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
          <Link itemProp="item" to={`/${formatLink(link)}`}
           onClick={()=> {
              window.dataLayer.push({
                event: "pt_global_click_text_breadcrumb",
                pagetype: "",
                source_page_url: window.location.href,
                previous_page_url: "",
                destination_page_url: formatLink(link),
                login_status: "",
                user_id: "",
                page_url: window.location.href,
                banner_id: "",
                click_text: name
              });
            }}
          >
            <span itemProp="name" style={{ color: '#F47020', marginBottom: '2px' }}>
              {name}
            </span>
            <meta itemProp="position" content={1} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

BreadCrumb.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired
};
export default BreadCrumb;
