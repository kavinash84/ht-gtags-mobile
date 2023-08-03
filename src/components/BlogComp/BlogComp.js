import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import MainSlider from "components/MainSlider";
import { Link } from "react-router-dom";
import { getBlogsCatData } from "../../redux/modules/blogs";
import PackageBreadCrumb from "./BlogsBreadCrumb";

const NextArrow = require("../../../static/blogsNextArrow.svg");
const BreadCrumpstyles = require("./breadcrumb.scss");
const styles = require("./index.scss");

const formatToCarosalData = data => {
  let arr = [];
  if (Array.isArray(data) && data.length) {
    arr = data.map(item => {
      return {
        id: item.key,
        title: item.title,
        description: item.title,
        image: item.image,
        type: "webview_layout",
        url_key: "/blog",
        weData: item.title,
        meta: {
          name: item.title,
          id: item.key
        }
      };
    });
  }
  return arr;
};

@connect(({ blogs }) => ({
  homeData: blogs.homeData,
  loading: blogs.loading,
  currentCatData: blogs.currentCatData
}))
class BlogComp extends React.Component {
  state = { activeTab: 0, showMore: false };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleTabChange = id => {
    const { dispatch } = this.context.store;
    dispatch(getBlogsCatData(id));
    this.setState({ activeTab: id, showMore: false });
  };

  handleShowMore = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  componentDidMount() {
    const { homeData } = this.props;
    if (homeData.category_list && homeData.category_list.length) {
      this.handleTabChange(homeData.category_list[0].key);
    }
  }

  render() {
    const { activeTab, showMore } = this.state;
    const { homeData, currentCatData, loading } = this.props;
    const catagoryPosts = showMore
      ? currentCatData
      : currentCatData.length && currentCatData.filter((item, i) => i <= 8);
    return (
      <div className={styles.blogs_main}>
        <Helmet title="Blogs" />
        <div className={BreadCrumpstyles.BreadCrumb_wrapper2}>
          <PackageBreadCrumb />
        </div>

        <div>
          <MainSlider data={formatToCarosalData(homeData.banner_list)} />
        </div>

        <div className={styles.categorycontainer}>
          <div>
            <ul className={styles.categorylist}>
              {homeData.category_list && homeData.category_list.length ? (
                homeData.category_list.map(item => (
                  <li
                    className={activeTab === item.key ? styles.activeTab : ""}
                    onClick={() => this.handleTabChange(item.key)}
                  >
                    {item.name}
                  </li>
                ))
              ) : (
                <h3 style={{ textAlign: "center", width: "100%" }}>
                  {!loading && homeData.length === 0
                    ? "Currenlty no active articles present."
                    : null}
                </h3>
              )}
            </ul>
          </div>
          <div className={styles.posts}>
            {catagoryPosts.length
              ? catagoryPosts.map(item => (
                  <Link to={`/blog/${item.post_key}`} style={{ width: "46%" }}>
                    <div className={styles.post}>
                      <div className={styles.image_container}>
                        <img className={styles.image} src={item.main_image} />
                      </div>
                      <div className={styles.title}>{item.post_title}</div>
                      <div className={styles.date}>
                        {moment(item.date, "DD/MM/YYYY").format("Do MMMM YYYY")}
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
          <div className={styles.showMoreContainer}>
            {currentCatData && currentCatData.length > 9 && !showMore ? (
              <div onClick={() => this.handleShowMore()}>
                <span>SHOW MORE</span>
                <img src={NextArrow} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogComp;
