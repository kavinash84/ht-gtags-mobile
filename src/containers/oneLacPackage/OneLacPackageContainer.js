import React, { Component } from "react";
import Wrapper from "hometown-components/lib/Wrapper";
import OneLacPackage from "components/OneLacPackage";

export default class OneLacPackageContainer extends Component {
  render() {
    const { history } = this.props;
    return (
      <Wrapper>
        <OneLacPackage history={history} />
      </Wrapper>
    );
  }
}
