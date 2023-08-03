import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Container from "hometown-components/lib/Container";
import Img from "hometown-components/lib/Img";
import Div from "hometown-components/lib/Div";
import Button from "hometown-components/lib/Buttons";
import Fav from "hometown-components/lib/Icons/Fav";
import Heading from "hometown-components/lib/Heading";

import Pincode from "components/Pincode";
import ResponsiveModal from "components/Modal";

import {
  HOME_URL,
  WISHLIST_URL,
  LOGIN_URL,
  MY_PROFILE_URL,
  MY_ADDRESS_URL,
  MY_HOMETOWN_WALLET_URL,
  CART_URL,
  MY_ORDERS_URL,
  MY_CASES_URL,
  SEARCH_URL
} from "helpers/Constants";
import Logout from "components/Logout";
import { getUserName } from "selectors/userprofile";
import { getCartCount } from "selectors/cart";
import { checkRedirection } from "utils/helper";

const styles = require("./OtherMenu.scss");
const BackIcon = require("../../../static/back-icon.svg");
const SearchIcon = require("../../../static/search-icon.svg");
const LogoIcon = require("../../../static/logo4x.png");
const MoreIcon = require("../../../static/more.svg");
const CartIcon = require("../../../static/cart-icon.svg");
const PincodeModalIcon = require("../../../static/map-placeholder.svg");
const PhoneIcon = require("../../../static/phone-icon.svg");
const orderTrackIcon = require("../../../static/tracking.svg");

@connect(
  ({ userLogin, wishlist, homepage, cart, profile, pincode, router }) => ({
    isLoggedIn: userLogin.isLoggedIn,
    userName: getUserName(profile),
    walletNotCreated: profile.setFuturePayStatus,
    wishListCount: wishlist.data.length,
    menu: homepage.menu.data,
    cartCount: getCartCount(cart),
    selectedPincode: pincode.selectedPincode,
    router
  }),
  null
)
@withRouter
export default class OtherMenu extends React.Component {
  constructor(props) {
    super(props);
    this.toggleContainer = React.createRef();
  }

