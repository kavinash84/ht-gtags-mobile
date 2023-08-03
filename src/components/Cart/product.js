import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatAmount } from 'utils/formatters';
import { updateCart, removeFromCart } from 'redux/modules/cart';
import { PINCODE } from 'helpers/Constants';
import ResponsiveModal from 'components/Modal';
import { Link } from 'react-router-dom';
import SudoCart from '../PackageCatalog/sudoCart';
import {
  // togglePLPModal,
  toggleProdModal,
  loadPackageSudoCart,
  toggleSCModal,
  loadPackageCatalog
} from '../../redux/modules/lackpackages';
// import ProductsList from "../PackageCatalog/productsLists";
import PackagePDP from '../PackageCatalog/packagePDP';

const styles = require('./productitem.scss');
const Delete = require('../../../static/cart/delete.svg');
const SaleIcon = require('../../../static/cart/sale.svg');

const mapStateToProps = ({ pincode, app, lackpackages, cart }) => ({
  pincode: pincode.selectedPincode === '' ? PINCODE : pincode.selectedPincode,
  sessionId: app.sessionId,
  openSCModal: lackpackages.openSCModal,
  openPLPModal: lackpackages.openPLPModal,
  sudoCartItems: cart.packageItems,
  openProdModal: lackpackages.openProdModal
});

const onClickRemove = (cartId, sessionId, pincode, qty, configId) => dispatcher => onDelete => e => {
  e.preventDefault();
  onDelete();
  dispatcher(cartId, sessionId, pincode, qty, configId);
  alert('vipin');
};

const onClick = (cartId, skuId, simpleSku, session, pincode, qty, configId) => dispatcher => e => {
  e.preventDefault();
  dispatcher(cartId, skuId, simpleSku, session, pincode, qty, configId);
};
class ProductItem extends Component {
  state = { deleteData: '' };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleSCModal = () => {
    const { dispatch } = this.context.store;
    const { openSCModal, packageId, pincode } = this.props;
    dispatch(loadPackageSudoCart(packageId));
    dispatch(toggleSCModal(!openSCModal));
    dispatch(loadPackageCatalog(pincode, packageId));
  };

  componentDidMount() {
    const { dispatch } = this.context.store;
    const { sudoCartItems, isPackage } = this.props;
    // console.log("this.props===", this.props);
    dispatch(toggleSCModal(false));
    if (isPackage) {
      let skuData = [];
      if (Array.isArray(sudoCartItems)) {
        sudoCartItems.map(item => {
          skuData = [
            ...skuData,
            {
              simple_sku: item.simpleSku,
              qty: 1
            }
          ];
        });
      }
      this.setState({ deleteData: skuData });
    }
  }

  handlePLPModal = () => {
    // const { dispatch } = this.context.store;
    // const { openPLPModal } = this.props;
    // dispatch(togglePLPModal(!openPLPModal));
  };

  handleProdModal = () => {
    const { dispatch } = this.context.store;
    const { openProdModal } = this.props;
    dispatch(toggleProdModal(!openProdModal));
  };

