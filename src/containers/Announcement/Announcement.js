import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuFooter from 'containers/OtherMenuFooter';
import { getPageContent } from 'selectors/static';

@connect(({ staticPages: { announcementpagedata } }) => ({
  page: getPageContent(announcementpagedata)
}))
export default class AnnouncementPage extends Component {
  componentDidMount() {
    const { page } = this.props;
    if (page) {
      const element = document.getElementById('content-announcement');
      element.innerHTML = page;
    }
  }
  render() {
    return (
      <MenuFooter pageTitle="Announcement" seoDescription="Announcement Hometown same day return policy">
        <div id="content-announcement" />
      </MenuFooter>
    );
  }
}

AnnouncementPage.defaultProps = {
  page: ''
};

AnnouncementPage.propTypes = {
  page: PropTypes.string
};
