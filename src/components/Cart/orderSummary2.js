import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import { formatAmount } from 'utils/formatters';
import ResponsiveModal from 'components/Modal';
import DemoForm from './demoForm';
import { Link } from 'react-router-dom';

const styles = require('./OrderSummary.scss');

@connect(({ cart }) => ({
  cart
}))
export default class OrderSummary2 extends Component {
  state = {
    openDemo: false
  };
  handleModal = () => {
    this.setState({ openDemo: !this.state.openDemo });
  };
  render() {
    const { totalCart } = this.props;
    const { openDemo } = this.state;
    const { onClickProceed, loadingnextstep, isSubmitted, outOfStockList, btnText, selectedForDemo } = this.props;

    return (
      <Section className={styles.fixedBottom} mb="0" p="0.5rem 0.5rem 0.625rem">
        {!openDemo && (
          <Container type="container" pr="0.3125rem" pl="0.3125rem">
            {selectedForDemo ? (
              <div
                style={{ padding: '10px', color: '#F47020', fontSize: '14px', width: '100%', textAlign: 'center' }}
                onClick={() => {
                  this.handleModal();
                }}
              >
                {/* <Link to="/virtualDemo" target="_blank"> */}
                CLICK HERE TO SCHEDULE VIRTUAL DEMO
                {/* </Link> */}
              </div>
            ) : null}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 10px 35px'
              }}
            >
              <div style={{ color: 'black' }}>
                <div style={{ fontSize: '14px', marginBottom: '5px' }}>Total Price:</div>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>₹{totalCart ? formatAmount(totalCart) : null}</div>
              </div>
              <button
                onClick={onClickProceed}
                disabled={loadingnextstep || isSubmitted || (outOfStockList && outOfStockList.length > 0)}
                style={{
                  border: '1px solid #F47020',
                  borderRadius: '4px',
                  padding: '15px 25px',
                  background: 'white',
                  color: '#F47020',
                  fontSize: '14px'
                }}
              >
                {loadingnextstep || isSubmitted ? 'Please wait...' : 'PLACE ORDER'}
              </button>
            </div>
          </Container>
        )}
        <ResponsiveModal classNames={{ modal: 'mkModal' }} onCloseModal={this.handleModal} open={this.state.openDemo}>
          {openDemo && <DemoForm handleModal={this.handleModal} />}
        </ResponsiveModal>
      </Section>
    );
  }
}
