import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Theme from 'hometown-components/lib/Theme';
import { formatAmount } from 'utils/formatters';
import Coupon from './Coupon';

import { BASE_IMAGE_URL } from "helpers/Constants";

const DiscountPrimaryIcon = require('../../../static/percentage-primary.svg');
const DiscountSuccessIcon = require('../../../static/percentage-green.svg');
const EditIcon = require('../../../static/edit.svg');
const BackIcon = require('../../../static/back-icon.svg');

@connect(({ cart }) => ({
  cart
}))
export default class OrderSummary extends Component {
  state = {
    open: false
  };
  onClick = e => {
    e.preventDefault();
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render() {
    const { open } = this.state;
    const {
      totalCart,
      onClickProceed,
      cart,
      // shipping,
      loadingnextstep,
      isSubmitted,
      outOfStockList,
      btnText,
      setDiscount,
      landingPageLink,
      selectedForDemo
    } = this.props;
    const styles = require('./Coupon.scss');
    const {
      summary: { coupon: appliedCoupon, coupon_discount: couponDiscount, items_count: totalCount }
    } = cart;

    return (
      <Section className="staticAtBottom" mb="0" p="0.5rem 0.5rem 0.625rem">
        <Container type="container" pr="0.3125rem" pl="0.3125rem">
          {selectedForDemo && (
            <Row ml="0" mr="0" mb="1rem" alignItems="center" flexWrap="no-wrap" width="100%">
              <Div>
                <a href={landingPageLink} rel="noreferrer" target="_blank">
                  <Img width="100%" height="50px" src={`${BASE_IMAGE_URL}/media/cms/extras/select-for-demo-mini-banner.jpg`} alt="" />
                </a>
              </Div>
            </Row>
          )}
          <Row display="block" mr="0" ml="0" mb="10px" mt="5px">
            <Div col="7">
              {setDiscount ? (
                <Div mb="5px">
                  <Label color="text" fontFamily="regular" fontSize="0.75rem" lh="1.5" mb="0" mt="0">
                    Combo Discount :
                  </Label>
                  <Label color="textDark" fontWeight="400" fontSize="14px" ml="5px">
                    {`Rs. ${formatAmount(setDiscount)}`}
                  </Label>
                </Div>
              ) : (
                ''
              )}
              <Div>
                <Label color="text" fontFamily="regular" fontSize="16px" lh="1.5" mb="0" mt="0">
                  Cart Subtotal : <br />({totalCount || null} {totalCount > 1 ? 'Items' : 'Item'})
                </Label>
                <Label className={styles.totalCartPrice} color="textDark" fontWeight="700" fontSize="16px">
                  {' '}
                  Rs.{totalCart ? formatAmount(totalCart) : null}
                </Label>
              </Div>
            </Div>
            <Div col="5" ta="right">
              {!appliedCoupon ? (
                <Button
                  ta="left"
                  display="block"
                  btnType="link"
                  fontFamily="Light"
                  pl="0"
                  pr="0"
                  pb="0"
                  pt="3px"
                  fontSize="0.875rem"
                  color={Theme.colors.primary}
                  onClick={this.onClick}
                >
                  <Img src={DiscountPrimaryIcon} float="left" mr="0.3125rem" alt="" />
                  Apply coupon
                </Button>
              ) : (
                <Button
                  display="block"
                  btnType="link"
                  fontFamily="Light"
                  pl="0"
                  pr="0"
                  fontSize="0.75rem"
                  ta="left"
                  color={Theme.colors.primary}
                  onClick={this.onClick}
                  whiteSpace="normal"
                >
                  <Div col="10">
                    <Img mb="20px" width="20px" src={DiscountSuccessIcon} float="left" mr="0.3125rem" alt="" />
                    Applied: {appliedCoupon} <br />
                    Save Rs.{formatAmount(couponDiscount)}
                  </Div>
                  <Div col="2">
                    <Img src={EditIcon} display="inline" float="none" va="sub" width="15px" ml="0.3125rem" alt="" />
                  </Div>
                </Button>
              )}
            </Div>
          </Row>
          <Row display="block" mr="0" ml="0">
            <Button
              btnType="primary"
              size="block"
              fontWeight="regular"
              fontSize="0.875em"
              height="42px"
              lh="2"
              onClick={onClickProceed}
              disabled={loadingnextstep || isSubmitted || (outOfStockList && outOfStockList.length > 0)}
            >
              {loadingnextstep || isSubmitted ? 'Please wait...' : btnText}
            </Button>
          </Row>
          {open && (
            <div className={`${styles.acSidebar} ${styles.show}`}>
              <div className={styles.acSidebarContainer}>
                <Container type="container" pr="1rem" pl="1rem">
                  <div className={styles.back}>
                    <Button bg="transparent" border="none" onClick={this.onClick} p="0">
                      {' '}
                      <img src={BackIcon} alt="Close" />{' '}
                    </Button>
                  </div>
                </Container>
                <Coupon />
              </div>
            </div>
          )}
        </Container>
      </Section>
    );
  }
}

OrderSummary.propTypes = {
  totalCart: PropTypes.number.isRequired,
  onClickProceed: PropTypes.func.isRequired,
  cart: PropTypes.object,
  loadingnextstep: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  outOfStockList: PropTypes.array,
  btnText: PropTypes.string,
  setDiscount: PropTypes.number,
  landingPageLink: PropTypes.string,
  selectedForDemo: PropTypes.bool
};
OrderSummary.defaultProps = {
  setDiscount: 0,
  loadingnextstep: false,
  isSubmitted: false,
  outOfStockList: [],
  btnText: 'Place Order',
  cart: {},
  landingPageLink: '',
  selectedForDemo: false
};
