import React, { Component } from "react";
import ReviewMenu from "../../components/ReviewMenu";
import PostComp from "../../components/BlogComp/PostComp";

export default class Blog extends Component {
  render() {
    return (
      <div>
        <ReviewMenu backBtn={false} />
        <PostComp />
      </div>
    );
  }
}
