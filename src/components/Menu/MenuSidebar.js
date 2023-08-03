import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Img from "hometown-components/lib/Img";
import Div from "hometown-components/lib/Div";
import Button from "hometown-components/lib/Buttons";
import Fav from "hometown-components/lib/Icons/Fav";
import Heading from "hometown-components/lib/Heading";
import Pincode from "components/Pincode";
import ResponsiveModal from "components/Modal";
import AddToHomeScreenBar from "components/AddToHomeScreenBar";
import {
  HOME_URL,
  WISHLIST_URL,
  SIGNUP_URL,
  LOGIN_URL,
  MY_PROFILE_URL,
  MY_ADDRESS_URL,
  CART_URL,
  MY_ORDERS_URL,
  MY_CASES_URL,
  SEARCH_URL
} from "helpers/Constants";
import Logout from "components/Logout";
import { getUserName } from "selectors/userprofile";
import { getCartCount } from "selectors/cart";
import { checkRedirection } from "utils/helper";
import CategoryMenu from "./CategoryMenu";

const BackIcon = require("../../../static/back-icon.svg");
const SearchIcon = require("../../../static/search-icon.svg");
const LogoIcon = require("../../../static/logo3x.png");
const CartIcon = require("../../../static/cart-icon.svg");
const MoreIcon = require("../../../static/more.svg");
const PincodeModalIcon = require("../../../static/map-placeholder.svg");
const PhoneIcon = require("../../../static/phone-icon.svg");
const orderTrackIcon = require("../../../static/tracking.svg");

const navigateToCategory = history => category => {
  history.push({
    pathname: `${category.pathname}`,
    search: `${category.search}`,
    state: {
      query: `${category.search}`,
      path: `${category.pathname}`,
      pincode: window.getPincode(),
      pinSetByUser: window.isPincodeFilter()
    }
  });
};

