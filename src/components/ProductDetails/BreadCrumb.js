import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Img from "hometown-components/lib/Img";

const styles = require("./BreadCrumb.scss");
const homeIcon = require("../../../static/pdp-icons/home.png");

const BreadCrumb = ({ breadcrumbs }) => {
  let link = "";
  return (
    <div className={styles.breadcrumbListContainer}>
      <div className={styles.homeList}>
        <Link to="/">
          <span>
            <img alt="Home" src={homeIcon} />
          </span>
        </Link>
      </div>
      <ul
        itemScope
        itemType="http://schema.org/BreadcrumbList"
        className={styles.breadCrumbPdp}
      >
        {/* <li key="home" itemProp="itemListElement" itemType="http://schema.org/ListItem" itemScope>
        <Link itemProp="item" to="/">
          <span itemProp="name">
            <Img src={homeIcon} height="13px" alt="home icon" />
          </span>
          <meta itemProp="position" content={1} />
        </Link>
      </li> */}
        {breadcrumbs.map((item, index) => {
          link += `/${item.urlkey}`;
          return (
            <li
              key={String(index)}
              itemProp="itemListElement"
              itemType="http://schema.org/ListItem"
              itemScope
            >
              <Link itemProp="item" to={`${link}`}>
                <span
                  itemProp="name"
                  className={
                    index === breadcrumbs.length - 1
                      ? `${styles.lastBreadCrumb}`
                      : ""
                  }
                >
                  {item.name}
                </span>
                <meta itemProp="position" content={index + 1} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
BreadCrumb.defaultProps = {
  breadcrumbs: []
};
BreadCrumb.propTypes = {
  breadcrumbs: PropTypes.array
};
export default BreadCrumb;
