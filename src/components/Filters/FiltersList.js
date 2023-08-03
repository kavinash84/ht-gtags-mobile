import React, { Component } from "react";
import { Label } from "hometown-components/lib/Label";
import PropTypes from "prop-types";
import Button from "hometown-components/lib/Buttons";

const styles = require("./Filters.scss");

const checkStyles = require("../Cart/checkbox.scss");

class FiltersListDropDown extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    categoryName: PropTypes.string.isRequired
  };
  state = {
    open: false
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { open } = this.state;
    const { children, categoryName } = this.props;
    return (
      <li className={`${styles.block} ${open ? styles.active : null}`}>
        <Button btnType="link" p="0" onClick={this.handleClick}>
          {categoryName}
          <span>❯</span>
        </Button>
        {children}
      </li>
    );
  }
}

const FilterList = ({ filters, onclick }) => {
  let lastselected;
  if (filters[0]) {
    filters[0].attributes.map((item, index) => {
      if (item.isSelected) {
        lastselected = index;
      }
      return 0;
    });
  }
  const uniqueFilters = {};
  return (
    <div className={styles.filtersList}>
      <ul>
        {/* eslint-disable */}
        {filters.map((item, index) => {
          const filterName = item.name || "";
          if (!uniqueFilters[filterName]) {
            uniqueFilters[filterName] = true;
            return (
              <FiltersListDropDown
                categoryName={
                  item.name === "Product main material" ? "Material" : item.name
                }
                key={String(index)}
              >
                <ul>
                  {item.attributes.map((subfilter, index) => (
                    <li
                      key={subfilter.value}
                      onClick={
                        lastselected >= 1 &&
                        index === lastselected &&
                        item.name === "Category"
                          ? onclick(
                              filters[0] &&
                                filters[0].attributes[lastselected - 1].url_key,
                              item.name,
                              "",
                              filters[0] &&
                                filters[0].attributes[lastselected - 1]
                                  .isSelected
                            )
                          : onclick(
                              subfilter.url_key,
                              item.name,
                              "",
                              subfilter.isSelected
                            )
                      }
                    >
                      <div className={checkStyles.checkbox}>
                        <input
                          type="checkbox"
                          id="checkbox"
                          onChange={() => {}}
                          checked={subfilter.isSelected}
                        />
                        <label htmlFor="checkbox" />
                      </div>
                      {subfilter.isHex && (
                        <span
                          key={subfilter.hex_key}
                          className={styles.colorBox}
                          style={{ backgroundColor: subfilter.hex_key }}
                        />
                      )}
                      <Label
                        htmlFor="checkbox"
                        fontSize="0.875rem"
                        ml="0.625rem"
                        va="middle"
                        mt="2px"
                        mb="0"
                        color="text"
                      >
                        {subfilter.value}
                      </Label>
                    </li>
                  ))}
                </ul>
              </FiltersListDropDown>
            );
          }
          return "";
        })}
      </ul>
    </div>
  );
};

FilterList.defaultProps = {
  filters: []
};

FilterList.propTypes = {
  filters: PropTypes.array,
  onclick: PropTypes.func.isRequired
};

export default FilterList;
