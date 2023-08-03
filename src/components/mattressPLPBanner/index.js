import React, { Component } from 'react';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';

@connect(({ mattresses }) => ({
  topBannerForPLP: mattresses.data.items.text.topBannerForPLP.image
}))
export class MattressPLPBanner extends Component {
  render() {
    const { topBannerForPLP } = this.props;
    return (
      <Div>
        <Img src={topBannerForPLP} alt="" width="100%" />
      </Div>
    );
  }
}

export default MattressPLPBanner;
