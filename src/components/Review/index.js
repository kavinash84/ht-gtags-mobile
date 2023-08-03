import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components/lib/Section";
import Div from "hometown-components/lib/Div";
import Img from "hometown-components/lib/Img";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import ReviewMenu from "../ReviewMenu";
import FurnitureBreadCrumb from "../furnitureCategories/furnitureBredCumb";
import Reviews from "./Reviews";
import SortAndFilter from "./sortAndFilter";
import { loadReviewsList, togglePageNumber } from "../../redux/modules/reviews";

const styles = require("./BreadCrumb.scss");

@connect(({ reviews }) => ({
  ReviewsData: reviews.reviewsList,
  cmsData: reviews.cmsData.items.text
}))
export default class ReviewComponentsContainer extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pageNo: 0,
    pageSize: 8,
    filterValue: "",
    sortValue: "",
    filterValue2: "",
    sortValue2: ""
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { dispatch } = this.context.store;
    const { ReviewsData } = this.props;
    const { pageNo, pageSize } = this.state;
    // if (Array.isArray(ReviewsData.length)) {
    if (ReviewsData.length === 0) {
      const data = `pageNo=${pageNo}&pageSize=${pageSize}`;
      dispatch(loadReviewsList(data));
    }
    // }
  }
  handlePagination = () => {
    const { pageNo, pageSize } = this.state;
    const { dispatch } = this.context.store;
    dispatch(togglePageNumber(null));
    this.setState({ pageNo: pageNo + 1 });
  };
  handleFilter = value => {
    if (value) {
      this.setState({ filterValue: value });
    } else {
      const { dispatch } = this.context.store;
      const { pageNo, pageSize, filterValue, sortValue } = this.state;
      const data = sortValue
        ? `pageNo=${0}&pageSize=${8}&sort=${sortValue}`
        : `pageNo=${0}&pageSize=${8}`;
      dispatch(loadReviewsList(data));
      this.setState({
        filterValue: "",
        filterValue2: "",
        pageNo: 0,
        pageSize: 8
      });
    }
  };

  handleSort = value => {
    if (value) {
      this.setState({ sortValue: value });
    } else {
      const { dispatch } = this.context.store;
      const { pageNo, pageSize, filterValue, sortValue } = this.state;
      const data = filterValue
        ? `pageNo=${0}&pageSize=${8}&rating=${filterValue}`
        : `pageNo=${0}&pageSize=${8}`;
      dispatch(loadReviewsList(data));
      this.setState({ sortValue: "", sortValue2: "", pageNo: 0, pageSize: 8 });
    }
  };
  applySort = () => {
    const { dispatch } = this.context.store;
    dispatch(togglePageNumber(1));
    const { pageNo, pageSize, filterValue, sortValue } = this.state;
    const data = filterValue
      ? `pageNo=${0}&pageSize=${8}&rating=${filterValue}&sort=${sortValue}`
      : `pageNo=${0}&pageSize=${8}&sort=${sortValue}`;
    dispatch(loadReviewsList(data));

    this.setState({
      sortValue2: sortValue,
      pageNo: 0,
      pageSize: 8
    });
    document.getElementById("focusIDForReview").scrollIntoView();
  };
  applyFilter = () => {
    const { dispatch } = this.context.store;
    dispatch(togglePageNumber(1));
    const { pageNo, pageSize, filterValue, sortValue } = this.state;
    const data = sortValue
      ? `pageNo=${0}&pageSize=${8}&sort=${sortValue}&rating=${filterValue}`
      : `pageNo=${0}&pageSize=${8}&rating=${filterValue}`;
    dispatch(loadReviewsList(data));

    this.setState({
      filterValue2: filterValue,
      pageNo: 0,
      pageSize: 8
    });
    document.getElementById("focusIDForReview").scrollIntoView();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageNo !== prevState.pageNo) {
      const { dispatch } = this.context.store;
      const { pageNo, pageSize, filterValue2, sortValue2 } = this.state;
      let data = ``;
      if (sortValue2 && filterValue2) {
        data = `pageNo=${pageNo}&pageSize=${pageSize}&rating=${filterValue2}&sort=${sortValue2}`;
      } else if (sortValue2) {
        data = `pageNo=${pageNo}&pageSize=${pageSize}&sort=${sortValue2}`;
      } else if (filterValue2) {
        data = `pageNo=${pageNo}&pageSize=${pageSize}&rating=${filterValue2}`;
      } else {
        data = `pageNo=${pageNo}&pageSize=${pageSize}`;
      }
      dispatch(loadReviewsList(data));
    }
  }
  render() {
    const { filterValue, sortValue } = this.state;
    return (
      <Section p="0" mb="0">
        <div className="wrapper" style={{ paddingBottom: "76px" }}>
          <ReviewMenu backBtn={false} />
          <div className={styles.BreadCrumb_wrapper2}>
            <FurnitureBreadCrumb urlKey="reviews" name="Review" />
          </div>
          <Div id="focusIDForReview">
            <Link to="/writereview">
              <Img src={this.props.cmsData.mobile.top} alt="Banner" />
            </Link>
          </Div>
          <Div style={{ background: "#f5f7fa" }}>
            <Reviews handlePagination={this.handlePagination} />
          </Div>
          <Div pt="30px" style={{ background: "#f5f7fa" }}>
            {/* <Link to="/writereview"> */}
            <Img src={this.props.cmsData.mobile.top} alt="Banner" />
            {/* </Link> */}
          </Div>
        </div>
        <SortAndFilter
          filterValue={filterValue}
          sortValue={sortValue}
          handleFilter={this.handleFilter}
          handleSort={this.handleSort}
          applySort={this.applySort}
          applyFilter={this.applyFilter}
        />
      </Section>
    );
  }
}
