import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';
import EmiModal from 'containers/EmiModal/EmiModal';
import ResponsiveModal from 'components/Modal';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import Stripes from './PdpStripe';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
import TitlePrice from 'hometown-components/lib/ProductDetails/TitlePriceMobile';
import ServiceDetails from 'hometown-components/lib/ProductDetails/ServiceDetails';
import ProductDesc from 'hometown-components/lib/ProductDetails/ProductDesc';
import Specs from 'hometown-components/lib/ProductDetails/Specs';
import Reviews from 'hometown-components/lib/Reviews';
import ProductDetailsSlider from 'components/ProductDetailsSlider';
import Text from 'hometown-components/lib/Text';
import LazyLoad from 'react-lazyload';
import { Shimmer, BackgroundMasker } from 'hometown-components/lib/Shimmer';
import { formatAmount } from 'utils/formatters';
import {
  calculateDiscount,
  calculateSavings,
  calculateTotalSavings,
  calculateLowestEmi,
  getVideoID,
  formatProductURL
} from 'utils/helper';
import { getCartListSKU } from 'selectors/cart';
import { getSKUList } from 'selectors/wishlist';
import AddReview from 'hometown-components/lib/Reviews/WriteReview';
import { productPageTitle, productMetaDescription, productMetaKeywords } from 'utils/seo';
import { groupedAttributes as getgroupedAttributes, getBreadCrumbs, getSimpleSku } from 'selectors/product';
import { getCombinedBuy } from 'redux/modules/combinedbuy';
import { addToCartCombined, addToCart, loadCart } from 'redux/modules/cart';
import { toggleWishList, wishListWaitList } from 'redux/modules/wishlist';
import { setProductPosition } from 'redux/modules/productdetails';
import { addReview, toggleReview } from 'redux/modules/reviews';
import AddToCart from './pdpAddToCart';
import BuyNow from './pdpBuyNow';
import ShareBar from './pdpShareBar';
import { EMI_THRESHOLD } from 'helpers/Constants';

import ProductZoom from './ProductZoom';
import Pincode from './Pincode';
import BreadCrumb from './BreadCrumb';
import EmiOffers from '../../data/emioffers';
import EmiOptions from './EmiOptions';
import SlickSlider from '../SlickSlider';
import NewUnboxRecomondRecentlyViewed from '../NewUnboxWidges/recomondAndRecently';

import { PINCODE } from 'helpers/Constants';
import { weProductViewTrack } from '../../redux/modules/productdetails';
import ColorOption from './ColorOption';

const WishlistIcon = require('../../../static/pdp-icons/wishlist.png');
const WishlistIconSelect = require('../../../static/pdp-icons/wishlistSelect.png');
const CloseIcon = require('../../../static/close-icon.svg');
const ShareIcon = require('../../../static/pdp-icons/share.png');
const cartIcon = require('../../../static/pdp-icons/cart.png');

const styles = require('./ProductDetails.scss');

const PlaceHolderShimmer = () => (
  <Div mb="1rem">
    <Shimmer height="168px">
      <BackgroundMasker width="20%" height="25px" left="0" />
      <BackgroundMasker width="20%" height="25px" right="0" />
      <BackgroundMasker width="100%" height="10px" left="0" top="25px" />
      <BackgroundMasker width="15px" height="153px" left="0" top="35px" />
      <BackgroundMasker width="15px" height="153px" left="calc(15px + 153px)" top="35px" />
      <BackgroundMasker width="15px" height="153px" left="calc(15px + 153px + 15px + 153px)" top="35px" />
    </Shimmer>
  </Div>
);

const adjustSlides = length => ({
  slidesToShow: length >= 1 ? 1.3 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: false,
  arrows: false
});

const onClickWishList = (
  sku,
  list,
  dispatcher,
  isUserLoggedIn,
  history,
  addToWaitList,
  router,
  simpleSku,
  selectedPincode
) => e => {
  e.preventDefault();
  if (isUserLoggedIn) return dispatcher(list, sku, simpleSku, selectedPincode);
  addToWaitList(sku, simpleSku, selectedPincode);
  return history.push(`/login?redirect=${router.location.pathname}`);
};

const isInWishList = (list, id) => list.includes(id);

const formatPrice = price => {
  let newPrice = 0;
  if (price.length > 3 && price !== null) {
    newPrice = Number(price.replace(',', ''));
    return newPrice;
  }
  return Number(price);
};

const checkSKUInCart = (list, sku) => list.includes(sku);

