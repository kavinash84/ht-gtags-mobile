import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'hometown-components/lib/Container';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';

import { HOME_URL } from 'helpers/Constants';
import { getCartCount } from 'selectors/cart';

const styles = require('./SuccessMenu.scss');
const Home = require('../../../static/payments/fullBack.svg');


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
export default class SuccessPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { type } = this.props;
    return (
      <div className={`${styles.Container} ${styles.hamburger} ${type === 'overlap' ? styles.overlap : ''}`}>
        <Container type="container" pr="0.625rem" pl="0.625rem">
          <div className={styles.back}  style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 15px 15px',
                  margin: 0
                }}>
            <Button btnType="link" color="transparent" p="0">
              {' '}
              <Text  style={{ color:'black', fontSize:'16px', fontWeight:'bold' }}>
                Order Placed
                </Text>
              {' '}
            </Button>
            <Link to={HOME_URL}>
            <Button btnType="link" color="transparent"  p="0">
              {' '}
              <img src={Home} alt="Back" />{' '}
            </Button>
           </Link>
          </div>
        </Container>
      </div>
    );
  }
}

SuccessPage.defaultProps = {
  link: true,
  type: '',
  cartCount: 0,
  wishListCount: 0,
  history: {},
  router: {}
};

SuccessPage.propTypes = {
  link: PropTypes.bool,
  history: PropTypes.object,
  router: PropTypes.object,
  type: PropTypes.string,
  cartCount: PropTypes.number,
  wishListCount: PropTypes.number
};