  render() {
    const {
      Pname,
      Pimage,
      deliveryBy,
      specialPrice,
      unitPrice,
      netPrice,
      discount,
      couponDiscount,
      coupon,
      cartId,
      cart_ids,
      updateQuantity,
      quantity,
      simpleSku,
      skuId,
      pincode,
      sessionId,
      cartItemLoading,
      discardFromCart,
      handleCheckboxClick,
      checked,
      demoProduct,
      onDelete,
      configId,
      assembly,
      productURL,
      openSCModal,
      isPackage,
      packageId,
      offerMessage
    } = this.props;
    let deliveryStr = '';
    if (deliveryBy) {
      if (deliveryBy.includes('Delivered by')) {
        deliveryBy.split(' ').map((item, i) => {
          if (i > 1) {
            deliveryStr = deliveryStr + ' ' + item;
          }
        });
      } else {
        deliveryStr = deliveryBy;
      }
    }
    return (
      <React.Fragment>
        <div className={styles.productItemContainer}>
          <Link to={productURL}>
            <div className={styles.product_line}>
              <div className={styles.productImage}>
                <img data-src={`${Pimage}?mode=fill&h=100`} src={`${Pimage}?blur=30`} alt="product" />
              </div>
              <div className={styles.productrightline}>
                <div className={styles.productname}>{Pname}</div>
                <div className={styles.productsubname}>
                  <span>By Hometown</span>
                  <img
                    src={Delete}
                    alt="delete"
                    onClick={() => {
                      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      console.log(this.props)
                      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
                                  window.dataLayer.push({
                                    "event": "remove_from_cart",
                                   "pagetype": "",
                                    'source_page_url': window.location.href,
                                    'previous_page_url': "",
                                    'destination_page_url': "",
                                    'login_status': "",
                                    'user_id': "",
                                    'page_url': window.location.href,
                                    'banner_id': "",
                                    'click_text': "",
                                    ecommerce: {
                                    currency: "INR",
                                    value: this.props.netPrice,
                                    items: [{
                                        item_id: this.props.skuId,
                                        item_name: this.props.Pname,
                                        affiliation: "",
                                        coupon: this.props.coupon,
                                        discount: this.props.discount,
                                        index: this.props.cartId,
                                        item_brand: "",
                                        item_category: "",
                                        item_category2: "",
                                        item_category3: "",
                                        item_category4: "",
                                        item_category5: "",
                                        item_list_id: "",
                                        item_list_name: "",
                                        item_variant: "",
                                        location_id: "",
                                        price: this.props.netPrice,
                                        quantity: this.props.quantity
                                        }
                                      ]
                                  }
                                   });
                      isPackage
                        ? onClickRemove(
                            {
                              // skuData: this.state.deleteData,
                              cartIds: cart_ids,
                              packageId: packageId
                            },

                            sessionId,
                            pincode,
                            quantity,
                            configId
                          )(discardFromCart)(onDelete)
                        : onClickRemove(
                            {
                              cartIds: cart_ids
                            },
                            sessionId,
                            pincode,
                            quantity,
                            configId
                          )(discardFromCart)(onDelete);
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
          <div className={styles.productdetails}>
            <div style={{ marginRight: '5px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'black',
                  marginBottom: '5px',
                  fontWeight: 600
                }}
              >
                Delivery byzz:
              </div>
              <div style={{ fontSize: '12px', color: '#999999' }}>{deliveryStr}</div>
            </div>
            <div style={{ marginRight: '5px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: '#F47020',
                  marginBottom: '5px',
                  fontWeight: 600
                }}
              >
                ₹{netPrice ? formatAmount(netPrice) : null}
              </div>
              {discount ? (
                <div style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#999999', textDecoration: 'line-through' }}>
                    ₹{unitPrice ? formatAmount(unitPrice) : null}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#F47020',
                      marginLeft: '5px'
                    }}
                  >
                    {discount}% Off
                  </span>
                </div>
              ) : null}
              {offerMessage ? (
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgb(244, 112, 32)',
                    maxWidth: '90%'
                  }}
                >
                  {offerMessage}
                </div>
              ) : null}
            </div>
            {isPackage ? null : (
              <div className={styles.qtybtn}>
                <button
                  onClick={onClick(cartId, skuId, simpleSku, sessionId, pincode, -1, configId)(updateQuantity)}
                  disabled={cartItemLoading(cartId) || quantity <= 1}
                  style={{
                    padding: '0px',
                    border: 'none',
                    background: 'transparent'
                  }}
                >
                  -
                </button>
                <div>{quantity}</div>
                <button
                  style={{
                    padding: '0px',
                    border: 'none',
                    background: 'transparent'
                  }}
                  onClick={onClick(cartId, skuId, simpleSku, sessionId, pincode, 1, configId)(updateQuantity)}
                  disabled={cartItemLoading(cartId)}
                >
                  +
                </button>
              </div>
            )}
          </div>
          {couponDiscount ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '10px'
              }}
            >
              <img src={SaleIcon} alt="sale" />
              <div>
                <span
                  style={{
                    fontWeight: 600,
                    color: 'black',
                    marginLeft: '10px',
                    marginRight: '5px',
                    fontSize: '14px',
                    textTransform: 'uppercase'
                  }}
                >
                  {coupon}
                </span>
                <span style={{ color: '#999999', fontSize: '12px' }}>applied on this product.</span>
              </div>
            </div>
          ) : null}

          {demoProduct && (
            <div display="inline-block">
              <label className={styles.checkbox_container} htmlFor={simpleSku}>
                Select For Virtual Demo
                <input type="checkbox" id={simpleSku} onClick={handleCheckboxClick} checked={checked} />
                <span className={styles.checkmark}></span>
              </label>
            </div>
          )}
        </div>
        {isPackage ? (
          <div
            style={{
              color: 'white',
              background: '#999999',
              borderRadius: '7px',
              width: '100%',
              padding: '15px',
              textAlign: 'center',
              marginTop: '-7px'
            }}
            onClick={this.handleSCModal}
          >
            CLICK HERE TO CHECK ALL PRODUCTS
          </div>
        ) : null}
        <ResponsiveModal
          classNames={{
            overlay: 'PackageListingOverlay',
            modal: 'PackageDisplayModal'
          }}
          onCloseModal={this.handleSCModal}
          open={openSCModal}
        >
          <SudoCart handleSCModal={this.handleSCModal} handlePlpModal={this.handlePLPModal} />
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{
            overlay: 'PackageListingOverlay',
            modal: 'PackageDisplayModal'
          }}
          onCloseModal={this.handleProdModal}
          open={this.props.openProdModal}
        >
          <PackagePDP />
        </ResponsiveModal>
        {/* <ResponsiveModal
          classNames={{
            overlay: "PackageListingOverlay",
            modal: "PackageListingModal"
          }}
          onCloseModal={this.handlePLPModal}
          open={this.props.openPLPModal}
        >
          <ProductsList handlePlpModal={this.handlePLPModal} />
        </ResponsiveModal> */}
      </React.Fragment>
    );
  }
}

ProductItem.defaultProps = {
  cartItemLoading: () => {},
  demoProduct: false,
  checked: false,
  configId: ''
};

ProductItem.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  cartId: PropTypes.number.isRequired,
  skuId: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  cartItemLoading: PropTypes.func,
  discardFromCart: PropTypes.func.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  demoProduct: PropTypes.bool,
  checked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  configId: PropTypes.string
};

export default connect(mapStateToProps, {
  updateQuantity: updateCart,
  discardFromCart: removeFromCart
})(ProductItem);
