import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Button from 'hometown-components/lib/Buttons';
import Container from 'hometown-components/lib/Container';
import Section from 'hometown-components/lib/Section';
import Row from 'hometown-components/lib/Row';
import { Label } from 'hometown-components/lib/Label';
import LocalInlineNotification from 'components/LocalInlineNotification';
import { applyCoupon, removeCoupon, loadCoupons } from 'redux/modules/coupon';
import { formatAmount } from 'utils/formatters';
// import { Label } from 'hometown-components/lib/Label';
import Notifs from '../../components/Notifs';

@connect(({
  pincode, app, coupon, cart, notifs
}) => ({
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId,
  coupon,
  cart,
  notifs
}))
class Coupon extends Component {
  constructor(props) {
    super(props);
    this.couponInput = React.createRef();
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    coupon: ''
  };

  handleChange = e => {
    this.setState({
      coupon: e.target.value
    });
  };

  handleApply = () => {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(applyCoupon(this.state.coupon, sessionId, pincode));
  };

  removeCoupon = coupon => {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(removeCoupon(coupon, sessionId, pincode));
  };
  handleClick = coupon => {
    this.setState(
      {
        coupon
      },
      () => this.handleApply()
    );
  };
  componentDidMount() {
    if (this.couponInput.current) {
      this.couponInput.current.focus();
    }
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(loadCoupons(sessionId, pincode));
  }
  render() {
    const {
      cart,
      notifs,
      coupon: { loading, coupons, unapplicablecoupons }
    } = this.props;
    const {
      summary: { coupon: appliedCoupon, coupon_discount: couponDiscount }
    } = cart;
    const styles = require('./Coupon.scss');
    return (
      <Div type="block">
        <Section mb="0.3125rem" p="0.5rem 0">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light" pb="2px">
                Shopping Cart
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section
          pt="0.625rem"
          pb="4rem"
          mb="0"
          bg="sectionBgDark"
          boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
          display="flex"
          height="calc(100vh - 94px)"
          of="auto"
        >
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <div className={styles.acSidebarDetails}>
              <Div col="12" mt="0" mb="2rem">
                <Heading fontFamily="regular" fontSize="1rem" mb="0.625rem" color="secondary">
                  APPLY COUPON
                </Heading>
                {appliedCoupon && (
                  <Label color="success" lh="1.5">
                    {` Coupon code ${appliedCoupon} Applied Successfully, Discount Rs.${formatAmount(couponDiscount)}`}
                  </Label>
                )}
                <Div className={styles.applyCoupon}>
                  <div className={`${styles.applyCouponWrapper}`}>
                    <form onSubmit={this.handleApply}>
                      <input
                        className={styles.applyCopupnField}
                        type="text"
                        placeholder="Enter coupon code"
                        onChange={this.handleChange}
                        value={this.state.coupon.toUpperCase() || appliedCoupon.toUpperCase()}
                        readOnly={!!appliedCoupon}
                        ref={this.couponInput}
                      />
                      <Button
                        className={styles.applyCouponBtn}
                        btnType="link"
                        color="#f98d29"
                        fontFamily="semibold"
                        pl="0"
                        pr="0"
                        fontSize="0.875rem"
                        disabled={loading || (notifs.coupon && notifs.coupon.length > 0)}
                        onClick={appliedCoupon ? () => this.removeCoupon(appliedCoupon) : this.handleApply}
                      >
                        {appliedCoupon ? 'X Remove' : 'Apply'}
                      </Button>
                    </form>
                    {notifs.coupon && (
                      <Notifs namespace="coupon" NotifComponent={props => <LocalInlineNotification {...props} />} />
                    )}
                    {/* {error && <div>{errorMsg}</div>} */}
                  </div>
                  {coupons.length > 0 && (
                    <Div>
                      <Label ta="center" display="block" mt="1rem" mb="1rem">
                        OR
                      </Label>
                    </Div>
                  )}
                  {
                    <Div className={`${styles.offerList} `}>
                      {coupons.length > 0 && (
                        <Div className={styles.applicableCouponsWrapper}>
                          <Label
                            color="label"
                            fontSize="0.75rem"
                            fontFamily="medium"
                            display="block"
                            mt="0"
                            mb="0.625rem"
                            ta="left"
                          >
                            Choose a Valid Coupon
                          </Label>
                          <ul className={styles.applicableCoupons}>
                            {coupons.map((item, index) => (
                              <li
                                className={`${item.couponCode === appliedCoupon ? styles.active : ''}`}
                                key={String(index)}
                              >
                                <Label display="block" mt="0" mb="0" htmlFor={`coupon-${String(index)}`}>
                                  <Button
                                    onClick={() => {
                                      this.handleClick(item.couponCode);
                                    }}
                                    btnType="link"
                                    size="block"
                                    p="0"
                                    ta="left"
                                  >
                                    <div className={styles.couponWrapper}>
                                      <div className={styles.coupon}>
                                        <input
                                          checked={item.couponCode.toLowerCase() === appliedCoupon.toLowerCase()}
                                          type="radio"
                                          name="coupons"
                                          id={`coupon-${String(index)}`}
                                          readOnly
                                        />
                                        <Label className={styles.couponCode} ml="0.625rem">
                                          {item.couponCode}
                                        </Label>
                                        {item.discount_type === 'fixed' ? (
                                          <Label className={styles.saveRs}>
                                            Flat{' '}
                                            <span>
                                              <b>Rs. {parseInt(item.discount_amount, 10)}</b>
                                            </span>{' '}
                                            OFF
                                          </Label>
                                        ) : (
                                          <Label className={styles.saveRs}>
                                            Flat{' '}
                                            <span>
                                              <b>{parseInt(item.discount_percentage, 10)} %</b>
                                            </span>{' '}
                                            Off
                                          </Label>
                                        )}
                                        <p className={styles.offerDetails}>{item.description}</p>
                                      </div>
                                    </div>
                                  </Button>
                                </Label>
                              </li>
                            ))}
                          </ul>
                        </Div>
                      )}

                      {unapplicablecoupons.length > 0 && (
                        <Div className={styles.unapplicableCouponsWrapper}>
                          <Label
                            color="primary"
                            fontSize="0.75rem"
                            fontFamily="medium"
                            display="block"
                            mt="0"
                            mb="0.625rem"
                            ta="left"
                          >
                            Other Offers
                          </Label>
                          <ul className={styles.unapplicableCoupons}>
                            {unapplicablecoupons.map(item => (
                              <li
                                className={`${item.couponCode === appliedCoupon ? styles.active : ''}`}
                                key={item.couponCode}
                              >
                                <div className={styles.couponWrapper}>
                                  <div className={styles.coupon}>
                                    <Label htmlFor={item.couponCode} className={styles.couponCode} ml="0.625rem">
                                      {item.couponCode}
                                    </Label>
                                    {item.discount_type === 'fixed' ? (
                                      <Label htmlFor={item.couponCode} className={styles.saveRs}>
                                        Flat{' '}
                                        <span>
                                          <b>Rs.{parseInt(item.discount_amount, 10)}</b>
                                        </span>{' '}
                                        OFF
                                      </Label>
                                    ) : (
                                      <Label htmlFor={item.couponCode} className={styles.saveRs}>
                                        Flat{' '}
                                        <span>
                                          <b>{parseInt(item.discount_percentage, 10)} %</b>
                                        </span>{' '}
                                        Off
                                      </Label>
                                    )}
                                  </div>
                                  <p htmlFor={item.couponCode} className={styles.offerDetails}>
                                    {item.description}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </Div>
                      )}
                    </Div>
                  }
                </Div>
              </Div>
            </div>
          </Container>
        </Section>
      </Div>
    );
  }
}

Coupon.propTypes = {
  pincode: PropTypes.string,
  sessionId: PropTypes.string,
  coupon: PropTypes.object,
  cart: PropTypes.object,
  notifs: PropTypes.object
};
Coupon.defaultProps = {
  sessionId: '',
  pincode: '',
  cart: {},
  coupon: {},
  notifs: {}
};
export default Coupon;
