import React, { Component } from "react";
import Footer from "components/Footer";
import PropTypes from "prop-types";
import ReviewMenu from "../ReviewMenu";
import WarrantyBreadcrumb from "./warrantyBreadcrumb";
import { loadWarrantyCat } from "../../redux/modules/designBuild";

const arrowForward = require("../../../static/newHomepage/newForwardArrow.svg");
const BreadCrumpstyles = require("../Review/BreadCrumb.scss");

export default class WarrantyComp extends Component {
  state = {
    defaultIndex: ""
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleIndexChange = (index, key) => {
    this.setState({ defaultIndex: index });
    const { dispatch } = this.context.store;
    dispatch(loadWarrantyCat(key));
  };
  render() {
    const { data, warrantyCat } = this.props;
    const { defaultIndex } = this.state;
    return (
      <div className="wrapper">
        <div>
          <ReviewMenu backBtn={false} />
          <div className={BreadCrumpstyles.BreadCrumb_wrapper2}>
            <WarrantyBreadcrumb />
          </div>
          <div>
            <img src={data.banner} />
          </div>
          <div
            style={{
              color: "#222222",
              fontSize: "16px",
              fontWeight: 600,
              padding: "15px"
            }}
          >
            <div
              style={{
                background: "#F9F9F9",
                padding: "15px",
                textAlign: "center",
                marginBottom: "15px"
              }}
            >
              WARRANTY{" "}
              <span>
                <img src={arrowForward} />
              </span>
            </div>
            {/* <div
              style={{
                background: "#F9F9F9",
                padding: "15px",
                textAlign: "center",
                marginBottom: "15px"
              }}
            >
              CARE AND INSTRUCTIONS{" "}
              <span>
                <img src={arrowForward} />
              </span>
            </div>
            <div
              style={{
                background: "#F9F9F9",
                padding: "15px",
                textAlign: "center",
                marginBottom: "15px"
              }}
            >
              RETURNS AND EXCHANGE{" "}
              <span>
                <img src={arrowForward} />
              </span>
            </div> */}
          </div>
          <div style={{ padding: "0px 15px 15px" }}>
            <div
              style={{
                textAlign: "center",
                fontWeight: 600,
                color: "#222222",
                padding: "0px 15px 15px"
              }}
            >
              Warranty
            </div>
            <p style={{ color: "#888888", fontSize: "14px" }}>
              {data.subHeading}
            </p>

            <div>
              {data.warranty.map((item, i) => (
                <div
                  style={{ borderBottom: "1px solid #E3E3E3" }}
                  onClick={() => {
                    if (defaultIndex === i) {
                      this.handleIndexChange("", item.key);
                    } else {
                      this.handleIndexChange(i, item.key);
                    }
                  }}
                >
                  <div
                    style={{
                      color: "#323131",
                      fontWeight: 600,
                      padding: "15px 0px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    {item.title}
                    <span
                      style={{
                        color: "#F47020",
                        transform: defaultIndex === i ? "rotate(90deg)" : "none"
                      }}
                    >
                      {">"}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#888888",
                      padding: "0px 0px 15px",
                      display: defaultIndex === i ? "block" : "none"
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: warrantyCat }} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
