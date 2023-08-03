import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherMenuFooter from 'containers/OtherMenuFooter';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';

import { getMetaDescription, getTitle, getText } from 'selectors/homepage';

@connect(({ homepage: { cancellation } }) => ({
  seoDescription: getMetaDescription(cancellation),
  pageTitle: getTitle(cancellation),
  text: getText(cancellation)
}))
export default class Cancellation extends Component {
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

Cancellation.defaultProps = {
  seoDescription: '',
  pageTitle: '',
  text: ''
};

Cancellation.propTypes = {
  seoDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  text: PropTypes.string
};
