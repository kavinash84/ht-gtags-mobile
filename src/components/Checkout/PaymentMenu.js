import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Button from 'hometown-components/lib/Buttons';
import Text from 'hometown-components/lib/Text';

import { HOME_URL} from 'helpers/Constants';
import { getCartCount } from 'selectors/cart';

const styles = require('./PaymentMenu.scss');
const Back = require('../../../static/payments/partialBack.svg');


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
export default class PaymentMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { history, type } = this.props;
    return (
      <div className={`${styles.Container} ${styles.hamburger} ${type === 'overlap' ? styles.overlap : ''}`}>
        <Container type="container" pr="0.625rem" pl="0.625rem">
          <div className={styles.back}  style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 8px 15px',
                  margin: 0
                }}>
            <Button btnType="link" color="transparent" onClick={history.goBack} p="0">
              {' '}
              <div style={{display:'flex'}}>
              <img src={Back} alt="Back" />{' '}
              </div>
           
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}

PaymentMenu.defaultProps = {
  link: true,
  type: '',
  cartCount: 0,
  wishListCount: 0,
  history: {},
  router: {}
};

PaymentMenu.propTypes = {
  link: PropTypes.bool,
  history: PropTypes.object,
  router: PropTypes.object,
  type: PropTypes.string,
  cartCount: PropTypes.number,
  wishListCount: PropTypes.number
};