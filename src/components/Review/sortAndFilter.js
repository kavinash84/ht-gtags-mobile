import React, { Component } from "react";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Img from "hometown-components/lib/Img";

const CloseIcon = require("../../../static/Review/closeIcon.svg");

const styles = require("./index.scss");

export default class SortAndFilter extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    content: "none"
  };

  getContent = cont => {
    const {
      filterValue,
      sortValue,
      handleFilter,
      handleSort,
      applyFilter,
      applySort
    } = this.props;
    switch (cont) {
      case "sort":
        return (
          <Div className={styles.sortContainer}>
            <Div className={styles.close}>
              <Div className={styles.filterTitle}>Star Rating</Div>
              <Img
                src={CloseIcon}
                alt="Close"
                onClick={() => {
                  this.setState({ content: "none" });
                }}
              />
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleSort("Newest")}
            >
              <input
                type="checkbox"
                checked={sortValue === "Newest" ? true : false}
              />
              <span>Newest First</span>
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleSort("Oldest")}
            >
              <input
                type="checkbox"
                checked={sortValue === "Oldest" ? true : false}
              />
              <span>Oldest First</span>
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleSort("Popular")}
            >
              <input
                type="checkbox"
                checked={sortValue === "Popular" ? true : false}
              />
              <span>Popular</span>
            </Div>
            {sortValue ? (
              <Div
                className={styles.Clear}
                onClick={() => {
                  handleSort("");
                  setTimeout(() => {
                    this.setState({ content: "none" });
                  }, 1000);
                }}
              >
                CLEAR SORT
              </Div>
            ) : null}

            <button
              className={styles.applySortBtn}
              disabled={sortValue ? false : true}
              onClick={() => {
                applySort();
                setTimeout(() => {
                  this.setState({ content: "none" });
                }, 1000);
              }}
            >
              Apply Sort
            </button>
          </Div>
        );
      case "filter":
        return (
          <Div className={styles.filterContainer}>
            <Div className={styles.close}>
              <Div className={styles.filterTitle}>Star Rating</Div>
              <Img
                src={CloseIcon}
                alt="Close"
                onClick={() => {
                  this.setState({ content: "none" });
                }}
              />
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleFilter("1")}
            >
              <input
                type="checkbox"
                checked={filterValue === "1" ? true : false}
              />
              <span>1 Star</span>
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleFilter("2")}
            >
              <input
                type="checkbox"
                checked={filterValue === "2" ? true : false}
              />
              <span>2 Star</span>
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleFilter("3")}
            >
              <input
                type="checkbox"
                checked={filterValue === "3" ? true : false}
              />
              <span>3 Star</span>
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleFilter("4")}
            >
              <input
                type="checkbox"
                checked={filterValue === "4" ? true : false}
              />
              <span>4 Star</span>
            </Div>
            <Div
              className={styles.checkBoxContainer}
              onClick={() => handleFilter("5")}
            >
              <input
                type="checkbox"
                checked={filterValue === "5" ? true : false}
              />
              <span>5 Star</span>
            </Div>
            {filterValue ? (
              <Div
                className={styles.Clear}
                onClick={() => {
                  handleFilter("");
                  setTimeout(() => {
                    this.setState({ content: "none" });
                  }, 1000);
                }}
              >
                CLEAR Filter
              </Div>
            ) : null}

            <button
              className={styles.applySortBtn}
              disabled={filterValue ? false : true}
              onClick={() => {
                applyFilter();
                setTimeout(() => {
                  this.setState({ content: "none" });
                }, 1000);
              }}
            >
              Apply Filter
            </button>
          </Div>
        );
      default:
        return (
          <Div className={styles.sortAndFilter}>
            <Div
              className={styles.sort}
              onClick={() => {
                this.setState({ content: "sort" });
              }}
            >
              Sort
            </Div>
            <Div
              className={styles.filter}
              ta="center"
              onClick={() => {
                this.setState({ content: "filter" });
              }}
            >
              Filter
            </Div>
          </Div>
        );
    }
  };
  render() {
    const { content } = this.state;
    return (
      <Section
        className={styles.fixedReviewBottom}
        mb="0"
        p="0.5rem 0.5rem 0.625rem"
      >
        {this.getContent(content)}
      </Section>
    );
  }
}
