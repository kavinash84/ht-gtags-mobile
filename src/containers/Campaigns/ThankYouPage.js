import React, { Component } from "react";
import Helmet from 'react-helmet';
import styled from "styled-components";
import { connect } from "react-redux";

@connect(({ landing }) => ({
  data: landing.successData
}))
class ThankYouPage extends Component {
  state = {
    count: 1
  };
  render() {
    const { seoInfo, data } = this.props;
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ''}`}>
          <script>{'gtag(\'event\', \'conversion\', { send_to: \'AW-832074530/h7wJCMXmzdcCEKLm4YwD\' });'}</script>
        </Helmet>
      <div>
        <Description
          itemProp="description"
          fontSize="0.875rem"
          dangerouslySetInnerHTML={{ __html: data.successPageHtml }}
        />
      </div>
      </section>
    );
  }
}

export default ThankYouPage;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.6;
  ul {
    padding-left: 20px;
    li {
      font-size: 14px;
      margin-bottom: 5px;
      font-family: light;
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
`;