  state = {
    openPincode: false,
    openShowmore: false,
    openWalletPopupState: true
  };
  handlePincodeModal = () => {
    this.setState({
      openPincode: !this.state.openPincode
    });
  };
  handleClick = URL => e => {
    e.preventDefault();
    const { history, router } = this.props;
    history.push(`${URL}/?redirect=${checkRedirection(router.location)}`);
  };

  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }
  componentWillUnmount() {
    document.body.style.overflow = "";
    window.removeEventListener("click", this.onClickOutsideHandler);
  }
  onClickOutsideHandler = event => {
    if (
      this.state.openShowmore &&
      !this.toggleContainer.current.contains(event.target)
    ) {
      this.setState({ openShowmore: false });
    }
  };
  onClickHandler = () => {
    this.setState(currentState => ({
      openShowmore: !currentState.openShowmore
    }));
  };
  render() {
    const {
      search,
      history,
      type,
      link,
      hideright,
      cartCount,
      wishListCount,
      isLoggedIn,
      userName,
      selectedPincode,
      logoShow
    } = this.props;
    return (
      <div
        className={`${styles.otherMenuContainer} ${styles.hamburger} ${
          type === "overlap" ? styles.overlap : ""
        }`}
      >
        <Container type="container" pr="0.625rem" pl="0.625rem">
          <Div className={styles.back} col="4">
            <Button
              btnType="link"
              color="transparent"
              onClick={history.goBack}
              p="3px 0"
            >
              {" "}
              <img src={BackIcon} alt="Back" />{" "}
            </Button>
            {logoShow && (
              <Fragment>
                {link ? (
                  <Link to={HOME_URL}>
                    <Img
                      className={styles.logo}
                      src={LogoIcon}
                      alt="Hometown"
                    />
                  </Link>
                ) : (
                  <Img className={styles.logo} src={LogoIcon} alt="Hometown" />
                )}
              </Fragment>
            )}
          </Div>
          {!hideright && (
            <Div className={styles.rightBLock} col="8" ta="right" pt="4px">
              {search && (
                <Link className={styles.searchBtn} to={SEARCH_URL}>
                  <Img
                    src={SearchIcon}
                    alt="search"
                    height="22px"
                    width="22px"
                    display="inline-block"
                  />
                </Link>
              )}
              <Link p="0" className={styles.cart} to="/track-order">
                <Img
                  src={orderTrackIcon}
                  alt="Cart"
                  height="30px"
                  width="30px"
                  position="relative"
                  top="-4px"
                />
              </Link>
              <Link p="0" className={styles.cart} to={WISHLIST_URL}>
                <Fav width={22} height={22} />
                <span className={styles.count}>{wishListCount}</span>
              </Link>
              <Link className={styles.cart} to={CART_URL}>
                <Img src={CartIcon} alt="Cart" height="22px" width="22px" />
                <span className={styles.count}>{cartCount}</span>
              </Link>
              <a className={styles.cart} href="tel:08069252525">
                <Img
                  src={PhoneIcon}
                  alt="Hometown"
                  height="22px"
                  mr="0.3125rem"
                  float="left"
                />
              </a>
              <div
                ref={this.toggleContainer}
                className={`dropdownWrapper moreIconDropdown`}
              >
                <Div
                  col="2"
                  className={`dropdownWrapper moreIconDropdown`}
                  ml="0.3125rem"
                  float="right"
                >
                  <Button
                    btnType="custom"
                    bg="#FFF"
                    color="#656565"
                    border="none"
                    fontSize="0.75em"
                    tt="uppercase"
                    fontFamily="medium"
                    pt="3px"
                    pr="0"
                    pl="0"
                    onClick={this.onClickHandler}
                  >
                    <Img height="18px" src={MoreIcon} alt="More" />
                  </Button>
                  {this.state.openShowmore && (
                    <Div
                      mt="0.3125rem"
                      className="dropDown blockRight moreIcon"
                    >
                      <ul>
                        {isLoggedIn && (
                          <li>
                            <Link to={MY_PROFILE_URL}>Hi {userName} !</Link>
                          </li>
                        )}
                        {!isLoggedIn && (
                          <li>
                            <Link
                              className={styles.cart}
                              onClick={this.handleClick(LOGIN_URL)}
                              to={LOGIN_URL}
                            >
                              Login
                            </Link>
                          </li>
                        )}
                        <li>
                          <Button
                            va="super"
                            p="0"
                            onClick={this.handlePincodeModal}
                            border="none"
                            bg="transparent"
                          >
                            Pincode -{" "}
                            {selectedPincode !== ""
                              ? selectedPincode
                              : "Pincode"}
                          </Button>
                        </li>
                        <ul>
                          {isLoggedIn && (
                            <Fragment>
                              <li>
                                <Link to={WISHLIST_URL}>My Wishlist</Link>
                              </li>
                              <li>
                                <Link to={MY_ORDERS_URL}>My Orders</Link>
                              </li>
                              <li>
                                <Link to={MY_CASES_URL}>My Cases</Link>
                              </li>
                            </Fragment>
                          )}
                          <li>
                            <Link to="/store-locator">Store Locator</Link>
                          </li>
                          <li>
                            <Link to="/contact-us">Contact us</Link>
                          </li>
                          {isLoggedIn && (
                            <Fragment>
                              <li>
                                <Link to={MY_ADDRESS_URL}>My Address</Link>
                              </li>
                              <li>
                                <Link to={MY_PROFILE_URL}>My Profile</Link>
                              </li>
                              <li>
                                <Logout />
                              </li>
                            </Fragment>
                          )}
                        </ul>
                      </ul>
                    </Div>
                  )}
                </Div>
              </div>
            </Div>
          )}
          <ResponsiveModal
            classNames={{
              overlay: "pincodeModalModal",
              modal: "pincodeModal"
            }}
            onCloseModal={this.handlePincodeModal}
            open={this.state.openPincode}
          >
            <Div>
              <Img
                width="80px"
                m="auto"
                mb="1.25rem"
                src={PincodeModalIcon}
                alt="Pincode"
              />
              <Heading
                ellipsis={false}
                color="rgba(0.0.0.0.8)"
                ta="center"
                fontSize="1.125rem"
                mb="1rem"
                lh="1.5"
                fontFamily="light"
              >
                Please enter your Pincode to serve you better
              </Heading>
              <Pincode color="#f2f2f2" onCloseModal={this.handlePincodeModal} />
            </Div>
          </ResponsiveModal>
        </Container>
      </div>
    );
  }
}

OtherMenu.defaultProps = {
  search: false,
  link: true,
  type: "",
  hideright: false,
  cartCount: 0,
  wishListCount: 0,
  isLoggedIn: false,
  userName: "",
  selectedPincode: "",
  history: {},
  router: {},
  logoShow: true
};

OtherMenu.propTypes = {
  search: PropTypes.bool,
  link: PropTypes.bool,
  history: PropTypes.object,
  router: PropTypes.object,
  type: PropTypes.string,
  hideright: PropTypes.bool,
  cartCount: PropTypes.number,
  wishListCount: PropTypes.number,
  isLoggedIn: PropTypes.bool,
  userName: PropTypes.string,
  selectedPincode: PropTypes.string,
  logoShow: PropTypes.bool,
  walletNotCreated: PropTypes.bool
};
