import React from "react";
import { Link } from "react-router-dom";

const styles = require("../OneLacPackage/breadcrumb.scss");
const arrowForward = require("../../../static/categories/ht-home.svg");

const WarrantyBreadcrumb = () => {
  return (
    <div className={styles.breadcrumbListContainer}>
      <div className={styles.homeListmain}>
        <Link to="/">
          <span>
            <img alt="Home" src={arrowForward} />
          </span>
        </Link>
      </div>
      <ul className={styles.breadCrumbListMain}>
        <li>
          <span style={{ color: "#F47020", marginBottom: "2px" }}>
            Warranty
          </span>
        </li>
      </ul>
    </div>
  );
};

export default WarrantyBreadcrumb;
