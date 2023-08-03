import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';

import { HOME_URL, WISHLIST_URL, CART_URL, MY_PROFILE_URL } from 'helpers/Constants';
import { getCartCount } from 'selectors/cart';

const styles = require('./OtherMenu.scss');
const BackIcon = require('../../../static/cart/back.svg');

@connect(
  ({ wishlist, homepage, cart, router }) => ({
    wishListCount: wishlist.data.length,
    menu: homepage.menu.data,
    cartCount: getCartCount(cart),
    router
  }),
  null
)
@withRouter
export default class OtherMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { history, type, link, cartCount, wishListCount } = this.props;
    return (
      <div className={`${styles.otherMenuContainer} ${styles.hamburger} ${type === 'overlap' ? styles.overlap : ''}`}>
        <Container type="container" pr="0.625rem" pl="0.625rem">
          <Div className={styles.back} col="6">
            <Button btnType="link" color="transparent" onClick={history.goBack} p="3px 0">
              {' '}
              <img src={BackIcon} alt="Back" />{' '}
            </Button>
            {/* <Fragment>
              {link ? (
                <Link to={HOME_URL}>
                  <Img className={styles.logo} src={LogoIcon} alt="Hometown" />
                </Link>
              ) : (
                <Img className={styles.logo} src={LogoIcon} alt="Hometown" />
              )}
            </Fragment> */}
          </Div>
          {/* <Div className={styles.rightBLock} col="6" ta="right" pt="4px">
            <Link p="0" className={styles.cart} to="/track-order">
              <Img src={orderTrackIcon} alt="Cart" height="20px" width="20px" position="relative" top="-2px" />
            </Link>
            <Link p="0" className={styles.cart} to={WISHLIST_URL}>
              <Img src={FavIcon} alt="Cart" height="20px" width="20px" />
              <span className={styles.count}>{wishListCount}</span>
            </Link>
            <Link className={styles.cart} to={CART_URL}>
              <Img src={CartIcon} alt="Cart" height="20px" width="20px" />
              <span className={styles.count}>{cartCount}</span>
            </Link>
            <Link className={styles.cart} to={MY_PROFILE_URL}>
              <Img src={ProfileIcon} alt="Cart" height="20px" width="20px" />
            </Link>
          </Div> */}
        </Container>
      </div>
    );
  }
}

OtherMenu.defaultProps = {
  link: true,
  type: '',
  cartCount: 0,
  wishListCount: 0,
  history: {},
  router: {}
};

OtherMenu.propTypes = {
  link: PropTypes.bool,
  history: PropTypes.object,
  router: PropTypes.object,
  type: PropTypes.string,
  cartCount: PropTypes.number,
  wishListCount: PropTypes.number
};
