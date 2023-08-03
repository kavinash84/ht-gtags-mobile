import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import BestOfferBanners from 'components/Listing/BestOfferBanners';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formatProductURL } from 'utils/helper';
import { setProductPosition } from 'redux/modules/productdetails';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { addToCart } from 'redux/modules/cart';
import { setPincode } from 'redux/modules/pincode';
import UnbxdListing from './UnbxdListing';
import CategoryBar from './CategoryBar';
import BreadCrumb from './BreadCrumb';
import MattressPLPBanner from '../mattressPLPBanner';
import { viewSubCategory } from '../../redux/modules/category';
import ResponsiveModal from 'components/Modal';
import { Link } from 'react-router-dom';
import { BASE_IMAGE_URL } from 'helpers/Constants';

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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      wishlistToggle: toggleWishList,
      productPosition: setProductPosition,
      addToWaitList: wishListWaitList,
      addItemToCart: addToCart,
      setPincodeToStore: setPincode
    },
    dispatch
  );
const mapStateToProps = state => ({
  filterLoading: state.products.filterLoading,
  categoryquery: state.products.category,
  loadingList: state.wishlist.loadingList,
  togglefilter: state.products.togglefilter,
  selectedPincode: state.pincode.selectedPincode
});

class Listing extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
  state = {
    openLogin: false,
    display: 'block',
    currentPath: '',
    openModal: false
  };

  handleModal = () => {
    this.setState({
      openModal: false
    });
  };

  componentDidMount() {
    const {
      setPincodeToStore,
      breadCrumbs,
      history,
      history: {
        location: { pathname }
      }
    } = this.props;
    const { dispatch } = this.context.store;
    if (breadCrumbs.length >= 2) {
      dispatch(
        viewSubCategory({
          path: pathname,
          category: (breadCrumbs && breadCrumbs.length && breadCrumbs[0].name) || '',
          sub_category: (breadCrumbs && breadCrumbs.length && breadCrumbs[1].name) || ''
        })
      );
    }

    if (window && breadCrumbs && pathname.indexOf('search') === -1) {
      let url = '';
      breadCrumbs.forEach((item, i) => {
        if (i === breadCrumbs.length - 1) {
          url += `${item.name}`;
        } else {
          url += `${item.name}>`;
        }
      });
      window.unbxd_category = url || 'None';
    }
    if (window) {
      window.HT = {};
      window.HT.toggleWishList = this.onClickWishList;
      window.HT.isInWishList = this.isInWishList;
      window.HT.addToCart = this.AddToCartHandler;
      window.HT.isInCart = this.isInCart;
      window.HT.gotoPDP = this.gotoPDP;
      window.HT.gotoCart = this.gotoCart;
      window.HT.setPincode = setPincodeToStore;
      window.HT.history = history;
      // window.unbxd_fun();
      if (window.renderListing) {
        window.renderListing(true);
      }
    }
    if (window) {
      window.HTCATEGORY = {};
      window.HTCATEGORY.navigateToCategory = navigateToCategory(history);
    }
    const myArray = pathname.split('/');
    if (Array.isArray(myArray)) {
      if (myArray[2] === 'mattresses') {
        this.setState({ currentPath: myArray[2] });
      }
    }
    if (window && window.Unbxd && window.Unbxd.experiences) {
      window.Unbxd.experiences = [];
    }

    if (window.unbxd_category === 'Kids') {
      this.setState({
        openModal: true
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        openLogin: false
      });
    }
  }
  // async componentDidUpdate() {
  //   const {
  //     reloadListing,
  //     setReloadListing,
  //     history: {
  //       location: { pathname }
  //     }
  //   } = this.props;
  //   if (reloadListing && window) {
  //     // This is to prevent calling rendering listing when moving away from listing page
  //     const { breadCrumbs } = this.props;
  //     if (window && breadCrumbs && pathname.indexOf('search') === -1) {
  //       let url = '';
  //       breadCrumbs.forEach((item, i) => {
  //         if (i === breadCrumbs.length - 1) {
  //           url += `${item.name}`;
  //         } else {
  //           url += `${item.name}>`;
  //         }
  //       });
  //       window.unbxd_category = url || 'None';
  //     }
  //     const { dispatch } = this.context.store;
  //     // await dispatch(setReloadListing(false));
  //     window.renderListing(false);
  //   }
  //   this.props.history.location.action = '';
  // }
  async componentDidUpdate(prevState) {
    const {
      reloadListing,
      setReloadListing,
      history: {
        location: { pathname, state = {} }
      }
    } = this.props;
    if (reloadListing && window && window.renderListing) {
      // This is to prevent calling rendering listing when moving away from listing page
      const { breadCrumbs } = this.props;
      // const { breadCrumbs} = this.state.product.categoryDetails
      if (window && breadCrumbs && pathname.indexOf('search') === -1) {
        let url = '';
        breadCrumbs.forEach((item, i) => {
          if (i === breadCrumbs.length - 1) {
            url += `${item.name}`;
          } else {
            url += `${item.name}>`;
          }
        });
        window.unbxd_category = url || 'None';
      } else if (prevState.display !== this.state.display) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          display: 'none'
        });
      }
      const { dispatch } = this.context.store;
      window.renderListing(false);
      await dispatch(setReloadListing(false));
      if (state && state.path) {
        window.renderListing(false, state);
      }
    }
    // if(prevState.display !== this.state.display) {
    //   this.setState({
    //     display: 'none'
    //   })
    // }
    this.props.history.location.action = '';
  }
  componentWillUnmount() {
    window.unbxd_category = '';
  }
  onClickWishList = (sku, simpleSku) => {
    const { wishlistToggle, wishListData, history, isLoggedIn, addToWaitList, selectedPincode } = this.props;
    if (isLoggedIn) {
      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: 'add_to_wishlist',
        pagetype: '',
        source_page_url: window.location.href,
        previous_page_url: '',
        destination_page_url: '',
        login_status: 'true',
        user_id: '',
        page_url: window.location.href,
        banner_id: '',
        click_text: '',
        ecommerce: {
          currency: 'INR',
          value: '',
          items: [
            {
              item_id: 'SKU_12345',
              item_name: 'Stan and Friends Tee',
              affiliation: '',
              coupon: '',
              discount: '',
              index: 0,
              item_brand: '',
              item_category: '',
              item_category2: '',
              item_category3: '',
              item_category4: '',
              item_category5: ' ',
              item_list_id: '',
              item_list_name: ' ',
              item_variant: '',
              location_id: '',
              price: '',
              quantity: 1
            }
          ]
        }
      });
      wishlistToggle(wishListData, sku, simpleSku, selectedPincode)
        .then(() => {
          if (window && !!window.unbxd && !!window.unbxd.toggleWishList) {
            window.unbxd.toggleWishList(sku, simpleSku);
          }
        })
        .catch(() => {
          console.log('unbxd toggleWishList callback failed !');
        });
    } else {
      // if (window && !!window.unbxd && !!window.unbxd.toggleWishList) {
      //   window.unbxd.toggleWishList(sku, simpleSku);
      // }
      addToWaitList(sku, simpleSku, selectedPincode, true);
      const { pathname, search } = history.location;
      if (search) {
        history.push(`/login?&redirect=${pathname}${search}`);
      } else {
        history.push(`/login?redirect=${pathname}${search}`);
      }
    }
  };
  isInWishList = id => {
    const { wishList } = this.props;
    return wishList.includes(id);
  };
  isInCart = sku => {
    const { cartSKUs } = this.props;
    return cartSKUs.includes(sku);
  };
  AddToCartHandler = (key, skuId, simpleSku, pincode) => {
    const { addItemToCart, sessionId } = this.props;
    addItemToCart(key, skuId, simpleSku, sessionId, pincode)
      .then(() => {
        if (window && !!window.unbxd && !!window.unbxd.addToCart) {
          window.unbxd.addToCart(key, skuId, simpleSku, pincode);
        }
      })
      .catch(() => {
        console.log('unbxd addToCart callback failed !');
      });
  };
  gotoPDP = (name, sku) => {
    const { history } = this.props;
    const productURL = formatProductURL(name, sku);
    history.push(productURL);
    // if (window && window.Unbxd && window.Unbxd.track && sku) {
    //   window.Unbxd.track("click", { pid: sku });
    // }
  };
  gotoCart = () => {
    const { history } = this.props;
    const cartURL = '/checkout/cart';
    history.push(cartURL);
  };

  handleCategoryClick(event) {
    event.preventDefault();
    const { selectedPincode } = this.props;
    window.HTCATEGORY.navigateToCategory({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search,
      pincode: selectedPincode
    });
  }
  render() {
    const { categoryName, productCount, bannerData, history, categoryBar, breadCrumbs } = this.props;
    return (
      <Div type="block">
        <Section display="flex" p="0" mb="0" bg="white">
          <BreadCrumb categoryDetails={breadCrumbs} />
          <div className="Section-sc-1q695t-0.hkEyJm"></div>
        </Section>
        {/* Banners */}
        {/* <Section>
          <div className="Div-ln5jk2-0.licVIf"></div>
          <Section mb="0" p="0.625rem 1rem">
            <Container type="container" pr="0" pl="0">
              <Row display="block" mr="0" ml="0">
                <Div col="12">
                  <Heading fontSize="1rem" color="text" mb="0px" fontFamily="light" lh="1.5" mt="0" ellipsis={false}>
                    {categoryName} ({productCount})
                  </Heading>
                </Div>
              </Row>
            </Container>
          </Section>
        </Section> */}
        <BestOfferBanners bannerData={bannerData} history={history} />
        {this.state.currentPath === 'mattresses' ? <MattressPLPBanner /> : null}

        {/* Title and Total  */}
        <Section mb="0px" pb="5px">
          <div className="filterby"></div>
        </Section>
        {/* Category icons */}
        <Section p="0px" mb="5px">
          <div className="catbar">
            <CategoryBar
              pathname={history.location.pathname}
              categoryBar={categoryBar}
              handleCategoryClick={this.handleCategoryClick}
            />
          </div>
        </Section>
        {/* PLP */}
        {/* <Section>
           <div id="listwrapper"  id="listing"></div>
         </Section> */}
        <UnbxdListing />

        {this.state.openModal ? (
          <ResponsiveModal
            classNames={{ modal: 'furntitureModal' }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
          >
            <Link to="/offer/smartsters">
              <img
                src={`${BASE_IMAGE_URL}/media/cms/campaignpages/pop-up-banner_2.jpg`}
                style={{ width: '100%', height: 'auto', minWidth: '200px' }}
              />
            </Link>
          </ResponsiveModal>
        ) : null}
      </Div>
    );
  }
}

Listing.defaultProps = {
  wishList: [],
  productCount: '',
  categoryName: '',
  wishListData: [],
  isLoggedIn: false,
  // loadingList: [],
  // metaResults: [],
  breadCrumbs: [],
  selectedPincode: '',
  reloadListing: false,
  setReloadListing: false
};

Listing.propTypes = {
  wishlistToggle: PropTypes.func.isRequired,
  wishList: PropTypes.array,
  // products: PropTypes.array.isRequired,
  categoryName: PropTypes.string,
  productCount: PropTypes.string,
  wishListData: PropTypes.array,
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  addToWaitList: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array.isRequired,
  // loadingList: PropTypes.array,
  // productPosition: PropTypes.func.isRequired,
  // metaResults: PropTypes.array,
  breadCrumbs: PropTypes.array,
  selectedPincode: PropTypes.string,
  setPincodeToStore: PropTypes.func.isRequired,
  reloadListing: PropTypes.bool,
  setReloadListing: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
