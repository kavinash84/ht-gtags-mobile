import React from "react";
import Button from "hometown-components/lib/Buttons";
import Img from "hometown-components/lib/Img";
import { Label } from "hometown-components/lib/Label";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import sortBy from "data/sortBy";
import { formFilterLink } from "utils/helper";

const SortIcon = require("../../../static/sort.svg");
const styles = require("./SortBy.scss");

@connect(state => ({
  categoryquery: state.products.category,
  sortby: state.products.filters.sortBy
}))
class SortBy extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    open: false
  };
  setFilter = (key, name, value, selected) => e => {
    e.preventDefault();
    const { history, categoryquery } = this.props;
    let searchquery;
    [, searchquery] = history.location.search.split("q=");
    if (searchquery) {
      [searchquery] = searchquery.split("filters=");
      [searchquery] = searchquery.split("&");
    }
    const [, b64] = history.location.search.split("filters=");

    const link = formFilterLink({
      key,
      name,
      b64,
      category: categoryquery,
      value,
      selected,
      urlquery: searchquery
    });
    history.push(link);
  };
  toggleFilterBox = () => {
    document.getElementById("content").style.overflow = !this.state.open
      ? "hidden"
      : "";
    document.getElementById("content").style.height = !this.state.open
      ? "100vh"
      : "";
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { sortby } = this.props;
    return (
      <div className={`${styles.filterBlock} dropdownWrapper`}>
        <Button
          btnType="custom"
          size="block"
          p="13px 15px 14px"
          height="50px"
          fontSize="0.875rem"
          bg="#F7F7F7"
          color="#000"
          border="none"
          onClick={this.toggleFilterBox}
        >
          <Img
            display="inline-block"
            float="none"
            va="middle"
            mr="0.3125rem"
            width="18px"
            src={SortIcon}
            alt="Sort By"
          />
          Sort By
        </Button>
        {/* eslint-disable */}
        {this.state.open && (
          <div
            onClick={this.toggleFilterBox}
            className="dropDown sortByDropDown"
          >
            {/* eslint-enable */}
            <ul>
              {sortBy.map(item => (
                <li key={item.url_key}>
                  <Label
                    className={`${item.value === sortby ? styles.active : ""}`}
                    onClick={this.setFilter(item.url_key, "SortBy", item.value)}
                    fontSize="0.875rem"
                    ml="0"
                    ta="center"
                  >
                    {item.value}
                  </Label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
SortBy.defaultProps = {
  categoryquery: "",
  sortby: ""
};
SortBy.propTypes = {
  categoryquery: PropTypes.string,
  sortby: PropTypes.string,
  history: PropTypes.object.isRequired
};
export default SortBy;
