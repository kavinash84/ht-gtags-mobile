import React, { Component } from "react";
import BlogComp from "../../components/BlogComp/BlogComp";
import ReviewMenu from "../../components/ReviewMenu";

export default class BlogsDesign extends Component {
  render() {
    return (
      <div>
        <ReviewMenu backBtn={false} />
        <div>
          <BlogComp />
        </div>
      </div>
    );
  }
}
