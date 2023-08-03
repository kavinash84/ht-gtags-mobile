import React, { Component } from "react";
import { connect } from "react-redux";
import Div from "hometown-components/lib/Div";
import WarrantyComp from "components/WarrantyComp";

@connect(({ designBuild: { warranty, warrantyCat } }) => ({
  warranty: warranty.items.text,
  warrantyCat:
    (warrantyCat && warrantyCat.items && warrantyCat.items.text) || ""
}))
export default class WarrantyContainer extends Component {
  render() {
    const { warranty, warrantyCat } = this.props;
    return (
      <Div>
        <WarrantyComp data={warranty} warrantyCat={warrantyCat} />
      </Div>
    );
  }
}
