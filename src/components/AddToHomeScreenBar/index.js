import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
import SnackBar from '../SnackBar';

const styles = require('./index.scss');

class A2HSSnackBar extends Component {
  state = {
    setVisible: false
  };
  handleState = () => {
    this.setState({
      setVisible: false
    });
    this.props.handleMargin(false);
  };
  componentDidMount() {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredPrompt = event;
      document.querySelector('#installBtn').addEventListener('click', () => {
        // Show the prompt
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
          } else {
          }
          deferredPrompt = null;
        });
      });
      this.setState({
        setVisible: true
      });
      this.props.handleMargin(true);
    });
    window.addEventListener('appinstalled', this.handleState);
    document.querySelector('#cancelBtn').addEventListener('click', this.handleState);
    /* eslint-disable */
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.setState({
        setVisible: false
      });
      this.props.handleMargin(false);
    }
    /* eslint-enable */
  }
  componentWillUnmount() {
    window.removeEventListener('appinstalled', this.handleState);
    window.removeEventListener('beforeinstallprompt', this.handleState);
    this.props.handleMargin(false);
  }
  render() {
    return (
      <SnackBar
        ribbonClass={styles.addToHomeRibbon}
        title="Install this web app to your phone"
        showRibbon={this.state.setVisible}
      >
        <Button
          id="installBtn"
          btnType="btnOutline"
          fontSize="12px"
          color="#FFF"
          border="1px solid #FFF !important"
          bg="transparent"
          p="8px 12px !important"
          ml="10px"
          lh="0.6"
          hoverColor="black"
        >
          Add
        </Button>
        <Button
          id="cancelBtn"
          btnType="btnOutline"
          fontSize="12px"
          color="rgba(255,255,255,0.8) !important"
          border="1px solid #FFF"
          bg="transparent !important"
          p="8px 2px !important"
          ml="10px"
          lh="0.6"
          hoverColor="black !important"
        >
          Cancel
        </Button>
      </SnackBar>
    );
  }
}

A2HSSnackBar.propTypes = {
  handleMargin: PropTypes.func.isRequired
};

export default A2HSSnackBar;
