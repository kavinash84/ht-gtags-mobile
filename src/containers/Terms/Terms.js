import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtherMenuFooter from 'containers/OtherMenuFooter';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';

import { getMetaDescription, getTitle, getText } from 'selectors/homepage';

@connect(({ homepage: { terms } }) => ({
  seoDescription: getMetaDescription(terms),
  pageTitle: getTitle(terms),
  text: getText(terms)
}))
export default class Terms extends Component {
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

Terms.defaultProps = {
  seoDescription: '',
  pageTitle: '',
  text: ''
};

Terms.propTypes = {
  seoDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  text: PropTypes.string
};
