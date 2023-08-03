import React, { Component } from "react";

export default class UnbxdListing extends Component {
  // componentDidMount() {
  //   // alert('in componentDidMount')
  //   // window.unbxd_fun()
  // }
  // componentWillMount() {
  //   //alert('in componentWillMount')
  // }
  // componentWillUnmount() {
  //   // alert('in componentWillUnMount')
  // }

  // componentWillUpdate() {
  //  // alert('in componentWillUpdate')
  //   // window.unbxd_fun()
  // }

  // componentDidUpdate() {
  //   // alert('in componentDidUpdate');
  //   // window.unbxd_fun();
  // }
  /* eslint-disable */
  render() {
    return (
      <React.Fragment>
        <div id="listing-ht">
          <div className="hometown">
            <div className="sort-popup sort-container" id="mypopup">
              <div className="sortByDropDown" />
            </div>
            <div id="mySidepanel" className="sidepanel">
              <div className="head">
                <p>Filter</p>
              </div>
              <div className="main-sidebody" />
              <div className="foot">
                <table>
                  <tr>
                    <td>
                      <button className="clearall-btn">Clear All</button>
                    </td>
                    <td>
                      <button className="apply-btn">Apply</button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <section className="filterwrapper">
              <div className="filter">
                <div className="parent_flex">
                  <div className="child_flex">
                    {/* <div className="left-col">
                      <p className="filterby" />
                    </div> */}
                  </div>
                  <div className="child_flex">
                    <div className="right-col text-right">
                      <div className="filter-icon view_mode">
                        <p>
                          <i className="fa fa-bars" aria-hidden="true" />
                        </p>
                        <p>
                          <i className="fa fa-th-large" aria-hidden="true" />
                        </p>
                      </div>
                      <div className="filter-icon">
                        <p className=".filter_open">Filter</p>
                        <p>Sort</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="didyoumean" />
              <div className="ploader" />
              <div className="search-title" />
              <div className="category-title row container center-block text-center" />
            </section>
            <section className="listwrapper">
              <div className="listing">
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
                <div className="child_flex">
                  <div className="product">
                    <div className="image-container">
                      <div
                        className="ImageShimmer__ImagePlaceHolderWrapper-sc-1uc61-0 cLbral"
                        overflow="auto"
                      >
                        <div className="ImagePlaceHolder-sc-38y6dw-0 ffaigM" />
                      </div>
                    </div>
                    <div />
                  </div>
                </div>
              </div>
              <div className="pagination">
                <button className="show-more">Show more 20 products</button>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
