import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import mapIcon from "../../../static/map-icon.svg";
import { notifSend } from "redux/modules/notifs";
import { BASE_IMAGE_URL } from "helpers/Constants";

@connect(({ designBuild }) => ({
  seoInfo:
    designBuild.exchangeOffer &&
    designBuild.exchangeOffer &&
    designBuild.exchangeOffer.items,
  validity: designBuild.exchangeOfferCoupon.validity
}))
export default class SuccessPage extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    // if (window && window.dataLayer) {
    //   window.dataLayer.push({
    //     action: 'Page View',
    //     category: 'Exchange Offers',
    //     label: 'Track'
    //   });
    // }
    // if (window && window.fbq) {
    //   window.fbq("track", "SubscribeE&U");
    // }
  }
  copyFunction() {
    const { dispatch } = this.context.store;
    /* Get the text field */
    let copyText = document.getElementById("copyField");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    dispatch(
      notifSend({
        type: "success",
        msg: "Copied!",
        dismissAfter: 2000
      })
    );
  }
  render() {
  }
}