@connect(
  ({ userLogin, wishlist, profile, homepage, cart, pincode, router }) => ({
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
export default class MenuSidebar extends Component {
  constructor(props) {
    super(props);
    this.toggleContainer = React.createRef();
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    wishListCount: 0,
    isLoggedIn: false,
    userName: "",
    menu: [],
    cartCount: 0,
    selectedPincode: "",
    router: {},
    search: false,
    backBtn: false,
    menuIcon: true,
    link: true,
    type: "",
    hideright: false,
    history: {},
    logoShow: true,
    handleMargin: () => {}
  };
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    wishListCount: PropTypes.number,
    userName: PropTypes.string,
    menu: PropTypes.array,
    history: PropTypes.object,
    cartCount: PropTypes.number,
    selectedPincode: PropTypes.string,
    router: PropTypes.object,
    search: PropTypes.bool,
    backBtn: PropTypes.bool,
    menuIcon: PropTypes.bool,
    link: PropTypes.bool,
    type: PropTypes.string,
    hideright: PropTypes.bool,
    logoShow: PropTypes.bool,
    handleMargin: PropTypes.func
  };
  state = {
    open: false,
    openPincode: false,
    openShowmore: false
  };

  componentDidMount() {
    const { history } = this.props;
    if (window) {
      window.HTCATEGORY = {};
      window.HTCATEGORY.navigateToCategory = navigateToCategory(history);
    }
  }
  onClick = () => {
    this.setState(
      {
        open: !this.state.open
      },
      () => {
        document.body.style.overflow = this.state.open ? "hidden" : "";
      }
    );
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
    const { open, openShowmore } = this.state;
    const {
      isLoggedIn,
      wishListCount,
      userName,
      menu,
      history,
      cartCount,
      selectedPincode,
      search,
      menuIcon,
      backBtn,
      type,
      link,
      hideright,
      logoShow
    } = this.props;
    const styles = require("./MenuSidebar.scss");

    return (
      <Div pb="0.625rem">
        <div
          className={`${styles.hamburger} ${
            type === "overlap" ? styles.overlap : ""
          }`}
        >
          <AddToHomeScreenBar handleMargin={this.props.handleMargin} />
          <div className="container">
            <Div col="4" pt="10px">
              {backBtn && (
                <Button
                  fl="left"
                  height="30px"
                  btnType="link"
                  color="transparent"
                  onClick={history.goBack}
                  p="3.5px 8px 3px 0"
                >
                  {" "}
                  <Img src={BackIcon} alt="Back" />{" "}
                </Button>
              )}
              {menuIcon && (
                <div className={styles.barContainer}>
                  <span
                    p="3px 0"
                    className="noPadding"
                    role="presentation"
                    onClick={this.onClick}
                  >
                    <div className={styles.bar1} />
                    <div className={styles.bar2} />
                    <div className={styles.bar3} />
                  </span>
                </div>
              )}
              <div className={styles.logoWrapper}>
                {logoShow && (
                  <Fragment>
                    {link ? (
                      <Link to={HOME_URL}>
                        <Img
                          height="34px"
                          width="34px"
                          src={LogoIcon}
                          alt="Hometown"
                        />
                      </Link>
                    ) : (
                      <Img
                        height="34px"
                        width="34px"
                        src={LogoIcon}
                        alt="Hometown"
                      />
                    )}
                  </Fragment>
                )}
              </div>
            </Div>
            {!hideright && (
              <Div col="8" ta="right" pt="16px" className={styles.rightBLock}>
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
                <Link
                  p="0"
                  className={styles.cart}
                  to={isLoggedIn ? WISHLIST_URL : LOGIN_URL}
                >
                  <Fav width={22} height={22} />
                  <span className={styles.count}>
                    {isLoggedIn ? wishListCount : 0}
                  </span>
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
                    ml="0"
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
                      pt="4px"
                      pr="0"
                      onClick={this.onClickHandler}
                    >
                      <Img height="17px" src={MoreIcon} alt="filter" />
                    </Button>
                    {openShowmore && (
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
                              border="none"
                              onClick={this.handlePincodeModal}
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
          </div>
        </div>
        <div className={`${styles.sidebar} ${open ? styles.show : ""}`}>
          <button onClick={this.onClick} className={styles.closeWrapper} />
          <div className={styles.sidebarContainer}>
            {/* eslint-disable */}
            <div className={styles.sidebarUserDetails} onClick={this.onClick}>
              {/* eslint-enable */}
              {!isLoggedIn && (
                <Div>
                  <p>
                    <Link onClick={this.handleClick(LOGIN_URL)} to={LOGIN_URL}>
                      Login
                    </Link>{" "}
                    |{" "}
                    <Link
                      onClick={this.handleClick(SIGNUP_URL)}
                      to={SIGNUP_URL}
                    >
                      Sign Up
                    </Link>
                    {/* <span className={styles.arrowDown}>❯</span> */}
                  </p>
                </Div>
              )}
              {isLoggedIn && (
                <p>
                  <Link to={MY_PROFILE_URL}>Hi {userName} !</Link>
                </p>
              )}
              <div className={styles.closeIcon}>
                <Button va="super" p="0 5px" onClick={this.onClick}>
                  <img src={BackIcon} alt="Close" />
                </Button>
              </div>
            </div>
            <div className={styles.sidebarProfileMenu}>
              <CategoryMenu menu={menu} toggleSideBar={this.onClick} />
            </div>
          </div>
        </div>
        <ResponsiveModal
          onCloseModal={this.handlePincodeModal}
          open={this.state.openPincode}
          classNames={{
            overlay: "pincodeModalModal",
            modal: "pincodeModal"
          }}
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
              fontSize="1rem"
              mb="1rem"
              lh="1.5"
              fontFamily="light"
            >
              Please Enter Your Pincode <br />
              to Serve You Better
            </Heading>
            <Pincode color="#f2f2f2" onCloseModal={this.handlePincodeModal} />
          </Div>
        </ResponsiveModal>
      </Div>
    );
  }
}
