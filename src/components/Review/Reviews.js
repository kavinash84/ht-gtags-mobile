import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Img from "hometown-components/lib/Img";
import { Link } from "react-router-dom";
import ReviewText from "./ReviewText";
import { BASE_IMAGE_URL } from "helpers/Constants";

const Star = require("../../../static/Review/star.svg");
const amazon = require("../../../static/Review/amazon.svg");
const bajaj = require("../../../static/Review/bajaj.png");
const facebook = require("../../../static/Review/facebook.svg");
const insta = require("../../../static/Review/insta.svg");
const myntra = require("../../../static/Review/myntra.svg");
const pepperfry = require("../../../static/Review/pepperfry.svg");

const styles = require("./index.scss");

@connect(({ reviews }) => ({
  ReviewsData: reviews.reviewsList,
  EndOfList: reviews.endOfList,
  loading: reviews.loading
}))
export default class Reviews extends Component {
  getDate = date => {
    let d = new Date(date) || "";
    const result =
      d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    return result;
    // const d = new Date(date);
    // const arr = d.toString().split(" ");
    // return `${arr[2]}th ${arr[1]} ${arr[3]}`;
  };
  getLogo = flag => {
    switch (flag) {
      case "amazon":
        return <Img src={amazon} alt="Amazon" width="25px" height="25px" />;
      case "bajaj":
        return <Img src={bajaj} alt="Bajaj" width="25px" height="25px" />;
      case "facebook":
        return <Img src={facebook} alt="Facebook" width="25px" height="25px" />;
      case "flipkart":
        return <Img src={`${BASE_IMAGE_URL}/media/cms/extras/flipcart.svg`} alt="Flipkart" width="25px" height="25px" />;
      case "hometown":
        return <Img src={`${BASE_IMAGE_URL}/media/cms/extras/ht.png`} alt="Hometown" width="32px" height="30px" />;
      case "myntra":
        return <Img src={myntra} alt="Mayantra" width="25px" height="25px" />;
      case "pepperfry":
        return (
          <Img src={pepperfry} alt="Pepperfry" width="25px" height="25px" />
        );
      default:
        return <Img src={insta} alt="Instagram" width="25px" height="25px" />;
    }
  };
  render() {
    const { handlePagination, ReviewsData, EndOfList, loading } = this.props;
    return (
      <Section p="0" mb="0" className={styles.reviewsContainer}>
        <Div className={styles.titleContainer}>
          <Div className={styles.title}>Customers Speak</Div>
          <Div className={styles.titleBottom} />
        </Div>
        <Div className={styles.reviewListContainer}>
          {ReviewsData.map(item => (
            <Div className={styles.reviewContainer}>
              {item.link && item.link.startsWith("https") ? (
                <React.Fragment>
                  <a href={item.link || ""} target="_blank">
                    <Div className={styles.customerName}>{item.nickname}</Div>
                    <Div className={styles.subDetails}>
                      <Div style={{ width: "80%" }}>
                        <Div className={styles.ratings}>
                          <Img
                            src={Star}
                            width="12px"
                            height="12px"
                            alt="Star"
                            style={{
                              display:
                                1 <= Math.floor(item.ratings) ? "block" : "none"
                            }}
                          />
                          <Img
                            src={Star}
                            width="12px"
                            height="12px"
                            alt="Star"
                            style={{
                              display:
                                2 <= Math.floor(item.ratings) ? "block" : "none"
                            }}
                          />
                          <Img
                            src={Star}
                            width="12px"
                            height="12px"
                            alt="Star"
                            style={{
                              display:
                                3 <= Math.floor(item.ratings) ? "block" : "none"
                            }}
                          />
                          <Img
                            src={Star}
                            width="12px"
                            height="12px"
                            alt="Star"
                            style={{
                              display:
                                4 <= Math.floor(item.ratings) ? "block" : "none"
                            }}
                          />
                          <Img
                            src={Star}
                            width="12px"
                            height="12px"
                            alt="Star"
                            style={{
                              display:
                                5 <= Math.floor(item.ratings) ? "block" : "none"
                            }}
                          />
                        </Div>
                        <Div className={styles.location}>{item.city}</Div>
                      </Div>
                      <Div
                        className={styles.logoContainer}
                        style={{
                          width: item.flag === "hometown" ? "22%" : "20%"
                        }}
                      >
                        {/* <Img src={Star} width="25px" height="25px" alt="Star" /> */}
                        {this.getLogo(item.flag)}
                      </Div>
                    </Div>

                    <Div className={styles.productImage}>
                      <Img
                        src={item.product_image}
                        alt="Product Image"
                        style={{ height: "auto", width: "auto" }}
                      />
                    </Div>
                  </a>
                  <Div className={styles.reviewDetails}>
                    <ReviewText text={item.detail} />
                  </Div>
                  <Div className={styles.date}>
                    {this.getDate(item.created_at)}
                  </Div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {item.link ? (
                    <React.Fragment>
                      <Link to={item.link || ""}>
                        <Div className={styles.customerName}>
                          {item.nickname}
                        </Div>
                        <Div className={styles.subDetails}>
                          <Div style={{ width: "80%" }}>
                            <Div className={styles.ratings}>
                              <Img
                                src={Star}
                                width="12px"
                                height="12px"
                                alt="Star"
                                style={{
                                  display:
                                    1 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="12px"
                                height="12px"
                                alt="Star"
                                style={{
                                  display:
                                    2 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="12px"
                                height="12px"
                                alt="Star"
                                style={{
                                  display:
                                    3 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="12px"
                                height="12px"
                                alt="Star"
                                style={{
                                  display:
                                    4 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                              <Img
                                src={Star}
                                width="12px"
                                height="12px"
                                alt="Star"
                                style={{
                                  display:
                                    5 <= Math.floor(item.ratings)
                                      ? "block"
                                      : "none"
                                }}
                              />
                            </Div>
                            <Div className={styles.location}>{item.city}</Div>
                          </Div>
                          <Div
                            className={styles.logoContainer}
                            style={{
                              width: item.flag === "hometown" ? "22%" : "20%"
                            }}
                          >
                            {/* <Img src={Star} width="25px" height="25px" alt="Star" /> */}
                            {this.getLogo(item.flag)}
                          </Div>
                        </Div>

                        <Div className={styles.productImage}>
                          <Img
                            src={item.product_image}
                            alt="Product Image"
                            style={{ height: "auto", width: "auto" }}
                          />
                        </Div>
                      </Link>
                      <Div className={styles.reviewDetails}>
                        <ReviewText text={item.detail} />
                      </Div>
                      <Div className={styles.date}>
                        {this.getDate(item.created_at)}
                      </Div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Div className={styles.customerName}>{item.nickname}</Div>
                      <Div className={styles.subDetails}>
                        <Div style={{ width: "80%" }}>
                          <Div className={styles.ratings}>
                            <Img
                              src={Star}
                              width="12px"
                              height="12px"
                              alt="Star"
                              style={{
                                display:
                                  1 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="12px"
                              height="12px"
                              alt="Star"
                              style={{
                                display:
                                  2 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="12px"
                              height="12px"
                              alt="Star"
                              style={{
                                display:
                                  3 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="12px"
                              height="12px"
                              alt="Star"
                              style={{
                                display:
                                  4 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                            <Img
                              src={Star}
                              width="12px"
                              height="12px"
                              alt="Star"
                              style={{
                                display:
                                  5 <= Math.floor(item.ratings)
                                    ? "block"
                                    : "none"
                              }}
                            />
                          </Div>
                          <Div className={styles.location}>{item.city}</Div>
                        </Div>
                        <Div
                          className={styles.logoContainer}
                          style={{
                            width: item.flag === "hometown" ? "22%" : "20%"
                          }}
                        >
                          {/* <Img src={Star} width="25px" height="25px" alt="Star" /> */}
                          {this.getLogo(item.flag)}
                        </Div>
                      </Div>
                      <Div className={styles.productImage}>
                        <Img
                          src={item.product_image}
                          alt="Product Image"
                          style={{ height: "auto", width: "auto" }}
                        />
                      </Div>
                      <Div className={styles.reviewDetails}>
                        <ReviewText text={item.detail} />
                      </Div>
                      <Div className={styles.date}>
                        {this.getDate(item.created_at)}
                      </Div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Div>
          ))}
          {ReviewsData.length === 0 ? (
            <div
              style={{
                fontSize: "18px",
                textAlign: "center",
                fontWeight: 600,
                width: "100%",
                marginLeft: "-4%"
              }}
            >
              No Reviews Found
            </div>
          ) : null}
        </Div>
        {EndOfList ? null : (
          <div
            onClick={() => {
              if (!loading) handlePagination();
            }}
          >
            <Div className={styles.showMore}>SHOW MORE</Div>
          </div>
        )}
      </Section>
    );
  }
}
