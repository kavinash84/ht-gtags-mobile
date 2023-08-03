import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherMenuFooter from 'containers/OtherMenuFooter';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';

import { getMetaDescription, getTitle, getText } from 'selectors/homepage';

@connect(({ homepage: { privacy } }) => ({
  seoDescription: getMetaDescription(privacy),
  pageTitle: getTitle(privacy),
  text: getText(privacy)
}))
export default class PrivacyPolicy extends Component {
  render() {
    const { seoDescription, pageTitle, text } = this.props;
    return (
      <OtherMenuFooter backBtn menuIcon={false} Footer pageTitle={pageTitle} seoDescription={seoDescription}>
        <Container>
          <Div pt="2rem" pb="2.5rem" dangerouslySetInnerHTML={{ __html: text }} />
        </Container>
      </OtherMenuFooter>
    );
  }
}

PrivacyPolicy.defaultProps = {
  seoDescription: '',
  pageTitle: '',
  text: ''
};

PrivacyPolicy.propTypes = {
  seoDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  text: PropTypes.string
};
