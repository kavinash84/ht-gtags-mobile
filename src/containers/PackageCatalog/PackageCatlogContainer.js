import React, { Component } from "react";
import PropTypes from "prop-types";
import Wrapper from "hometown-components/lib/Wrapper";
import PackageCatalog from "../../components/PackageCatalog";
import { setCurrentPackage } from "../../redux/modules/lackpackages";

export default class PackageCatlogContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      match: {
        params: { packageid }
      }
    } = this.props;
    if (packageid) {
      const { dispatch } = this.context.store;
      dispatch(setCurrentPackage(packageid));
    }
  }
  render() {
    const { history } = this.props;
    return (
      <Wrapper>
        <PackageCatalog history={history} />
      </Wrapper>
    );
  }
}
