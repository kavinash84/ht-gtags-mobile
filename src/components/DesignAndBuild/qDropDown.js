import React, { Component } from 'react';
import Div from 'hometown-components/lib/Div';

const styles = require('./dropDown.scss');
const Arrow = require('../../../static/categories/Line.svg');

export default class QDropDown extends Component {
  state = {
    isOpen: false
  };
  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { title, description, length, index } = this.props;
    return (
      <Div
        style={{
          background: this.state.isOpen ? 'white' : '#F5F5F5'
        }}
      >
        {this.state.isOpen ? (
          <div style={{ padding: '0px 30px' }} onClick={this.handleClick}>
            <Div style={{ borderBottom: index + 1 === length ? 'none' : '1px solid #999999' }}>
              <Div
                style={{
                  padding: '20px 0px 22px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                  }}
                >
                  <div>{title}</div>
                  <Div
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    <img src={Arrow} alt="aarow" className={styles.iconrotate} />
                  </Div>
                </div>
              </Div>
              <div className={styles.description}>{description}</div>
            </Div>
          </div>
        ) : (
          <div style={{ padding: '0px 30px' }} onClick={this.handleClick}>
            <Div
              style={{
                padding: '20px 0px 22px',
                borderBottom: index + 1 === length ? 'none' : '1px solid #999999'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <div className={styles.title}>{title}</div>
                <Div
                  style={{
                    textAlign: 'right'
                  }}
                >
                  <img src={Arrow} alt="aarow" />
                </Div>
              </div>
            </Div>
          </div>
        )}
      </Div>
    );
  }
}
