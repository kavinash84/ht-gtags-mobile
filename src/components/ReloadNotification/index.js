import React, { Component } from 'react';
import Button from 'hometown-components/lib/Buttons';
import Refresh from 'hometown-components/lib/Icons/Refresh';
import SnackBar from '../SnackBar';

const styles = require('./index.scss');

class ReloadNotification extends Component {
  state = {
    hasUpdates: false
  };
  componentDidMount() {
    window.addEventListener('updatesFound', this.handleToggle);
  }
  componentWillUnmount() {
    window.removeEventListener('updatesFound', this.handleToggle);
  }
  handleToggle = () => {
    this.setState({ hasUpdates: true });
  };
  render() {
    return (
      <SnackBar title="A new version available" showRibbon={this.state.hasUpdates} ribbonClass={styles.reloadRibbion}>
        <Button
          btnType="btnOutline"
          fontSize="12px"
          color="#FFF"
          border="1px solid #FFF"
          bg="transparent"
          p="3px 8px"
          ml="10px"
          lh="0.6"
          hoverColor="black"
          onClick={() => window && window.location.reload()}
        >
          <Refresh fill="#FFF" width="18px" height="18px" /> Update
        </Button>
      </SnackBar>
    );
  }
}
export default ReloadNotification;