@withRouter
@connect(
  ({
    app: { sessionId },
    productdetails,
    pincode,
    reviews,
    wishlist,
    userLogin,
    router,
    combinedbuy,
    paymentoptions,
    cart
  }) => ({
    session: sessionId,
    product: productdetails.productDescription,
    boughtTogether: (productdetails.productDescription && productdetails.productDescription.boughtTogether) || [],
    financeOption: productdetails.financeOptions.items.text,
    combinedbuy: combinedbuy.results,
    deliveryDateLoading: productdetails.deliveryDateLoading,
    deliveryInfo: productdetails.deliveryDetails,
    relatedproductsList:
      // (productdetails.productDescription &&
      //   productdetails.productDescription.related_products) ||
      [],
    colorproducts: (productdetails.productDescription && productdetails.productDescription.color_products) || [],
    emidata: (productdetails.productDescription && productdetails.productDescription.emi_data) || {
      emi: [],
      noCostEmi: []
    },
    wishList: getSKUList(wishlist),
    wishListData: wishlist.data,
    isLoggedIn: userLogin.isLoggedIn,
    loadingList: wishlist.loadingList,
    gattributes: getgroupedAttributes(productdetails),
    breadcrumbs: getBreadCrumbs(productdetails),
    simpleSku: getSimpleSku(productdetails),
    reviews,
    pincode,
    router,
    bflMinAmount: paymentoptions.bflMinAmount,
    cartSKUs: getCartListSKU(cart),
    addingToCart: cart.addingToCart,
    stateId: cart.key
  }),
  {
    wishlistToggle: toggleWishList,
    productPosition: setProductPosition,
    addToWaitList: wishListWaitList,
    toggleReviewBox: toggleReview,
    btAddToCart: addToCart,
    loadCart: loadCart
  }
)
class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.reviewsRef = React.createRef();
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    // openLogin: false,
    showmore: true,
    productzoom: false,
    startimage: 0,
    showmorecolorproducts: true,
    prodDetail: true,
    displayBTModal: false,
    displayShareBar: false,
    prodQty: 1,
    btProdQty: {
      commonQty: 0
    },
    // btTotal: formatPrice(this.props.product.pricing_details.special_price),
    btTotal: 0,
    btProds: [this.props.product.meta, ...this.props.boughtTogether]
  };

  updatebtProdQty = () => {
    const { btProds } = this.state;
    btProds.forEach((prod, index) => {
      this.setState(prevState => {
        let btProdQty = Object.assign({}, prevState.btProdQty); //creating copy of state variable btProdQty
        if (index === 0 || index === 1) {
          btProdQty[`${prod.sku}`] = 1;
        } else {
          btProdQty[`${prod.sku}`] = 0;
        }
        return { btProdQty };
      });
    });
  };

  updatebtTotal = (val, i) => {
    const {
      product: {
        pricing_details: { coupon_code: couponCode }
      },
      product
    } = this.props;
    const { btProdQty, prodQty, btProds } = this.state;
    btProds.forEach((prod, index) => {
      if (btProdQty[`${prod.sku}`] && index === i) {
        if (val === 'inc') {
          if (index === 0) {
            this.setState({
              btTotal: this.state.btTotal + Number(formatPrice(product.pricing_details.offer_price))
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal: this.state.btTotal + Number(formatPrice(prod.pricing_details.offer_price))
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal + Number(prod.special_price)
            });
          }
        } else if (val === 'dec') {
          if (index === 0) {
            this.setState({
              btTotal: this.state.btTotal - Number(formatPrice(product.pricing_details.offer_price))
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal: this.state.btTotal - Number(formatPrice(prod.pricing_details.offer_price))
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal - Number(prod.special_price)
            });
          }
        }
      } else if (!btProdQty[`${prod.sku}`] && index === i) {
        if (val === 'inc') {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal + Number(formatPrice(product.pricing_details.offer_price)) * btProdQty[`${prod.sku}`]
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal + Number(formatPrice(prod.pricing_details.offer_price)) * btProdQty[`${prod.sku}`]
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal + Number(prod.special_price) * btProdQty[`${prod.sku}`]
            });
          }
        } else if (val === 'dec') {
          if (index === 0) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(product.pricing_details.offer_price)) * (btProdQty[`${prod.sku}`] + 1)
            });
          } else if (prod.pricing_details.coupon_code === couponCode) {
            this.setState({
              btTotal:
                this.state.btTotal -
                Number(formatPrice(prod.pricing_details.offer_price)) * (btProdQty[`${prod.sku}`] + 1)
            });
          } else {
            this.setState({
              btTotal: this.state.btTotal - Number(prod.special_price) * (btProdQty[`${prod.sku}`] + 1)
            });
          }
        }
      }
    });
  };

  addReview = (sku, data) => {
    const { dispatch } = this.context.store;
    dispatch(addReview(sku, data));
  };
  toggleShowMore = () => {
    this.setState({
      showmore: !this.state.showmore
    });
  };
  toggleShowMoreColorProducts = () => {
    this.setState({
      showmorecolorproducts: !this.state.showmorecolorproducts
    });
  };
  handleZoom = startimage => {
    this.setState({
      productzoom: !this.state.productzoom,
      startimage
    });
  };

  onClickReviews = () => {
    try {
      const { top } = this.reviewsRef.current.getBoundingClientRect();
      window.scroll({
        top: Number(top - 60),
        behavior: 'smooth'
      });
    } catch (e) {
      window.scroll(0, this.reviewsRef.current.offsetTop);
    }
  };
  getOfferDetails = (offerDetails, price, specialPrice) => {
    const { offer_price: offerPrice = 0, coupon_code: couponCode = '' } = offerDetails;
    const finalPrice = Number(specialPrice) || Number(price);
    const priceToShow = offerPrice ? finalPrice - Number(offerPrice) : 0;
    const couponBasePrice = Number(finalPrice);
    const couponValue = offerPrice / couponBasePrice;
    const couponPercentageValue = Math.round(couponValue * 100);
    return {
      offerPrice: formatAmount(priceToShow),
      couponCode,
      offerAmount: offerPrice,
      couponPercentageValue
    };
  };
  handleCombinedBuy = (item, pincode, session) => {
    const { id_catalog_buildyourset: setId, skus } = item;
    const { selectedPincode } = pincode;
    const simpleSKUS = skus.map(val => ({
      simple_sku: val.sku,
      qty: Number(val.qty)
    }));
    // set_id, skus, session_id, pincode
    const { dispatch } = this.context.store;
    dispatch(addToCartCombined(setId, simpleSKUS, session, selectedPincode));
  };
  getProductsList = products => {
    const items = [];
    products.forEach(item => {
      const { set_qty: qty = 0 } = item;
      for (let i = 0; i < qty; i += 1) {
        items.push(item);
      }
    });
    return items;
  };
  componentDidMount() {
    const { dispatch } = this.context.store;
    const {
      simpleSku,
      pincode: { selectedPincode },
      product: {
        meta: { config_id: pid = '' }
      }
    } = this.props;
    this.updatebtProdQty();
    // this.updatebtTotal();
    this.setbtTotal();
    dispatch(getCombinedBuy(simpleSku, selectedPincode));
    if (window && window.Unbxd && window.Unbxd.experiences) {
      window.Unbxd.experiences = [];
    }
    dispatch(weProductViewTrack());

    if (window && window.Unbxd && window.Unbxd.track && pid) {
      window.Unbxd.track('product_view', { pid });
      // window.Unbxd.track("click", { pid: pid });
      window.Unbxd.track('experience_impression', { pid: pid });
    }
  }

  getWeightedAverageRatings = () => {
    const {
      reviews: { data = [] }
    } = this.props;
    let ans = 0;
    if (data.length) {
      const newData = data.reduce((m, obj) => {
        const item = obj.options && obj.options.length ? obj.options[0] : {};
        const rating = item.option_value ? Number(item.option_value) : 0;
        if (rating && rating <= 5) {
          m[rating] = m[rating] ? m[rating] + 1 : 1;
        }
        return m;
      }, {});
      let total = 0;
      let weight = 0;
      Object.keys(newData).forEach(k => {
        total += newData[k];
        weight += Number(k) * newData[k];
      });
      ans = total && weight ? (weight / total).toFixed(1) : 0;
    }
    return Number(ans);
  };

  handleBTModel = value => {
    this.setState({
      displayBTModal: value
    });
  };

  handleShareBar = () => {
    this.setState({
      displayShareBar: !this.state.displayShareBar
    });
  };

  handleProdDesc = value => {
    this.setState({
      prodDetail: value
    });
  };

  handleQty = value => {
    const { prodQty } = this.state;
    if (value === 'increment' && prodQty < 6) {
      this.setState(
        {
          prodQty: this.state.prodQty + 1
        },
        () => this.updatebtTotal('inc', 'no index')
      );
    } else if (value === 'decrement' && prodQty > 1) {
      this.setState(
        {
          prodQty: this.state.prodQty - 1
        },
        () => this.updatebtTotal('dec', 'no index')
      );
    }
  };

  setbtTotal = () => {
    const { btProds } = this.state;
    const {
      boughtTogether,
      product,
      product: {
        pricing_details: { coupon_code: couponCode }
      }
    } = this.props;
    if (btProds.length > 1 && boughtTogether !== 'Method Not Allowed') {
      if (couponCode) {
        if (btProds[1].pricing_details.coupon_code) {
          this.setState({
            btTotal:
              Number(formatPrice(product.pricing_details.offer_price)) +
              Number(formatPrice(btProds[1].pricing_details.offer_price))
          });
        } else {
          this.setState({
            btTotal:
              Number(formatPrice(product.pricing_details.offer_price)) +
              (Number(formatPrice(btProds[1].pricing_details.special_price))
                ? Number(formatPrice(btProds[1].pricing_details.special_price))
                : Number(formatPrice(btProds[1].pricing_details.mrp)))
          });
        }
      } else {
        this.setState({
          btTotal:
            (Number(formatPrice(product.pricing_details.special_price))
              ? Number(formatPrice(product.pricing_details.special_price))
              : Number(formatPrice(product.pricing_details.mrp))) +
            (Number(formatPrice(btProds[1].pricing_details.special_price))
              ? Number(formatPrice(btProds[1].pricing_details.special_price))
              : Number(formatPrice(btProds[1].pricing_details.mrp)))
        });
      }
    }
  };

  buySet = e => {
    e.preventDefault();
    const { session, pincode, product, btAddToCart, loadCart } = this.props;
    const { simples, meta, sku } = product;
    const { config_id: configId } = meta;
    const simpleSku = Object.keys(simples)[0];
    const { btProds, btProdQty, prodQty } = this.state;
    const pin = pincode.selectedPincode ? pincode.selectedPincode : PINCODE;
    // btAddToCart(sku, sku, simpleSku, session, pin, configId, prodQty);
    btProds.forEach((prod, index) => {
      if (index === 0) {
        if (btProdQty[`${prod.sku}`]) {
          btAddToCart(prod.sku, prod.sku, simpleSku, session, pin, prod.configId, btProdQty[`${prod.sku}`]);
        }
      } else {
        const simpleSKU = Object.keys(prod.simples)[0];
        if (btProdQty[`${prod.sku}`]) {
          btAddToCart(prod.sku, prod.sku, simpleSKU, session, pin, prod.configId, btProdQty[`${prod.sku}`]);
        }
      }
    });
    setTimeout(async () => {
      await loadCart(session, pin);
      await document.getElementById('focus_bt_id').scrollIntoView();
    }, 3000);
  };

  render() {
    const {
      product,
      boughtTogether,
      reviews,
      pincode,
      colorproducts,
      // relatedproductsList,
      deliveryInfo,
      emidata,
      wishList,
      wishListData,
      isLoggedIn,
      history,
      btAddToCart,
      wishlistToggle,
      addToWaitList,
      loadingList,
      gattributes,
      toggleReviewBox,
      deliveryDateLoading,
      router,
      breadcrumbs,
      combinedbuy,
      session,
      bflMinAmount,
      addingToCart,
      cartSKUs,
      stateId,
      financeOption
    } = this.props;
    const {
      meta,
      images,
      image,
      simples,
      delivery_details: deliveryDetails,
      attributes,
      grouped_attributes: groupedAttributes,
      sku,
      groupedattributes,
      reviews: { count, rating },
      bogo_bundle: bogoBundle,
      free_visit: freeVisit = 'no',
      free_installation: freeInstallation = 'no',
      swatch_image: swatchImage,
      pricing_details: pricingDetails
    } = product;
    const { description, demo_product: demoProduct = {} } = attributes;
    const simpleSku = Object.keys(simples)[0];
    const {
      name,
      brand,
      price,
      ht_wallet_cashback = null,
      special_price: specialPrice,
      offer_details: offerDetails = {},
      config_id: configId,
      shipping_charge: shippingCharge,
      warranty_period: warrantyPeriod = 0,
      fk_catalog_supplier: fkCatalogSupplier = null,
      categories,
      youtubeid,
      offer_message: offerMessage
    } = meta;
    const {
      mrp,
      special_price: csp,
      offer_price: offerPrice = 0,
      coupon_code: couponCode,
      discount_type: discountType = '',
      limited_time_coupon_discount: limitedTimeCouponDiscount = '',
      total_discount_percentage: totalDiscountPercentage,
      total_savings: totalSavings,
      offer_discount_percentage: offerDiscountPercentage
    } = pricingDetails;
    const checkSpecialPrice = Number(specialPrice) || Number(price);
    const { adding, added, data: reviewsData = [] } = reviews;
    const offerImage = simples[simpleSku].groupedattributes.offer_image || null;
    const offerImageRedirect = simples[simpleSku].groupedattributes.offer_image_click_url || null;
    const { showmore, showmorecolorproducts } = this.state;
    const isEmiAvailable = Number(checkSpecialPrice) >= EMI_THRESHOLD;
    const { main_material: material, color, category_type: productType } = gattributes;
    const productURL = `https://m.hometown.in${formatProductURL(name, sku)}`;
    const productDescription = productMetaDescription(name, productType, material, color);
    // const { offer_price: offerPrice = 0 } = offerDetails;
    const { section1 } = EmiOffers;
    const { prodDetail, displayBTModal, displayShareBar, prodQty, btProdQty, btTotal, btProds } = this.state;
    const weightedRating = this.getWeightedAverageRatings();
    const finalPrice = Number(specialPrice) || Number(price);
    const couponBasePrice = Number(finalPrice);
    const couponValue = Number(formatPrice(offerPrice)) / couponBasePrice;
    const couponPercentageValue = Math.round(couponValue * 100);
    const checkStatus = checkSKUInCart(cartSKUs, sku);
    const addLoading = addingToCart && stateId === sku;
    const isFurniture = categories.split('|').includes('131');
    const reviewItems = reviews.data || [];
    return (
      <Div type="block" mt="24px">
        <Helmet>
          <title>{productPageTitle(name)}</title>
          <meta name="keywords" content={productMetaKeywords(productType, material)} />
          <meta name="description" content={productDescription} />
          <meta property="og:url" content={productURL} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={name} />
          <meta property="og:description" content={productDescription} />
          <meta property="og:image" content={images && images.length > 0 && `${images[0].url}.jpg`} />

          {/* twitter card start */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="Hometown" />
          <meta name="twitter:title" content={name} />
          <meta name="twitter:description" content={productDescription} />
          <meta name="twitter:image" content={images && images.length > 0 && `${images[0].url}.jpg`} />
          {/* twitter card end */}
          <script type="application/ld+json">
            {`
                {
                  "@context" : "http://schema.org",
                  "@type" : "Product",
                  "url": "${productURL || ''}",
                  "name" : "${name.replace(/['"]+/g, '')}",
                  "image" : ${images && images.length && images[0].url ? `["${images[0].url}.jpg"]` : []},
                  "description" : "${productDescription.replace(/['"]+/g, '')}",
                  "sku": "${sku || ''}",
                  "brand" : {
                    "@type" : "Brand",
                    "name" : "HomeTown",
                    "logo" : "https://static.hometown.in/media/cms/icon/10f08290963c2827c55880f5f82bcc5b.png"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "${weightedRating}",
                    "reviewCount": "${reviewItems.length || 0}"
                  },
                  "offers" : {
                    "@type" : "Offer",
                    "url": "${productURL || ''}",
                    "priceCurrency": "INR",
                    "price": "${
                      Number(formatPrice(offerPrice))
                        ? Number(formatPrice(offerPrice))
                        : Number(specialPrice) || Number(price) || ''
                    }",
                    "availability": "https://schema.org/InStock"
                  }
                }
            `}
          </script>
          {/* <!-- Meta Pixel Code --> */}
          <script>
            {` !function(f,b,e,v,n,t,s)
               {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
               n.callMethod.apply(n,arguments):n.queue.push(arguments)};
               if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
               n.queue=[];t=b.createElement(e);t.async=!0;
               t.src=v;s=b.getElementsByTagName(e)[0];
               s.parentNode.insertBefore(t,s)}(window, document,'script',
               'https://connect.facebook.net/en_US/fbevents.js');
               fbq('init', '1024172491523922');
               fbq('track', 'ViewContent'); 
            `}
          </script>
          {/* <!-- End Meta Pixel Code --> */}
        </Helmet>
        <Section p="0px" mb="0px">
          <BreadCrumb breadcrumbs={breadcrumbs} />
        </Section>
        <Section p="0" pt="0.625rem" mb="0">
          <Container type="container" pr="0" pl="0">
            <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
              <Div col="11" mt="0">
                <TitlePrice
                  name={name}
                  brand=""
                  price={formatAmount(price)}
                  offerDetails={this.getOfferDetails(offerDetails, price, specialPrice)}
                  discPrice={formatAmount(checkSpecialPrice)}
                  savingsRs={formatAmount(calculateSavings(price, checkSpecialPrice || '', offerPrice))}
                  savingTotal={calculateTotalSavings(price, checkSpecialPrice || '')}
                  savingsPercentage={calculateDiscount(price, checkSpecialPrice, offerPrice)}
                  ratings={rating}
                  count={count}
                  onClickReviews={this.onClickReviews}
                />
                <p
                  style={{
                    fontSize: '12px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    paddingLeft: '1rem',
                    paddingBottom: '5px',
                    marginTop: '0px',
                    marginBottom: '0px'
                  }}
                >
                  By {brand}
                </p>
              </Div>
            </LazyLoad>
            <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
              <ProductDetailsSlider
                imageList={images}
                title={meta.name}
                handleZoom={this.handleZoom}
                youtube={youtubeid}
              />
              <ResponsiveModal
                onCloseModal={() => this.handleZoom(0)}
                open={this.state.productzoom}
                classNames={{
                  overlay: styles.prodZoomOverlayModal,
                  modal: styles.prodZoomModal,
                  closeButton: styles.closeBtn
                }}
              >
                <ProductZoom images={images} startimage={this.state.startimage} handleClick={this.handleZoom} />
              </ResponsiveModal>
            </LazyLoad>
            <Row display="block" mt="0" mb="0" mr="1rem" ml="1rem">
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <Div style={{ width: '50%' }}>
                  <Section mt="0" mb="0.3125rem" p="0">
                    {colorproducts.length > 0 && (
                      <ColorOption
                        data={colorproducts}
                        currentImage={swatchImage}
                        showmorecolorproducts={showmorecolorproducts}
                        toggleShowMoreColorProducts={this.toggleShowMoreColorProducts}
                      />
                    )}
                  </Section>
                </Div>
              </LazyLoad>

              {boughtTogether && boughtTogether.length ? (
                <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                  <Div
                    mt="1rem"
                    style={{
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button style={{ width: '90%' }} onClick={() => this.handleBTModel(true)}>
                      More options
                    </Button>
                  </Div>
                </LazyLoad>
              ) : null}
            </Row>

            {/* New price section */}
            <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
              <Div m="0px 1rem">
                {formatPrice(csp) < formatPrice(mrp) ? (
                  <Text mt="0px" color="#E9916B" fontSize="1rem" className={styles.price}>
                    {formatPrice(csp) !== 0 ? `₹${csp}` : `₹${mrp}`}
                    <Span>
                      {formatPrice(csp) !== 0 ? (
                        <Text ml="10px" fontSize="12px" color="#999999" className={styles.pricecut}>
                          ₹{mrp}{' '}
                          <Text
                            // mt="0px"
                            color="#999999"
                            fontSize="12px"
                            pl="5px"
                            className={styles.pricecut}
                            style={{ textDecoration: 'none' }}
                          >
                            <del>MRP</del> (Inclusive of all taxes)
                          </Text>
                        </Text>
                      ) : (
                        <Text
                          // mt="0px"
                          color="#999999"
                          fontSize="12px"
                          pl="5px"
                          className={styles.pricecut}
                          style={{ textDecoration: 'none' }}
                        >
                          MRP (Inclusive of all taxes)
                        </Text>
                      )}
                    </Span>
                  </Text>
                ) : (
                  <Text color="#E9916B" fontSize="1rem" className={styles.price}>
                    ₹{mrp}{' '}
                    <Text
                      // mt="0px"
                      color="#999999"
                      fontSize="12px"
                      pl="5px"
                      className={styles.pricecut}
                      style={{ textDecoration: 'none' }}
                    >
                      MRP (Inclusive of all taxes)
                    </Text>
                  </Text>
                )}
                {couponCode ? (
                  // {!!isOfferExist && price !== discPrice &&
                  <Div>
                    <Div>
                      <h2
                        itemProp="offers"
                        itemScope
                        itemType="http://schema.org/Offer"
                        style={{
                          display: 'flex',
                          paddingTop: '5px',
                          paddingBottom: '2px',
                          marginTop: '0px',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <Div style={{ width: '28%' }}>
                          <Span itemProp="priceCurrency" content="INR" color="#E9916B" fontSize="1.1rem">
                            Offer Price :
                          </Span>
                        </Div>
                        <Div style={{ width: 'calc(100% - 120px)' }}>
                          <Span
                            itemProp="price"
                            content={formatAmount(checkSpecialPrice)}
                            color="#E9916B"
                            fontSize="1.1rempx"
                          >
                            ₹{offerPrice}
                          </Span>
                        </Div>
                      </h2>
                    </Div>
                  </Div>
                ) : null}
                <Div>
                  {couponCode ? (
                    <Text mt="0px" mb="0px" color="#626463" fontSize="12px">
                      {discountType === 'fixed'
                        ? `Price inclusive of Extra ₹${limitedTimeCouponDiscount} OFF, Use Coupon`
                        : `Price inclusive of Extra ${offerDiscountPercentage}% OFF, Use Coupon`}
                      <Span fontSize="12px" color="#E9916B" ml="5px" tt="uppercase">
                        {couponCode}
                      </Span>
                    </Text>
                  ) : null}

                  <div ht_wallet_cashback={ht_wallet_cashback}>
                    {ht_wallet_cashback ? (
                      <div
                        style={{
                          color: '#E9916B',
                          fontSize: '13px'
                        }}
                      >
                        {` Extra ${Math.round(ht_wallet_cashback)}% HT wallet cashback`}
                      </div>
                    ) : null}
                  </div>
                  {totalSavings !== '0' ? (
                    <Text mt="0px" color="#626463" fontSize="12px">
                      Total Savings ₹ {totalSavings} ({totalDiscountPercentage}% OFF)
                    </Text>
                  ) : null}
                  {offerMessage ? (
                    <Text mt="10px" mb="0px" color="#626463" fontSize="12px">
                      {offerMessage}
                    </Text>
                  ) : null}
                </Div>
              </Div>
            </LazyLoad>

            {offerImage && offerImageRedirect && offerImage !== '#null#' && (
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <Div mt="1rem">
                  <Row display="block" mt="1rem" mb="0.3125rem" mr="0.9375rem" ml="0.9375rem">
                    <Div col="12" mt="0" pr="0.3125rem">
                      <a rel="noopener noreferrer" href={offerImageRedirect.replace('www.', 'm.')}>
                        <Img src={offerImage} alt="" width="100%" mt="0" mb="0.625rem" />
                      </a>
                    </Div>
                  </Row>
                </Div>
              </LazyLoad>
            )}
            {offerImage && !offerImageRedirect && offerImage !== '#null#' && (
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <Row display="block" mt="0" mb="0.3125rem" mr="0.9375rem" ml="0.9375rem">
                  <Div col="12" mt="0" pr="0.3125rem">
                    <Img src={offerImage} alt="" width="100%" mt="0" mb="0.625rem" />
                  </Div>
                </Row>
              </LazyLoad>
            )}
          </Container>
        </Section>
        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Div mt="5px">
            <EmiOptions data={financeOption} />
          </Div>
        </LazyLoad>

        <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
          <Stripes
            emi={formatAmount(calculateLowestEmi(emidata, price))}
            isEmiAvailable={isEmiAvailable}
            warrantyPeriod={warrantyPeriod}
            fkCatalogSupplier={fkCatalogSupplier}
            brand={brand}
            freeVisit={freeVisit}
            freeInstallation={freeInstallation}
            isFurniture={isFurniture}
          >
            <EmiModal
              price={formatAmount(checkSpecialPrice)}
              data={emidata}
              key="emi"
              specialPrice={checkSpecialPrice}
              bflMinAmount={bflMinAmount}
            />
          </Stripes>
        </LazyLoad>

        <Section p="0" pl="0" pr="0" pb="2.5rem" mb="0">
          <Container type="container" pr="0" pl="0">
            <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
              <Row display="block" mt="-1rem" mb="0.3125rem" mr="1rem" ml="1rem">
                <ServiceDetails
                  deliverBy={
                    (deliveryInfo && deliveryInfo[0] && deliveryInfo[0].value) ||
                    (deliveryDetails && deliveryDetails[0] && deliveryDetails[0].value) ||
                    ''
                  }
                  shipping={checkSpecialPrice}
                  shippingCharge={shippingCharge}
                  pincode={pincode.selectedPincode}
                  loading={deliveryDateLoading}
                >
                  <Pincode key="pincode" />
                </ServiceDetails>
              </Row>
            </LazyLoad>

            <Div>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <Row
                  ml="0rem"
                  mr="0rem"
                  mb="0rem"
                  justifyContent="space-between"
                  style={{
                    position: 'fixed',
                    bottom: '0px',
                    width: '100%',
                    zIndex: '1000',
                    backgroundColor: 'white',
                    boxShadow: '1px 0px 10px'
                  }}
                >
                  <BuyNow
                    quantity={prodQty || 1}
                    simpleSku={simpleSku}
                    sku={sku}
                    size="block"
                    btnType="primary"
                    isSoldOut={
                      !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                    }
                  />
                  <AddToCart
                    configId={configId}
                    simpleSku={simpleSku}
                    quantity={prodQty || 1}
                    sku={sku}
                    itemId={sku}
                    size="block"
                    btnType="custom"
                    btnColor="#515151"
                    height="40px"
                    isSoldOut={
                      !(simples[simpleSku].meta.quantity && parseInt(simples[simpleSku].meta.quantity, 10) > 0)
                    }
                  />
                </Row>
              </LazyLoad>
              <Row ml="1rem" mr="1rem" justifyContent="space-between">
                <Row ml="0px" mr="0px" style={{ width: '30%' }} justifyContent="flex-end">
                  <Row
                    ml="0px"
                    mr="0px"
                    justifyContent="center"
                    onClick={() => {
                      window.dataLayer.push({ ecommerce: null });
                      window.dataLayer.push({
                        event: 'add_to_wishlist',
                        pagetype: '',
                        source_page_url: window.location.href,
                        previous_page_url: '',
                        destination_page_url: '',
                        login_status: '',
                        user_id: '',
                        page_url: window.location.href,
                        banner_id: '',
                        click_text: '',
                        ecommerce: {
                          currency: 'INR',
                          value: this.props.product.pricing_details.offer_price,
                          items: [
                            {
                              item_id: this.props.product.sku,
                              item_name: this.props.product.meta.name,
                              affiliation: '',
                              coupon: this.props.product.pricing_details.coupon_code,
                              discount: this.props.product.pricing_details.total_savings,
                              index: 0,
                              item_brand: this.props.product.meta.brand,
                              item_category: this.props.product.meta.category_details[0]
                                ? this.props.product.meta.category_details[0].name
                                : '',
                              item_category2: this.props.product.meta.category_details[1]
                                ? this.props.product.meta.category_details[1].name
                                : '',
                              item_category3: this.props.product.meta.category_details[2].name
                                ? this.props.product.meta.category_details[2].name
                                : '',
                              item_category4: this.props.product.meta.category_details[3]
                                ? this.props.product.meta.category_details[3].name
                                : '',
                              item_category5: this.props.product.meta.category_details[4]
                                ? this.props.product.meta.category_details[4].name
                                : '',
                              item_list_id: '',
                              item_list_name: '',
                              item_variant: this.props.product.meta.color,
                              location_id: '',
                              price: this.props.product.pricing_details.offer_price,
                              quantity: 1
                            }
                          ]
                        }
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      width: '80%',
                      border: '1px solid #E9916B',
                      borderRadius: '5px'
                    }}
                  >
                    <Button
                      width="30%"
                      pl="0.5rem"
                      pr="0.5rem"
                      style={{ border: 'none' }}
                      onClick={() => this.handleQty('decrement')}
                    >
                      -
                    </Button>
                    <Div style={{ width: '30%', textAlign: 'center' }}>{prodQty}</Div>
                    <Button
                      width="30%"
                      pl="0.5rem"
                      pr="0.5rem"
                      style={{ border: 'none' }}
                      onClick={() => this.handleQty('increment')}
                    >
                      +
                    </Button>
                  </Row>
                </Row>
                <Row ml="0px" mr="0px" style={{ width: '30%' }} justifyContent="flex-end">
                  <Row
                    ml="0px"
                    mr="0px"
                    justifyContent="center"
                    style={{
                      alignItems: 'center',
                      width: '80%',
                      border: '1px solid #515151',
                      borderRadius: '5px'
                    }}
                  >
                    <Button
                      onClick={onClickWishList(
                        sku,
                        wishListData,
                        wishlistToggle,
                        isLoggedIn,
                        history,
                        addToWaitList,
                        router,
                        simpleSku,
                        pincode.selectedPincode
                      )}
                      p="0"
                      border="none"
                    >
                      <Img
                        src={isInWishList(wishList, sku) ? WishlistIconSelect : WishlistIcon}
                        alt="wishlist icon"
                        width="24px"
                      />
                    </Button>
                  </Row>
                </Row>
              </Row>
            </Div>

            <Section>
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <Div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Img
                    src={ShareIcon}
                    alt="share icon"
                    height="22px"
                    width="auto"
                    style={{ display: 'inline-block' }}
                  />
                  <Text ml="0.5rem" onClick={this.handleShareBar}>
                    Share this product
                  </Text>
                </Div>
                {displayShareBar ? <ShareBar title={name} url={productURL} mt="10px" /> : null}
              </LazyLoad>
            </Section>

            <Section mb="0px" pb="0px" pl="0px" pr="0px">
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <Row style={{ borderBottom: '1px solid grey' }}>
                  <Div style={{ width: '50%', textAlign: 'center' }}>
                    <h2
                      style={{
                        display: 'inline-block',
                        borderBottom: this.state.prodDetail ? '2px solid #E9916B' : 'none',
                        height: '100%',
                        fontSize: '1rem',
                        color: '#1D1D1D',
                        marginTop: '0px',
                        marginBottom: '0px'
                      }}
                      onClick={() => this.handleProdDesc(true)}
                    >
                      Product Details
                    </h2>
                  </Div>
                  <Div style={{ width: '50%', textAlign: 'center' }}>
                    <h2
                      style={{
                        display: 'inline-block',
                        borderBottom: !this.state.prodDetail ? '2px solid #E9916B' : 'none',
                        height: '100%',
                        fontSize: '1rem',
                        color: '#666666',
                        marginTop: '0px',
                        marginBottom: '0px'
                      }}
                      onClick={() => this.handleProdDesc(false)}
                    >
                      Reviews
                    </h2>
                  </Div>
                </Row>
              </LazyLoad>

              {prodDetail ? (
                <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                  <Div pl="1rem" pr="1rem">
                    {description && (
                      <ProductDesc
                        desc={description || ''}
                        details={groupedAttributes[0].Details}
                        showmore={showmore}
                        toggleShowMore={this.toggleShowMore}
                      />
                    )}
                  </Div>
                </LazyLoad>
              ) : (
                <div ref={this.reviewsRef} style={{ backgroundColor: '#F9F9F9' }}>
                  <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                    <div className={styles.hideh1InAddreview}>
                      <h2
                        style={{
                          marginBottom: '0.625rem',
                          fontSize: '1rem',
                          marginLeft: '2rem',
                          paddingTop: '1.2rem'
                        }}
                      >
                        Write a Review
                      </h2>
                      <AddReview
                        catalogId={groupedattributes.id_catalog_config}
                        loaded
                        adding={adding}
                        added={added}
                        onClickSubmit={this.addReview}
                        toggleReview={toggleReviewBox}
                      />
                    </div>
                    <Reviews col="12" reviewItems={reviews.data} ratings={weightedRating} pr="0" />
                  </LazyLoad>
                </div>
              )}
            </Section>
            <Specs specs={groupedAttributes} prodDetail={prodDetail} pincode={pincode.selectedPincode} />
            {!boughtTogether.error_message && btProds && Array.isArray(btProds) && btProds.length > 1 ? (
              <LazyLoad placeholder={<PlaceHolderShimmer />} height={150}>
                <Section>
                  <h2 style={{ color: '#222222', textAlign: 'center' }}>
                    <span id="focus_bt_id">Bought Together</span>
                  </h2>
                  <Div>
                    <SlickSlider className="mainSlider" settings={adjustSlides(8)}>
                      {btProds && btProds.length
                        ? btProds.map((prod, index) => (
                            <Div
                              key={index}
                              style={{
                                position: 'relative',
                                borderRadius: '5px',
                                height: 'auto'
                              }}
                              p="10px"
                              bg="white"
                            >
                              {index === 0 ? (
                                <div
                                  style={{
                                    position: 'relative',
                                    height: '250px',
                                    display: 'flex'
                                  }}
                                >
                                  <Img
                                    src={`${product.image}.jpg`}
                                    alt="BT!"
                                    height="100%"
                                    width="auto%"
                                    m="auto"
                                    style={{ border: '2px solid #FAF4F2' }}
                                  />
                                  {/* <div className="coupon">{id === 1 ? 'Ends Today' : `Valid till ${toDate}`}</div> */}
                                </div>
                              ) : prod.image ? (
                                <div
                                  style={{
                                    position: 'relative',
                                    height: '250px',
                                    display: 'flex'
                                  }}
                                >
                                  <Link to={prod.link}>
                                    <Img
                                      src={prod.image}
                                      alt="BT!"
                                      height="100%"
                                      width="auto%"
                                      m="auto"
                                      style={{ border: '2px solid #FAF4F2' }}
                                    />
                                  </Link>
                                  {/* <div className="coupon">{id === 1 ? 'Ends Today' : `Valid till ${toDate}`}</div> */}
                                </div>
                              ) : null}
                              {prod.name ? (
                                <Text
                                  ta="left"
                                  fontSize="12px"
                                  mt="12px"
                                  mb="3px"
                                  style={{ height: '40px', fontWeight: 'bold' }}
                                  lineHeight="1.3rem"
                                >
                                  {prod.name.split('').length > 50 ? `${prod.name.slice(0, 50)}....` : prod.name}
                                </Text>
                              ) : null}
                              {index !== 0 ? (
                                <Text
                                  ta="left"
                                  fontSize="12px"
                                  mt="0px"
                                  mb="3px"
                                  style={{ height: '30px', fontWeight: 'bold' }}
                                  lineHeight="1.3rem"
                                >
                                  {/* Offer Price: ₹{formatAmount(prod.special_price.split('.')[0])} */}
                                  {prod.pricing_details.coupon_code
                                    ? `Offer Price: ₹ ${prod.pricing_details.offer_price}`
                                    : prod.pricing_details.special_price !== '0'
                                    ? `Price: ₹ ${prod.pricing_details.special_price}`
                                    : `Price: ₹ ${prod.pricing_details.mrp}`}
                                </Text>
                              ) : (
                                <Text
                                  ta="left"
                                  fontSize="12px"
                                  mt="0px"
                                  mb="3px"
                                  style={{ height: '30px', fontWeight: 'bold' }}
                                  lineHeight="1.3rem"
                                >
                                  {couponCode
                                    ? `Offer Price: ₹ ${offerPrice}`
                                    : csp !== '0'
                                    ? `Price: ₹ ${csp}`
                                    : `Price: ₹ ${mrp}`}
                                  {/* {prod.pricing_details.coupon_code === couponCode ? `Offer Price: ₹${prod.pricing_details.offer_price}`: `Price: ₹${prod.pricing_details.special_price}`} */}
                                </Text>
                              )}
                              <Row ml="0px" mr="0px" style={{ width: '100%' }} justifyContent="flex-start">
                                <Row
                                  ml="0px"
                                  mr="0px"
                                  justifyContent="center"
                                  style={{
                                    alignItems: 'center',
                                    width: '50%',
                                    border: '1px solid #E9916B',
                                    borderRadius: '5px'
                                  }}
                                >
                                  <Button
                                    width="30%"
                                    pl="0.5rem"
                                    pr="0.5rem"
                                    style={{ border: 'none' }}
                                    onClick={() => {
                                      if (index === 0) {
                                        if (this.state.btProdQty[`${prod.sku}`] > 1) {
                                          this.setState(
                                            prevState => {
                                              // btProdQty : btProdQty[`${prod.name}`] += 1
                                              let btProdQty = Object.assign({}, prevState.btProdQty); //creating copy of state variable btProdQty
                                              btProdQty[`${prod.sku}`] -= 1;
                                              return { btProdQty };
                                            },
                                            () => {
                                              this.updatebtTotal('dec', index);
                                            }
                                          );
                                        }
                                      } else {
                                        if (this.state.btProdQty[`${prod.sku}`] > 0) {
                                          this.setState(
                                            prevState => {
                                              // btProdQty : btProdQty[`${prod.name}`] += 1
                                              let btProdQty = Object.assign({}, prevState.btProdQty); //creating copy of state variable btProdQty
                                              btProdQty[`${prod.sku}`] -= 1;
                                              return { btProdQty };
                                            },
                                            () => {
                                              this.updatebtTotal('dec', index);
                                            }
                                          );
                                        }
                                      }
                                    }}
                                  >
                                    -
                                  </Button>
                                  <Div
                                    style={{
                                      width: '30%',
                                      textAlign: 'center'
                                    }}
                                  >
                                    {btProdQty[`${prod.sku}`] ? btProdQty[`${prod.sku}`] : btProdQty.commonQty}
                                  </Div>
                                  <Button
                                    width="30%"
                                    pl="0.5rem"
                                    pr="0.5rem"
                                    style={{ border: 'none' }}
                                    onClick={() => {
                                      if (this.state.btProdQty[`${prod.sku}`] < 5) {
                                        this.setState(
                                          prevState => {
                                            // btProdQty : btProdQty[`${prod.name}`] += 1
                                            let btProdQty = Object.assign({}, prevState.btProdQty); //creating copy of state variable btProdQty
                                            btProdQty[`${prod.sku}`] += 1;
                                            return { btProdQty };
                                          },
                                          () => {
                                            this.updatebtTotal('inc', index);
                                          }
                                        );
                                      }
                                    }}
                                  >
                                    +
                                  </Button>
                                </Row>
                                <Div
                                  ml="1rem"
                                  style={{
                                    width: '40%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                  }}
                                >
                                  {index === 0 ? (
                                    <Img
                                      src={cartIcon}
                                      alt="Cart icon"
                                      height="20px"
                                      style={{ width: 'auto' }}
                                      onClick={() =>
                                        this.props.btAddToCart(
                                          prod.sku,
                                          prod.sku,
                                          simpleSku,
                                          session,
                                          pincode.selectedPincode,
                                          prod.configId,
                                          btProdQty[`${prod.sku}`]
                                        )
                                      }
                                    />
                                  ) : (
                                    <Img
                                      src={cartIcon}
                                      alt="Cart icon"
                                      height="20px"
                                      style={{ width: 'auto' }}
                                      onClick={() =>
                                        this.props.btAddToCart(
                                          prod.sku,
                                          prod.sku,
                                          Object.keys(prod.simples)[0],
                                          session,
                                          pincode.selectedPincode,
                                          prod.configId,
                                          btProdQty[`${prod.sku}`]
                                        )
                                      }
                                    />
                                  )}
                                </Div>
                              </Row>
                            </Div>
                          ))
                        : null}
                    </SlickSlider>
                  </Div>
                  <Div>
                    <Text ta="center" mb="0px" fontSize="14px" color="#222222" style={{ fontWeight: 'bold' }}>
                      Total Price: ₹ {formatAmount(btTotal)}
                    </Text>
                    {couponCode ? (
                      <Text ta="center" mt="0px" fontSize="14px">
                        Price inclusive of Extra {offerDiscountPercentage}% Use Code:{' '}
                        <Span fontSize="14px" color="#E9916B" tt="uppercase">
                          {couponCode}
                        </Span>
                      </Text>
                    ) : null}
                    {couponCode ? (
                      <Text ta="center" mt="0px" fontSize="14px">
                        Price inclusive of Extra {offerDiscountPercentage}% Use Code:{' '}
                        <Span fontSize="14px" color="#E9916B" tt="uppercase">
                          {couponCode}
                        </Span>
                      </Text>
                    ) : null}
                    {!checkStatus ? (
                      <Button
                        style={{
                          backgroundColor: '#E9916B',
                          borderRadius: '5px',
                          color: 'white',
                          width: '40%',
                          display: 'block'
                        }}
                        m="auto"
                        mt="1rem"
                        onClick={this.buySet}
                      >
                        {addLoading ? 'Adding..' : 'Buy Set'}
                      </Button>
                    ) : (
                      <Link to="/checkout/cart">
                        <Button
                          style={{
                            backgroundColor: '#E9916B',
                            borderRadius: '5px',
                            color: 'white',
                            width: '40%',
                            display: 'block'
                          }}
                          m="auto"
                          mt="1rem"
                        >
                          Go to Cart
                        </Button>
                      </Link>
                    )}
                  </Div>
                </Section>
              </LazyLoad>
            ) : null}

            {/* Recommend for you */}
            <NewUnboxRecomondRecentlyViewed
              pageInfo={{
                pageType: 'PRODUCT',
                productIds: [configId || '']
              }}
            />

            {/* {combinedbuy.length > 0 && (
              <Section mb="0">
                <Row m="0 0 5px 0" id="combined_buy_offers">
                  <Container pr="0" pl="0" className={styles.combinedProductsWrapper}>
                    <HeadingH6
                      ta="left"
                      fontSize="20px"
                      mt="0 !important"
                      mb="5px !important"
                      color="primary"
                      fontFamily="light"
                    >
                      Combined Offers
                    </HeadingH6>
                  </Container>
                </Row>
                {combinedbuy.map((item, index) => (
                  <Row id="combined_buy_offers" key={String(index)} display="block" pt="0" mt="0" mb="0" m="0">
                    <CombinedBuy
                      pb="2rem"
                      title={item.name}
                      item={item}
                      data={this.getProductsList(item.products || [])}
                      length={item.products.length}
                      price={item.total_price}
                      discountedPrice={item.total_price_after_discount}
                      setDiscount={item.discount ? Number(item.discount) : 0}
                      handleCombinedBuy={() => this.handleCombinedBuy(item, pincode, session)}
                    />
                  </Row>
                ))}
              </Section>
            )} */}
            {/* {relatedproductsList.length > 0 && (
              <Row display="block" mt="2rem" mb="0" ml="0" mr="0">
                <ProductSlider
                  productSliderTitle="Related Products"
                  data={relatedproductsList}
                  length={relatedproductsList.length}
                />
              </Row>
            )} */}
          </Container>
        </Section>
        {displayBTModal && !boughtTogether.error_message ? (
          <Section
            pl="0px"
            pr="0px"
            style={{
              position: 'fixed',
              height: '100vh',
              width: '100%',
              top: '0px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '1'
            }}
          >
            <Div
              style={{
                position: 'absolute',
                bottom: '0px',
                height: '55vh',
                backgroundColor: 'white',
                borderRadius: '5px 5px 0px 0px',
                overflowY: 'auto',
                marginBottom: '20%'
              }}
            >
              <Row
                mt="1rem"
                mr="0px"
                ml="0px"
                mb="1rem"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Div style={{ width: '50%' }}>
                  <h2
                    style={{
                      textAlign: 'center',
                      color: '#323131',
                      fontSize: '1rem'
                    }}
                  >
                    More Options
                  </h2>
                </Div>
                <Div
                  style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Img src={CloseIcon} onClick={() => this.handleBTModel(false)} alt="close button" height="20px" />
                </Div>
              </Row>
              {boughtTogether && boughtTogether.length
                ? boughtTogether.map((prod, index) => (
                    <Link to={prod.link}>
                      <Div key={index} pl="1rem" pr="1rem" mb="1rem" style={{ height: '100px' }}>
                        <Row justifyContent="space-between" ml="0px" mr="0px" style={{ height: '100px' }}>
                          <Div style={{ width: '40%', height: '100%' }}>
                            <Img src={prod.image} alt="BT" m="auto" style={{ height: '100%', width: 'auto' }} />
                          </Div>
                          <Div style={{ width: '50%' }}>
                            <h2
                              style={{
                                whiteSpace: 'normal',
                                color: '#323131',
                                fontSize: '12px'
                              }}
                            >
                              {prod.name.split('').length > 50 ? `${prod.name.slice(0, 50)}....` : prod.name}
                            </h2>
                            <Text fontSize="12px" color="#F47020" mt="0px">
                              {prod.pricing_details.coupon_code
                                ? `Offer Price: ₹${prod.pricing_details.offer_price}`
                                : `Price: ₹${prod.pricing_details.special_price}`}
                              {/* Offer Price: ₹{prod.special_price} */}
                            </Text>
                          </Div>
                        </Row>
                      </Div>
                    </Link>
                  ))
                : null}
            </Div>
          </Section>
        ) : null}
      </Div>
    );
  }
}

ProductDetails.defaultProps = {
  product: {},
  pincode: {},
  reviews: {},
  colorproducts: [],
  deliveryInfo: [],
  emidata: [],
  wishList: [],
  wishListData: [],
  loadingList: [],
  breadcrumbs: [],
  deliveryDateLoading: false,
  isLoggedIn: false,
  toggleReviewBox: () => {},
  addToWaitList: () => {},
  router: {},
  history: {},
  gattributes: {},
  wishlistToggle: () => {},
  combinedbuy: [],
  simpleSku: '',
  session: ''
};

ProductDetails.propTypes = {
  product: PropTypes.object,
  pincode: PropTypes.object,
  reviews: PropTypes.object,
  colorproducts: PropTypes.array,
  deliveryInfo: PropTypes.array,
  emidata: PropTypes.array,
  wishList: PropTypes.array,
  wishListData: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object,
  wishlistToggle: PropTypes.func,
  addToWaitList: PropTypes.func,
  toggleReviewBox: PropTypes.func,
  deliveryDateLoading: PropTypes.bool,
  gattributes: PropTypes.object,
  loadingList: PropTypes.array,
  router: PropTypes.object,
  breadcrumbs: PropTypes.array,
  combinedbuy: PropTypes.array,
  simpleSku: PropTypes.string,
  session: PropTypes.string,
  bflMinAmount: PropTypes.number.isRequired
};

export default ProductDetails;
